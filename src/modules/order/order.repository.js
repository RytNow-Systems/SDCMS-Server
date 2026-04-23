// ============================================================================
// File: src/modules/order/order.repository.js
// Description: Data access layer for the Order module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_order_master_get (pAction=0 list, pAction=1 detail)
//   - Upserts: prc_order_master_set (ID=0 insert, ID>0 update, pCancelRequested=1 cancel)
//   - Party:   prc_Party_master_set (ID=0 find-or-create by phone)
//
// ⚠️ In LIVE mode, the atomic order creation (order_master → receiver_details
//    → order_items → parcel_details) is handled entirely by the SP.
//    In MOCK mode, we simulate the multi-step orchestration in-memory.
// ============================================================================

import { v4 as uuidv4 } from 'uuid';
import db from '../../infrastructure/database/db.js';

import {
  seedParties,
  seedOrderItems,
  seedOrders,
  seedParcels,
  seedReceivers,
} from './order.seed.js';

class OrderRepository {
  // ============================================================================
  // PARTY (SENDER) OPERATIONS
  // ============================================================================

  /**
   * Find-or-create a party (sender) by phone number.
   * Procedure: CALL prc_Party_master_set(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: ID=0 triggers insert-or-find-by-phone logic inside the SP.
   *
   * @param {object} senderData - { senderName, senderMobile, address?, city?, state?, pincode? }
   * @returns {Promise<object>} The found or newly created party record.
   */
  async findOrCreateParty(senderData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_set (ID=0 → find-or-create by phone)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // ID=0 → insert or find-by-phone
        1, // pPartyTypeId: 1 = Sender
        senderData.senderName,
        senderData.senderMobile,
        null, // EmailId
        senderData.address || null,
        senderData.city || null,
        senderData.state || null,
        senderData.pincode || null,
        senderData.createdBy || null,
        1 // IsActive=1
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory find-or-create by phone
    // ------------------------------------------------------------------
    let party = seedParties.find((p) => p.phoneNo === senderData.senderMobile);
    if (!party) {
      party = {
        id: seedParties.length + 1,
        customerName: senderData.senderName,
        phoneNo: senderData.senderMobile,
        address: senderData.address || null,
        city: senderData.city || null,
        state: senderData.state || null,
        pincode: senderData.pincode || null,
        isActive: true
      };
      seedParties.push(party);
    }
    return party;
  }

  // ============================================================================
  // ORDER OPERATIONS
  // ============================================================================

  /**
   * Create a new order atomically (order_master → receiver_details → order_items → parcel_details).
   * Procedure: CALL prc_order_master_set(0, ?)
   * Convention: ID=0 triggers full atomic insert of the order graph.
   *
   * In LIVE mode: the full JSON payload is passed to the SP which handles the
   * entire atomic transaction internally. The SP creates the order, receivers,
   * items, and parcels in one shot.
   *
   * In MOCK mode: multi-step orchestration is done by the service layer calling
   * createReceiver(), createOrderItem(), createParcel() individually.
   *
   * @param {object} orderData - The full order payload (or mock fields).
   * @returns {Promise<object>} The created order record.
   */
  async createOrder(orderData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_order_master_set (ID=0 → Atomic order creation)
    // The full order (sender + receivers + items + parcels) is created in
    // a single atomic stored procedure call. No partial writes.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?)', [
        0, // ID=0 → Insert new order
        JSON.stringify(orderData)
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory order header creation
    // (receivers, items, parcels are created by service calling sub-methods)
    // ------------------------------------------------------------------
    const order = {
      id: seedOrders.length + 1,
      orderCode: `ORD-${Date.now()}`,
      fkSenderId: orderData.senderId,
      senderName: orderData.senderName,
      senderMobile: orderData.senderMobile,
      senderAddress: orderData.senderAddress,
      fkCourierId: orderData.courierId,
      totalAmount: 0,
      createdBy: orderData.createdBy || null,
      createdAt: new Date(),
      isActive: true
    };
    seedOrders.push(order);
    return order;
  }

  /**
   * Create a receiver row linked to an order.
   * MOCK MODE ONLY — in live mode, handled inside prc_order_master_set atomically.
   *
   * @param {number} orderId - FK to order_master.
   * @param {object} receiverData - Structured receiver fields.
   * @returns {Promise<object>} The created receiver_details record.
   */
  async createReceiver(orderId, receiverData) {
    // ------------------------------------------------------------------
    // LIVE DB: Not called — handled inside prc_order_master_set atomically.
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory receiver creation
    // ------------------------------------------------------------------
    const receiver = {
      id: seedReceivers.length + 1,
      fkOrderId: orderId,
      receiverName: receiverData.receiverName,
      receiverPhone: receiverData.receiverPhone || null,
      address: receiverData.address || null,
      city: receiverData.city || null,
      state: receiverData.state || null,
      pincode: receiverData.pincode || null,
      country: receiverData.country || 'India',
      isActive: true
    };
    seedReceivers.push(receiver);
    return receiver;
  }

  /**
   * Create an order item linked to a receiver.
   * MOCK MODE ONLY — in live mode, handled inside prc_order_master_set atomically.
   *
   * @param {number} receiverDetailsId - FK to receiver_details.
   * @param {number} productId - FK to product_master.
   * @param {number} quantity - OutwardQty.
   * @param {number|null} unitPrice - Custom price or null (falls back to MaterialRate).
   * @returns {Promise<object>} The created order_items record.
   */
  async createOrderItem(receiverDetailsId, productId, quantity, unitPrice) {
    // ------------------------------------------------------------------
    // LIVE DB: Not called — handled inside prc_order_master_set atomically.
    // Pricing fallback (UnitPrice or MaterialRate) is handled by the procedure.
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory item creation
    // ------------------------------------------------------------------
    const item = {
      id: seedOrderItems.length + 1,
      fkReceiverDetailsId: receiverDetailsId,
      fkProductId: productId,
      outwardQty: quantity,
      unitPrice: unitPrice || 0
    };
    seedOrderItems.push(item);
    return item;
  }

  /**
   * Create a parcel linked to a receiver.
   * MOCK MODE ONLY — in live mode, handled inside prc_order_master_set atomically.
   * Convention: 1 receiver = 1 parcel.
   *
   * @param {number} receiverDetailsId - FK to receiver_details.
   * @param {number} courierId - FK to courier_partner_master.
   * @returns {Promise<object>} The created parcel_details record.
   */
  async createParcel(receiverDetailsId, courierId) {
    // ------------------------------------------------------------------
    // LIVE DB: Not called — handled inside prc_order_master_set atomically.
    // parcel_id is system-generated; TrackingNo starts as NULL.
    // FkParcelStatusId resolves to lu_details.LuDetailsId for "PENDING".
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory parcel creation
    // ------------------------------------------------------------------
    const parcel = {
      id: seedParcels.length + 1,
      fkReceiverDetailsId: receiverDetailsId,
      fkCourierId: courierId,
      parcel_id: `PDS-${uuidv4().split('-')[0].toUpperCase()}`,
      trackingNo: null,
      parcelStatusCode: 'PENDING',
      labelPrintCount: 0,
      dispatchDate: null,
      createdAt: new Date()
    };
    seedParcels.push(parcel);
    return parcel;
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get all orders with derived summary (sender, receiver count, parcel count, derived status).
   * Procedure: CALL prc_order_master_get(0, ?, ?, ?, ?, ?)
   * Convention: pAction=0 → paginated list with dynamically derived order status.
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAllOrders(filters = {}) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_order_master_get (pAction=0 → Paginated summary)
    // The SP dynamically derives order status from parcel states.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_get(?, ?, ?, ?, ?, ?)', [
        0, // pAction=0 → Get all orders (paginated summary)
        filters.page || 1,
        filters.limit || 20,
        filters.search || null,
        filters.sortBy || 'CreatedDate',
        filters.sortOrder || 'desc'
      ]);
      return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering with derived order status
    // ------------------------------------------------------------------
    const activeOrders = seedOrders.filter((o) => o.isActive);

    return {
      data: activeOrders.map((order) => {
        const sender = seedParties.find((p) => p.id === order.fkSenderId);
        const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id);
        const parcels = seedParcels.filter((p) =>
          receivers.some((r) => r.id === p.fkReceiverDetailsId)
        );

        // ⚠️ DERIVED ORDER STATUS — calculated from parcel states (Systemflow Decision 2)
        const derivedStatus = this._deriveOrderStatus(parcels);

        return {
          id: order.id,
          orderCode: order.orderCode,
          senderName: order.senderName,
          senderMobile: order.senderMobile,
          totalAmount: order.totalAmount,
          totalReceivers: receivers.length,
          totalParcels: parcels.length,
          derivedStatus,
          createdAt: order.createdAt
        };
      }),
      total: activeOrders.length
    };
  }

  /**
   * Get full order aggregate (nested JSON: Order → Receivers → [Items, Parcel]).
   * Procedure: CALL prc_order_master_get(1, ?)
   * Convention: pAction=1 → single order aggregate with nested receivers, items, parcels.
   *
   * @param {number|string} orderId - PK of order_master.
   * @returns {Promise<object|null>} The full nested order aggregate, or null if not found.
   */
  async findById(orderId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_order_master_get (pAction=1 → Aggregate)
    // The SP returns flat rows that may need mapping, or a JSON aggregate.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_get(?, ?)', [
        1, // pAction=1 → Get specific order aggregate
        orderId
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory aggregate with hash map optimization
    // ------------------------------------------------------------------
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;

    const sender = seedParties.find((p) => p.id === order.fkSenderId);

    // Filter relevant flat rows
    const receiversRaw = seedReceivers.filter((r) => r.fkOrderId === order.id);
    const orderItemsRaw = seedOrderItems.filter((i) =>
      receiversRaw.some((r) => r.id === i.fkReceiverDetailsId)
    );
    const parcelsRaw = seedParcels.filter((p) =>
      receiversRaw.some((r) => r.id === p.fkReceiverDetailsId)
    );

    // O(N) Hash Map Optimization to map Items & Parcels to their specific Receivers
    const receiverMap = new Map();

    receiversRaw.forEach((r) => {
      receiverMap.set(r.id, {
        ...r,
        items: [],
        parcel: null
      });
    });

    orderItemsRaw.forEach((item) => {
      if (receiverMap.has(item.fkReceiverDetailsId)) {
        receiverMap.get(item.fkReceiverDetailsId).items.push(item);
      }
    });

    parcelsRaw.forEach((parcel) => {
      if (receiverMap.has(parcel.fkReceiverDetailsId)) {
        receiverMap.get(parcel.fkReceiverDetailsId).parcel = parcel;
      }
    });

    // ⚠️ DERIVED ORDER STATUS
    const derivedStatus = this._deriveOrderStatus(parcelsRaw);

    return {
      id: order.id,
      orderCode: order.orderCode,
      senderName: order.senderName,
      senderMobile: order.senderMobile,
      senderAddress: order.senderAddress,
      totalAmount: order.totalAmount,
      derivedStatus,
      createdAt: order.createdAt,
      sender,
      receivers: Array.from(receiverMap.values())
    };
  }

  // ============================================================================
  // UPDATE & CANCEL OPERATIONS
  // ============================================================================

  /**
   * Update an existing order (sender, receivers, items).
   * Procedure: CALL prc_order_master_set(orderId, ?)
   * Convention: ID>0 triggers update. SP rejects if any parcel ≥ AWB_LINKED.
   *
   * ❗ BUSINESS RULE: Must fail if any parcel status ≥ AWB_LINKED.
   *
   * @param {number|string} orderId - PK of order_master.
   * @param {object} payload - Updated order payload.
   * @returns {Promise<object|null>} The updated order, or null if not found / blocked.
   */
  async updateOrder(orderId, payload) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_order_master_set (ID>0 → Update)
    // The SP enforces the AWB_LINKED threshold check internally.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?)', [
        orderId, // ID>0 → Update existing order
        JSON.stringify(payload)
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory update with AWB threshold check
    // ------------------------------------------------------------------
    const orderIndex = seedOrders.findIndex((o) => o.id === parseInt(orderId) && o.isActive);
    if (orderIndex === -1) return null;

    // Check threshold: reject if any parcel ≥ AWB_LINKED
    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) =>
      receivers.some((r) => r.id === p.fkReceiverDetailsId)
    );

    const BLOCKED_STATUSES = ['AWB_LINKED', 'DISPATCHED', 'DELIVERED'];
    const hasBlockedParcel = parcels.some((p) => BLOCKED_STATUSES.includes(p.parcelStatusCode));
    if (hasBlockedParcel) {
      const error = new Error('Cannot update order: one or more parcels have already been AWB-linked or dispatched.');
      error.statusCode = 400;
      throw error;
    }

    // Apply updates to the order header
    seedOrders[orderIndex] = {
      ...seedOrders[orderIndex],
      senderName: payload.senderName || seedOrders[orderIndex].senderName,
      senderMobile: payload.senderMobile || seedOrders[orderIndex].senderMobile,
      senderAddress: payload.senderAddress || seedOrders[orderIndex].senderAddress,
      fkCourierId: payload.courierId || seedOrders[orderIndex].fkCourierId
    };

    return seedOrders[orderIndex];
  }

  /**
   * Cancel an order and cascade to all parcels.
   * Procedure: CALL prc_order_master_set(orderId, pCancelRequested=1)
   * Convention: pCancelRequested flag triggers cascading cancellation.
   * SP internally invokes prc_receiver_status_details_set for each parcel.
   *
   * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED.
   * ✔ Cascades cancellation to all parcels.
   * ✔ Logs each status change to receiver_status_details.
   *
   * @param {number|string} orderId - PK of order_master.
   * @param {string} cancelledBy - EmployeeCode of the user performing cancellation.
   * @returns {Promise<object|null>} Cancellation result, or null if not found.
   */
  async cancelOrder(orderId, cancelledBy) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_order_master_set (pCancelRequested=1)
    // The SP handles cascading cancellation and audit logging internally.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?)', [
        orderId,
        JSON.stringify({ pCancelRequested: 1 }),
        cancelledBy
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory cascading cancellation
    // ------------------------------------------------------------------
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;

    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) =>
      receivers.some((r) => r.id === p.fkReceiverDetailsId)
    );

    // Business rule: cannot cancel if any parcel is dispatched or delivered
    const TERMINAL_BLOCKING = ['DISPATCHED', 'DELIVERED'];
    const hasBlockingParcel = parcels.some((p) => TERMINAL_BLOCKING.includes(p.parcelStatusCode));
    if (hasBlockingParcel) {
      const error = new Error('Cannot cancel order: one or more parcels are already dispatched or delivered.');
      error.statusCode = 400;
      throw error;
    }

    // Cascade cancellation: mark all parcels as CANCELLED
    parcels.forEach((parcel) => {
      const index = seedParcels.findIndex((p) => p.id === parcel.id);
      if (index !== -1) {
        seedParcels[index].parcelStatusCode = 'CANCELLED';
        // ✔ In the real DB, prc_order_master_set appends a row to receiver_status_details
        // for each parcel with ActionType = 'STATUS_UPDATE'
      }
    });

    return {
      orderId: order.id,
      orderCode: order.orderCode,
      cancelledParcels: parcels.length,
      cancelledBy,
      cancelledAt: new Date()
    };
  }

  // ============================================================================
  // INTERNAL HELPERS (MOCK MODE ONLY)
  // ============================================================================

  /**
   * Derives order status from aggregated parcel states (Systemflow Decision 2).
   * MOCK MODE ONLY — in live DB mode, the SP computes this dynamically.
   *
   * @param {Array} parcels - Array of parcel_details records.
   * @returns {string} The derived order status string.
   * @private
   */
  _deriveOrderStatus(parcels) {
    if (!parcels || parcels.length === 0) return 'Created';

    const statuses = parcels.map((p) => p.parcelStatusCode);

    const allMatch = (status) => statuses.every((s) => s === status);
    const someMatch = (status) => statuses.some((s) => s === status);

    if (allMatch('CANCELLED')) return 'Cancelled';
    if (allMatch('DELIVERED')) return 'Completed';
    if (allMatch('DISPATCHED')) return 'Dispatched';
    if (someMatch('DISPATCHED') || someMatch('DELIVERED')) return 'Partially Dispatched';
    if (allMatch('LABEL_PRINTED') || allMatch('AWB_LINKED')) return 'Label Printed';
    if (someMatch('LABEL_PRINTED') || someMatch('AWB_LINKED')) return 'Partially Printed';
    if (allMatch('PENDING')) return 'Created';

    return 'Created';
  }
}

export default new OrderRepository();
