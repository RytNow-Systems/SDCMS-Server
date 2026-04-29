// ============================================================================
// File: src/modules/order/order.service.js
// Description: Business logic layer for the Order module.
// Orchestrates Mode A (Self), Mode B (External), and Mode C (Combo) creation flows.
// Standardizes database results (PascalCase/camelCase) for the API contract.
// ============================================================================

import orderRepository from './order.repository.js';
import productRepository from '../product/product.repository.js';

class OrderService {
  /**
   * Orchestrates the creation of an order based on the identified Mode.
   * 
   * @param {object} payload - Zod-validated order payload.
   * @param {object} user - Authenticated user context from auth middleware.
   * @returns {Promise<object>} Created order aggregate or receiver array.
   */
  async createOrder(payload, user) {
    const { senderId, senderName, senderMobile, senderAddress, senderCity, senderState, senderPincode, courierId, products, receivers } = payload;
    const createdBy = user?.employeeCode || null;

    // Detect Modes:
    // Mode A: root products only.
    // Mode B: receivers only.
    // Mode C: both.
    const hasRootProducts = Array.isArray(products) && products.length > 0;
    const hasReceivers = Array.isArray(receivers) && receivers.length > 0;

    const ctx = { senderId, senderName, senderMobile, senderAddress, senderCity, senderState, senderPincode, courierId, products, receivers, hasRootProducts, hasReceivers, createdBy };

    if (process.env.USE_MOCK_DB !== 'true') {
      return this._createOrderLive(ctx);
    }

    return this._createOrderMock(ctx);
  }

  /**
   * Orchestration for LIVE database via managed repository transaction.
   * senderId is passed directly from the frontend dropdown (no find-or-create).
   * @private
   */
  async _createOrderLive(ctx) {
    // Step 1: Build sender context from payload (frontend already selected sender)
    const senderCtx = {
      address: ctx.senderAddress || null,
      city: ctx.senderCity || null,
      state: ctx.senderState || null,
      pincode: ctx.senderPincode || null
    };

    // Step 2: Unify root products and external receivers into a single array
    const normalizedReceivers = this._buildReceiversList(
      ctx.hasRootProducts, ctx.hasReceivers, ctx.products, ctx.receivers,
      ctx.senderName, ctx.senderMobile, senderCtx
    );

    // Step 3: Resolve pricing for items missing unitPrice (v2.3 fallback chain)
    await this._resolvePricing(normalizedReceivers);

    // Step 4: Build the aggregate graph for the repository
    const orderPayload = {
      senderId: ctx.senderId,
      senderName: ctx.senderName,
      senderMobile: ctx.senderMobile,
      senderAddress: ctx.senderAddress,
      courierId: ctx.courierId,
      totalAmount: this._calculateTotalAmount(normalizedReceivers),
      receivers: normalizedReceivers
    };

    // Repository handles the atomic transaction across 4 tables
    return orderRepository.createOrder(orderPayload, ctx.createdBy);
  }

  /**
   * Orchestration for MOCK mode via individual repository calls.
   * senderId is passed directly from the frontend dropdown (no find-or-create).
   * @private
   */
  async _createOrderMock(ctx) {
    // Step 1: Create Order Header (senderId already known from dropdown)
    const order = await orderRepository.createOrder({
      senderId: ctx.senderId,
      senderName: ctx.senderName,
      senderMobile: ctx.senderMobile,
      senderAddress: ctx.senderAddress,
      courierId: ctx.courierId
    }, ctx.createdBy);

    // Step 2: Build sender context from payload for Mode A synthetic receiver
    const senderCtx = {
      address: ctx.senderAddress || null,
      city: ctx.senderCity || null,
      state: ctx.senderState || null,
      pincode: ctx.senderPincode || null
    };

    // Step 3: Normalize receivers based on Mode A/B/C
    const receiversList = this._buildReceiversList(
      ctx.hasRootProducts, ctx.hasReceivers, ctx.products, ctx.receivers,
      ctx.senderName, ctx.senderMobile, senderCtx
    );

    // Step 4: Resolve pricing for items missing unitPrice (v2.3 fallback chain)
    await this._resolvePricing(receiversList);

    // Step 5: Iteratively build the mock graph (receivers -> items -> parcels)
    const aggregatedReceivers = await this._processMockReceivers(order.id, receiversList, ctx.courierId);

    return {
      ...order,
      receivers: aggregatedReceivers
    };
  }

  /**
   * Iterative processor for Mock mode creation.
   * @private
   */
  async _processMockReceivers(orderId, list, courierId) {
    const aggregated = [];
    for (const rec of list) {
      // 1 receiver record
      const recRecord = await orderRepository.createReceiver(orderId, rec);
      const items = [];
      // multiple items
      for (const prod of rec.products || []) {
        items.push(await orderRepository.createOrderItem(recRecord.id, prod.productId, prod.qty, prod.unitPrice));
      }
      // 1 parcel execution unit (standard)
      const parcel = await orderRepository.createParcel(recRecord.id, courierId);
      aggregated.push({ ...recRecord, items, parcel });
    }
    return aggregated;
  }

  /**
   * Pricing Hierarchy (v2.3):
   *   1. Explicit unitPrice from payload
   *   2. product_color_matrix.MaterialRate (if colorId + size specified)
   *   3. product_master.MaterialRate (catalog fallback)
   * Mutates the products array in-place to fill in resolved unitPrice.
   * @private
   */
  async _resolvePricing(receivers) {
    for (const rec of receivers) {
      for (const prod of (rec.products || [])) {
        if (prod.unitPrice != null && prod.unitPrice > 0) continue;

        // Try color matrix pricing if colorId + size provided
        if (prod.colorId && prod.size) {
          const matrix = await productRepository.getColorMatrix(prod.productId);
          const match = matrix.find(
            m => (m.FkLuColorId === prod.colorId || m.colorId === prod.colorId) &&
                 (m.Size === prod.size || m.size === prod.size)
          );
          if (match) {
            prod.unitPrice = match.MaterialRate || match.materialRate;
            continue;
          }
        }

        // Catalog fallback from product_master
        const product = await productRepository.findById(prod.productId);
        prod.unitPrice = product?.MaterialRate || product?.materialRate || 0;
      }
    }
  }

  /**
   * Business Logic: Calculate total order value across all items.
   * @private
   */
  _calculateTotalAmount(receivers) {
    return receivers.reduce((total, rec) => {
      return total + (rec.products || []).reduce((sub, p) => sub + (p.unitPrice || 0) * (p.qty || 0), 0);
    }, 0);
  }

  /**
   * Domain Logic: Resolves Order Modes into a unified receiver array.
   * Mode A: root products → synthetic receiver (self)
   * Mode B: external receivers → list of receivers
   * Mode C: both → synthetic receiver + external receivers
   * @private
   */
  _buildReceiversList(hasRoot, hasRecs, rootProds, recs, sName, sPhone, senderCtx) {
    const list = [];
    // If root products exist, the sender is also a receiver (Mode A/C)
    if (hasRoot) {
      list.push({
        receiverName: sName,
        receiverPhone: sPhone,
        address: senderCtx.address || null,
        city: senderCtx.city || null,
        state: senderCtx.state || null,
        pincode: senderCtx.pincode || null,
        products: rootProds
      });
    }
    // External receivers (Mode B/C)
    if (hasRecs) {
      list.push(...recs);
    }
    return list;
  }

  /**
   * Fetches paginated order summary list.
   * Standardizes response to the API Contract.
   */
  async getOrderSummaryList(filters) {
    const result = await orderRepository.findAllOrders(filters);
    return {
      data: result.data.map((o) => this._mapOrderSummary(o)),
      total: result.total
    };
  }

  /**
   * Fetches full aggregate graph for a single order.
   * Standardizes response to the API Contract.
   */
  async getOrderDetails(orderId) {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderAggregate(order);
  }

  /**
   * Updates core order metadata before physical execution threshold.
   */
  async updateOrder(orderId, payload, user) {
    const adminId = user?.employeeCode || null;
    const result = await orderRepository.updateOrder(orderId, payload, adminId);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapOrderSummary(result);
  }

  /**
   * Cancels entire order flow.
   */
  async cancelOrder(orderId, user) {
    const adminId = user?.employeeCode || null;
    const result = await orderRepository.cancelOrder(orderId, adminId);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return result;
  }

  /**
   * Internal mapper for Order Summary objects.
   * Handles dual-case naming from Live DB vs Mock seeds.
   * @private
   */
  _mapOrderSummary(o) {
    return {
      id: o.PkOrderId || o.id,
      orderCode: o.OrderCode || o.orderCode,
      senderName: o.SenderName || o.senderName,
      senderMobile: o.SenderMobile || o.senderMobile,
      totalAmount: o.TotalAmount || o.totalAmount,
      derivedStatus: o.DerivedStatus || o.derivedStatus || 'Created',
      createdAt: o.CreatedAt || o.createdAt
    };
  }

  /**
   * Internal mapper for Order Aggregate objects.
   * Cascades through receivers, items, and parcels.
   * @private
   */
  _mapOrderAggregate(o) {
    return {
      ...this._mapOrderSummary(o),
      senderAddress: o.SenderAddress || o.senderAddress,
      courierId: o.FkCourierId || o.fkCourierId,
      receivers: (o.receivers || []).map((r) => ({
        id: r.PkReceiverDetailsId || r.id,
        receiverName: r.ReceiverName || r.receiverName,
        receiverPhone: r.ReceiverPhone || r.receiverPhone,
        address: r.Address || r.address,
        city: r.City || r.city,
        state: r.State || r.state,
        pincode: r.Pincode || r.pincode,
        parcel: r.parcel ? {
          id: r.parcel.PkParcelDetailsId || r.parcel.id,
          parcelId: r.parcel.ParcelID || r.parcel.parcel_id,
          status: r.parcel.ParcelStatus || r.parcel.parcelStatusCode || 'PENDING'
        } : null,
        products: (r.items || []).map((i) => ({
          productId: i.FkProductId || i.fkProductId,
          qty: i.OutwardQty || i.outwardQty,
          unitPrice: i.UnitPrice || i.unitPrice
        }))
      }))
    };
  }
}

export default new OrderService();
