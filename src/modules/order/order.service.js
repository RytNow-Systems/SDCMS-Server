// ============================================================================
// File: src/modules/order/order.service.js
// Description: Business logic layer for the Order module.
// Orchestrates Mode A (Self), Mode B (External), and Mode C (Combo) creation flows.
// Standardizes database results (PascalCase/camelCase) for the API contract.
// ============================================================================

import orderRepository from './order.repository.js';
import productRepository from '../product/product.repository.js';
import ParcelCodeService from '../parcel/parcel-code.service.js';

class OrderService {
  /**
   * Orchestrates the creation of an order based on the identified Mode.
   * 
   * @param {object} payload - Zod-validated order payload.
   * @param {object} user - Authenticated user context from auth middleware.
   * @returns {Promise<object>} Created order aggregate or receiver array.
   */
  async createOrder(payload, user) {
    const { senderId, senderAddressId, courierId, products, receivers } = payload;
    const createdBy = user?.employeeCode || null;

    // Resolve Sender details
    const sender = await orderRepository.resolveParty(senderId);
    if (!sender) {
      const error = new Error('Invalid senderId: Party not found.');
      error.statusCode = 400;
      throw error;
    }

    const senderAddressDetails = await orderRepository.resolveAddress(senderId, senderAddressId);
    if (!senderAddressDetails) {
      const error = new Error('Invalid senderAddressId: Address not found for sender.');
      error.statusCode = 400;
      throw error;
    }

    // Resolve receivers and products
    const resolvedProducts = await this._resolveProducts(products);
    const resolvedReceivers = await this._resolveReceivers(receivers);

    // Detect Modes
    const hasRootProducts = Array.isArray(resolvedProducts) && resolvedProducts.length > 0;
    const hasReceivers = Array.isArray(resolvedReceivers) && resolvedReceivers.length > 0;

    const ctx = { 
      senderId, 
      senderName: sender.CustomerName, 
      senderMobile: sender.PhoneNo, 
      senderAddress: senderAddressDetails.Address, 
      senderCity: senderAddressDetails.City, 
      senderState: senderAddressDetails.State, 
      senderPincode: senderAddressDetails.Pincode, 
      courierId, 
      products: resolvedProducts, 
      receivers: resolvedReceivers, 
      hasRootProducts, 
      hasReceivers, 
      createdBy 
    };

    if (process.env.USE_MOCK_DB !== 'true') {
      return this._createOrderLive(ctx);
    }

    return this._createOrderMock(ctx);
  }

  async _resolveProducts(products) {
    if (!products) return undefined;
    const resolved = [];
    for (const p of products) {
      const variation = await orderRepository.resolveVariation(p.variationId);
      if (!variation) {
        const error = new Error(`Invalid variationId: ${p.variationId} not found.`);
        error.statusCode = 400;
        throw error;
      }
      let unitId = variation.FkUnitId || variation.fkUnitId;
      
      // Fallback: If variation doesn't contain FkUnitId, fetch it directly from the product master
      if (!unitId && variation.FkProductId) {
        const product = await orderRepository.resolveProduct(variation.FkProductId);
        unitId = product ? (product.FkUnitId || product.fkUnitId) : null;
      }

      resolved.push({
        productId: variation.FkProductId,
        qty: p.quantity,
        unitPrice: variation.MaterialRate,
        unitId: unitId || null
      });
    }
    return resolved;
  }

  async _resolveReceivers(receivers) {
    if (!receivers) return undefined;
    const resolved = [];
    for (const r of receivers) {
      const party = await orderRepository.resolveParty(r.receiverId);
      if (!party) {
        const error = new Error(`Invalid receiverId: ${r.receiverId} not found.`);
        error.statusCode = 400;
        throw error;
      }
      
      const address = await orderRepository.resolveAddress(r.receiverId, r.receiverAddressId);
      if (!address) {
        const error = new Error(`Invalid receiverAddressId: ${r.receiverAddressId} not found for receiver.`);
        error.statusCode = 400;
        throw error;
      }

      const resolvedProducts = await this._resolveProducts(r.products);

      resolved.push({
        receiverId: r.receiverId,
        receiverName: party.CustomerName,
        receiverPhone: party.PhoneNo,
        address: address.Address,
        city: address.City,
        state: address.State,
        pincode: address.Pincode,
        products: resolvedProducts
      });
    }
    return resolved;
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

    // Step 3: Build the aggregate graph for the repository
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

    // Step 4: Iteratively build the mock graph (receivers -> items -> parcels)
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
        items.push(await orderRepository.createOrderItem(recRecord.id, prod.productId, prod.qty, prod.unitPrice, prod.unitId));
      }
      // 1 parcel execution unit (standard)
      const parcel = await orderRepository.createParcel(recRecord.id, courierId);
      aggregated.push({ ...recRecord, items, parcel });
    }
    return aggregated;
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
   * Updates full order graph (sender snapshot, receivers, items).
   * Validates state threshold (no changes if any parcel is >= AWB_LINKED).
   */
  async updateOrder(orderId, payload, user) {
    const adminId = user?.employeeCode || null;

    // 1. Fetch existing order header
    const existingHeader = await orderRepository.getOrderHeader(orderId);
    if (!existingHeader) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Fetch existing graph to diff against
    const existingReceivers = await orderRepository.getReceiversForOrder(orderId);
    const existingReceiverIds = existingReceivers.map(r => r.PkReceiverDetailsId || r.id);
    const existingItems = await orderRepository.getItemsForReceivers(existingReceiverIds);
    const existingParcels = await orderRepository.getParcelsForReceivers(existingReceiverIds);

    // 3. Threshold guard: block if any parcel has reached physical execution
    const blockStatuses = ['AWB_LINKED', 'DISPATCHED', 'DELIVERED'];
    if (existingParcels.some(p => blockStatuses.includes(p.ParcelStatusName || p.StatusDescription || p.FkParcelStatusId || p.parcelStatusCode))) {
      const error = new Error('Cannot update order: physical execution has begun on one or more parcels.');
      error.statusCode = 400;
      throw error;
    }

    // 4. Resolve Sender Snapshot (if sender fields provided)
    let headerPayload = {};
    if (payload.senderId && payload.senderAddressId) {
      const party = await orderRepository.resolveParty(payload.senderId);
      const address = await orderRepository.resolveAddress(payload.senderId, payload.senderAddressId);
      
      if (!party || !address) {
        const error = new Error('Invalid senderId or senderAddressId');
        error.statusCode = 400;
        throw error;
      }
      
      headerPayload = {
        senderId: payload.senderId,
        senderName: party.CustomerName || party.customerName,
        senderMobile: party.PhoneNo || party.phoneNo,
        senderAddress: address.Address || address.addressLine1 || address.address,
        city: address.City || address.city,
        state: address.State || address.state,
        pincode: address.Pincode || address.pincode
      };
    }

    // 5. Build Diffs for Receivers & Items
    let diffs = { receivers: { toUpdate: [], toCreate: [], toRemove: [] } };
    
    if (payload.receivers && Array.isArray(payload.receivers)) {
      // Resolve incoming receivers (Party/Address/Products)
      const resolvedReceivers = await this._resolveUpdateReceivers(payload.receivers);
      
      // Compute diffs
      diffs.receivers = this._diffReceivers(existingReceivers, resolvedReceivers, existingItems, existingParcels);

      // Recalculate total amount from the intended final state (toUpdate + toCreate)
      headerPayload.totalAmount = this._calculateTotalAmount([...diffs.receivers.toUpdate, ...diffs.receivers.toCreate]);
    } else {
      // If no receivers in payload, we still need to calculate the current totalAmount
      // by reconstructing the current receivers state so the repository update doesn't zero it out.
      const currentResolved = existingReceivers.map(r => {
        const rId = r.PkReceiverDetailsId || r.id;
        return {
          ...r,
          products: existingItems.filter(i => (i.FkReceiverDetailsId || i.fkReceiverDetailsId) === rId)
                                 .map(i => ({ unitPrice: i.UnitPrice || i.unitPrice, qty: i.OutwardQty || i.outwardQty }))
        };
      });
      headerPayload.totalAmount = this._calculateTotalAmount(currentResolved);
    }

    // 6. Execute Transaction
    await orderRepository.updateOrderGraph(orderId, headerPayload, diffs, adminId);

    // 7. Re-fetch full aggregate
    return await this.getOrderDetails(orderId);
  }

  // ============================================================================
  // UPDATE DIFF HELPERS
  // ============================================================================

  /** @private */
  async _resolveUpdateReceivers(receivers) {
    const resolved = [];
    for (const rec of receivers) {
      const party = await orderRepository.resolveParty(rec.receiverId);
      const address = await orderRepository.resolveAddress(rec.receiverId, rec.receiverAddressId);

      if (!party || !address) {
        const error = new Error(`Invalid receiverId or receiverAddressId for receiver ${rec.receiverId}`);
        error.statusCode = 400;
        throw error;
      }

      const products = [];
      for (const p of rec.products) {
        const prodData = await orderRepository.resolveProduct(p.variationId);
        if (!prodData) {
          const error = new Error(`Invalid variationId: ${p.variationId}`);
          error.statusCode = 400;
          throw error;
        }
        products.push({
          orderItemId: p.orderItemId, // may be undefined for new items
          variationId: p.variationId,
          productId: prodData.PkProductId || prodData.id,
          unitId: prodData.FkUnitId || prodData.fkUnitId,
          unitPrice: prodData.MaterialRate || prodData.materialRate || 0,
          qty: p.quantity
        });
      }

      resolved.push({
        receiverDetailsId: rec.receiverDetailsId, // may be undefined
        receiverId: rec.receiverId,
        receiverName: party.CustomerName || party.customerName,
        receiverPhone: party.PhoneNo || party.phoneNo,
        receiverEmail: party.EmailId || party.email || '',
        address: address.Address || address.addressLine1 || address.address,
        city: address.City || address.city,
        state: address.State || address.state,
        pincode: address.Pincode || address.pincode,
        products
      });
    }
    return resolved;
  }

  /** @private */
  _diffReceivers(existing, incoming, allExistingItems, allExistingParcels) {
    const diffs = { toUpdate: [], toCreate: [], toRemove: [] };
    const incomingMap = new Map();

    for (const inc of incoming) {
      if (inc.receiverDetailsId) {
        incomingMap.set(inc.receiverDetailsId, inc);
        // Compute item diffs for this receiver
        const exItems = allExistingItems.filter(i => (i.FkReceiverDetailsId || i.fkReceiverDetailsId) === inc.receiverDetailsId);
        inc.itemDiffs = this._diffItems(exItems, inc.products);
        diffs.toUpdate.push(inc);
      } else {
        diffs.toCreate.push(inc);
      }
    }

    for (const ex of existing) {
      const exId = ex.PkReceiverDetailsId || ex.id;
      if (!incomingMap.has(exId)) {
        const parcel = allExistingParcels.find(p => (p.FkReceiverDetailsId || p.fkReceiverDetailsId) === exId);
        const exItems = allExistingItems.filter(i => (i.FkReceiverDetailsId || i.fkReceiverDetailsId) === exId);
        diffs.toRemove.push({
          ...ex,
          receiverDetailsId: exId,
          parcelId: parcel ? (parcel.PkParcelDetailsId || parcel.id) : null,
          existingItems: exItems
        });
      }
    }

    return diffs;
  }

  /** @private */
  _diffItems(existingItems, incomingProducts) {
    const diffs = { toUpdate: [], toCreate: [], toRemove: [] };
    const incomingMap = new Map();

    for (const inc of incomingProducts) {
      if (inc.orderItemId) {
        incomingMap.set(inc.orderItemId, inc);
        diffs.toUpdate.push(inc);
      } else {
        diffs.toCreate.push(inc);
      }
    }

    for (const ex of existingItems) {
      const exId = ex.PkOrderItemId || ex.id;
      if (!incomingMap.has(exId)) {
        diffs.toRemove.push(ex);
      }
    }

    return diffs;
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
      senderId: o.FkSenderId || o.fkSenderId,
      senderName: o.SenderName || o.senderName,
      senderMobile: o.SenderMobile || o.senderMobile,
      totalAmount: o.TotalAmount || o.totalAmount,
      derivedStatus: o.DynamicOrderStatus || o.DerivedStatus || o.derivedStatus || 'Pending',
      createdAt: o.OrderDate || o.CreatedAt || o.createdAt,
      totalParcels: o.TotalParcels || o.totalParcels || 0
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
        receiverId: r.FkPartyId || r.fkPartyId,
        receiverName: r.ReceiverName || r.receiverName,
        receiverPhone: r.ReceiverPhone || r.receiverPhone,
        address: r.Address || r.address,
        city: r.City || r.city,
        state: r.State || r.state,
        pincode: r.Pincode || r.pincode,
        parcel: r.parcel ? {
          id: r.parcel.PkParcelDetailsId || r.parcel.id,
          parcelId: r.parcel.ParcelID || r.parcel.parcel_id,
          status: r.parcel.ParcelStatus || r.parcel.parcelStatusCode || 'PENDING',
          parcelCode: ParcelCodeService.generateCode(
            o.PkOrderId || o.id,
            r.parcel.PkParcelDetailsId || r.parcel.id
          )
        } : null,
        products: (r.items || []).map((i) => ({
          productId: i.FkProductId || i.fkProductId,
          quantity: i.OutwardQty || i.outwardQty,
          unitPrice: i.UnitPrice || i.unitPrice,
          materialName: i.MaterialName || i.materialName || null,
          materialCode: i.MaterialCode || i.materialCode || null,
          unitTitle: i.UnitTitle || i.unitTitle || null
        }))
      }))
    };
  }
}

export default new OrderService();
