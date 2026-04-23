// ============================================================================
// File: src/modules/order/order.service.js
// Description: Business logic layer for the Order module.
// Orchestrates repository calls and enforces business rules.
//
// Dual-Mode: In LIVE mode, createOrder passes the full JSON payload to a
// single atomic SP call. In MOCK mode, it orchestrates multi-step creation
// through individual repository sub-methods.
//
// Procedure mapping: prc_order_master_set (upsert/cancel), prc_order_master_get (reads).
// ============================================================================

import orderRepository from './order.repository.js';

class OrderService {
  /**
   * Process a new complex order creation.
   *
   * LIVE MODE:  Passes full JSON payload → prc_order_master_set(0, ?) atomic creation.
   * MOCK MODE:  Multi-step orchestration: find-or-create sender → create order →
   *             add receivers → add items → generate parcels.
   *
   * @param {object} payload - Validated order payload from Zod schema.
   * @param {object} user - Authenticated user from JWT (req.user).
   * @returns {Promise<object>} Created order with nested receivers and parcels.
   */
  async createOrder(payload, user) {
    const { senderName, senderMobile, senderAddress, courierId, products, receivers } = payload;
    const createdBy = user?.employeeCode || null;

    // ------------------------------------------------------------------
    // MODE DETECTION
    // Mode A: root products only (sender-to-self)
    // Mode B: receivers only (normal)
    // Mode C: root products + receivers (combo)
    // ------------------------------------------------------------------
    const hasRootProducts = Array.isArray(products) && products.length > 0;
    const hasReceivers = Array.isArray(receivers) && receivers.length > 0;

    if (!hasRootProducts && !hasReceivers) {
      const error = new Error('Order must have at least one of: root-level products (Mode A) or receivers (Mode B/C)');
      error.statusCode = 400;
      throw error;
    }

    // ------------------------------------------------------------------
    // LIVE DB MODE: Single atomic SP call
    // Normalize payload so the SP always receives a unified receivers[] array.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      // Step 1: Find-or-create the sender
      const sender = await orderRepository.findOrCreateParty({ senderName, senderMobile, createdBy });

      // Step 2: Build normalized receivers array for the SP
      const normalizedReceivers = this._buildReceiversList(
        hasRootProducts, hasReceivers, products, receivers,
        senderName, senderMobile, sender
      );

      const orderPayload = {
        senderName,
        senderMobile,
        senderAddress,
        courierId,
        receivers: normalizedReceivers,
        createdBy
      };

      // Step 3: Create the full order atomically via SP
      const result = await orderRepository.createOrder(orderPayload);
      return result;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: Multi-step orchestration
    // ------------------------------------------------------------------

    // Step 1: Find-or-create the sender in Party_master (returns structured address)
    const sender = await orderRepository.findOrCreateParty({
      senderName,
      senderMobile,
      createdBy
    });

    // Step 2: Create the order header
    const order = await orderRepository.createOrder({
      senderId: sender.id,
      senderName,
      senderMobile,
      senderAddress,
      courierId,
      createdBy
    });

    // Step 3: Build receiver list based on mode
    // Fix B3: Use sender's structured Party_master fields instead of flat senderAddress
    const receiversList = this._buildReceiversList(
      hasRootProducts, hasReceivers, products, receivers,
      senderName, senderMobile, sender
    );

    // Step 4: Process each receiver → items → parcel
    const aggregatedReceivers = [];
    let totalAmount = 0;

    for (const rec of receiversList) {
      const receiverRecord = await orderRepository.createReceiver(order.id, {
        receiverName: rec.receiverName,
        receiverPhone: rec.receiverPhone || null,
        address: rec.address || null,
        city: rec.city || null,
        state: rec.state || null,
        pincode: rec.pincode || null,
        country: rec.country || 'India'
      });

      const savedItems = [];

      // Fix B1: Use prod.qty (matches Zod schema), not prod.quantity
      for (const prod of rec.products || []) {
        const item = await orderRepository.createOrderItem(
          receiverRecord.id,
          prod.productId,
          prod.qty,
          prod.unitPrice || null
        );
        savedItems.push(item);

        // Accumulate total
        totalAmount += (prod.unitPrice || 0) * (prod.qty || 0);
      }

      // 1 receiver = 1 parcel (Systemflow Part 3, Step 5)
      const parcel = await orderRepository.createParcel(receiverRecord.id, courierId);

      aggregatedReceivers.push({
        ...receiverRecord,
        items: savedItems,
        parcel
      });
    }

    return {
      orderId: order.id,
      orderCode: order.orderCode,
      totalAmount,
      senderName: order.senderName,
      receivers: aggregatedReceivers
    };
  }

  /**
   * Builds a unified receivers[] array from the payload based on order mode.
   * Mode A (hasRootProducts && !hasReceivers): Sender is receiver, uses sender's Party_master address.
   * Mode B (!hasRootProducts && hasReceivers): Pass-through receivers as-is.
   * Mode C (hasRootProducts && hasReceivers): Synthetic sender-receiver + external receivers.
   *
   * @param {boolean} hasRootProducts - Whether root-level products exist.
   * @param {boolean} hasReceivers - Whether receivers array exists.
   * @param {Array} products - Root-level products array.
   * @param {Array} receivers - Receivers array from payload.
   * @param {string} senderName - Sender name from payload.
   * @param {string} senderMobile - Sender mobile from payload.
   * @param {object} sender - Party_master record (structured address fields).
   * @returns {Array} Unified receivers list ready for processing.
   * @private
   */
  _buildReceiversList(hasRootProducts, hasReceivers, products, receivers, senderName, senderMobile, sender) {
    // Build synthetic sender-as-receiver entry using structured Party_master fields (Fix B3)
    const buildSenderReceiver = () => ({
      receiverName: senderName,
      receiverPhone: senderMobile,
      address: sender.address || sender.Address || null,
      city: sender.city || sender.City || null,
      state: sender.state || sender.State || null,
      pincode: sender.pincode || sender.Pincode || null,
      country: 'India',
      products
    });

    if (hasRootProducts && !hasReceivers) {
      // Mode A: Sender-to-self only
      return [buildSenderReceiver()];
    }

    if (!hasRootProducts && hasReceivers) {
      // Mode B: Normal — receivers as-is
      return receivers;
    }

    // Mode C: Combo — sender-to-self + external receivers
    return [buildSenderReceiver(), ...receivers];
  }

  /**
   * Internal mapper for order summary list (flat).
   */
  _mapOrderSummary(order) {
    if (!order) return null;
    return {
      id: order.PkOrderId || order.id || order.orderId,
      orderCode: order.OrderCode || order.orderCode,
      senderName: order.SenderName || order.senderName,
      senderMobile: order.SenderMobile || order.senderMobile,
      totalAmount: order.TotalAmount || order.totalAmount,
      totalReceivers: order.TotalReceivers !== undefined ? order.TotalReceivers : order.totalReceivers,
      totalParcels: order.TotalParcels !== undefined ? order.TotalParcels : order.totalParcels,
      derivedStatus: order.DerivedStatus || order.derivedStatus,
      createdAt: order.CreatedDate || order.createdAt
    };
  }

  /**
   * Internal mapper for deep order detail (nested aggregate).
   */
  _mapOrderDetail(order) {
    if (!order) return null;
    
    const mappedOrder = {
      id: order.PkOrderId || order.id || order.orderId,
      orderCode: order.OrderCode || order.orderCode,
      totalAmount: order.TotalAmount || order.totalAmount,
      senderName: order.SenderName || order.senderName,
      senderMobile: order.SenderMobile || order.senderMobile,
      senderAddress: order.SenderAddress || order.senderAddress,
      derivedStatus: order.DerivedStatus || order.derivedStatus,
      createdAt: order.CreatedDate || order.createdAt,
      receivers: []
    };

    const receiversList = order.receivers || order.Receivers || [];
    mappedOrder.receivers = receiversList.map(rec => {
      const mappedRec = {
        id: rec.PkReceiverDetailsId || rec.id,
        receiverName: rec.ReceiverName || rec.receiverName,
        receiverPhone: rec.ReceiverPhone || rec.receiverPhone,
        address: rec.Address || rec.address,
        city: rec.City || rec.city,
        state: rec.State || rec.state,
        pincode: rec.Pincode || rec.pincode,
        country: rec.Country || rec.country,
        items: [],
        parcel: null
      };

      const itemsList = rec.items || rec.Items || [];
      mappedRec.items = itemsList.map(item => ({
        id: item.PkOrderItemsId || item.id,
        productId: item.FkProductId || item.productId,
        quantity: item.OutwardQty || item.quantity || item.outwardQty,
        unitPrice: item.UnitPrice || item.unitPrice
      }));

      const p = rec.parcel || rec.Parcel;
      if (p) {
        mappedRec.parcel = {
          id: p.PkParcelDetailsId || p.id,
          parcelId: p.ParcelId || p.parcel_id,
          trackingNo: p.TrackingNo || p.trackingNo,
          status: p.ParcelStatusCode || p.parcelStatusCode,
          dispatchDate: p.DispatchDate || p.dispatchDate
        };
      }

      return mappedRec;
    });

    return mappedOrder;
  }

  /**
   * Get paginated order summary list with derived statuses.
   * Maps to prc_order_master_get (pAction=0).
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async getOrderSummaryList(filters) {
    const result = await orderRepository.findAllOrders(filters);
    return {
      ...result,
      data: result.data.map(o => this._mapOrderSummary(o))
    };
  }

  /**
   * Get full order aggregate by ID (nested JSON).
   * Maps to prc_order_master_get (pAction=1).
   *
   * @param {number|string} orderId
   * @returns {Promise<object>} Full nested order aggregate.
   * @throws {Error} 404 if order not found.
   */
  async getOrderDetails(orderId) {
    const data = await orderRepository.findById(orderId);
    if (!data) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderDetail(data);
  }

  /**
   * Update an existing order.
   * Maps to prc_order_master_set (ID>0).
   *
   * ❗ Business rule: Must fail if any parcel status ≥ AWB_LINKED.
   * This is enforced in both the repository mock and the stored procedure.
   *
   * @param {number|string} orderId
   * @param {object} payload - Updated order data.
   * @returns {Promise<object>} Updated order record.
   * @throws {Error} 404 if order not found, 400 if update blocked.
   */
  async updateOrder(orderId, payload) {
    const result = await orderRepository.updateOrder(orderId, payload);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderSummary(result);
  }

  /**
   * Cancel an order and cascade to all parcels.
   * Maps to prc_order_master_set (pCancelRequested=1).
   *
   * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED.
   * ✔ Cascades cancellation to all parcels.
   * ✔ Logs each status change to receiver_status_details.
   *
   * @param {number|string} orderId
   * @param {object} user - Authenticated user from JWT (req.user).
   * @returns {Promise<object>} Cancellation result.
   * @throws {Error} 404 if order not found, 400 if cancellation blocked.
   */
  async cancelOrder(orderId, user) {
    const cancelledBy = user?.employeeCode || 'SYSTEM';
    const result = await orderRepository.cancelOrder(orderId, cancelledBy);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderSummary(result);
  }
}

export default new OrderService();
