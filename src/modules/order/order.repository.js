// ============================================================================
// File: src/modules/order/order.repository.js
// Description: Data access layer for the Order module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// Architecture Rule (AGENTS.md): 
// - Zero Direct Database Operations. All mutations use prc_..._set.
// - All scans/actions must be logged in receiver_status_details (cascaded via SPs).
// ============================================================================

import { v4 as uuidv4 } from 'uuid';
import db from '../../infrastructure/database/db.js';

import {
  seedOrderItems,
  seedOrders,
  seedParcels,
  seedReceivers,
} from './order.seed.js';

class OrderRepository {
  // ============================================================================
  // ORDER OPERATIONS
  // ============================================================================

  /**
   * Create a new order atomically using a managed transaction.
   * Orchestrates multiple SP calls to maintain referential integrity.
   * 
   * @param {object} orderData - Normalized payload containing receivers and items.
   * @param {number|string} adminId - The employee code for the creator.
   * @returns {Promise<object>} Created order metadata { orderId, orderCode }.
   */
  async createOrder(orderData, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      return this._createOrderLive(orderData, adminId);
    }
    return this._createOrderMock(orderData, adminId);
  }

  /**
   * Managed transaction flow for LIVE database creation.
   * OrderMaster -> ReceiverDetails -> OrderItems -> ParcelDetails.
   * @private
   */
  async _createOrderLive(orderData, adminId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Step 1: Insert Order Header
      const orderResult = await this._executeOrderMaster(connection, orderData, adminId);
      const orderId = orderResult.PkOrderId;

      // Step 2: Loop through receivers (Mode B/C)
      for (const rec of orderData.receivers) {
        const receiverDetailsId = await this._executeReceiverDetails(connection, orderId, rec, adminId);

        // Step 3: Insert items for this receiver
        for (const prod of rec.products) {
          await this._executeOrderItem(connection, receiverDetailsId, prod, adminId);
        }

        // Step 4: Generate Parcel execution unit for this receiver
        await this._executeParcelDetails(connection, receiverDetailsId, orderData.courierId, adminId);
      }

      await connection.commit();
      return { orderId, orderCode: orderResult.OrderCode };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Internal wrapper for prc_order_master_set.
   * @private
   */
  async _executeOrderMaster(connection, data, adminId) {
    const [rows] = await connection.execute(
      'CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        0, // pPkOrderId=0 for creation
        data.senderId || null, 
        data.senderName, 
        data.senderMobile, 
        data.senderAddress || null, 
        null, null, null, // pCity, pState, pPincode (inherited from Party)
        data.totalAmount || 0, 
        adminId, 
        1 // pIsActive
      ]
    );
    return rows[0][0];
  }

  /**
   * Internal wrapper for prc_receiver_details_set.
   * @private
   */
  async _executeReceiverDetails(connection, orderId, rec, adminId) {
    const [rows] = await connection.execute(
      'CALL prc_receiver_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        0, // pPkReceiverDetailsId
        orderId, 
        rec.receiverId || null, 
        rec.receiverName, 
        rec.receiverPhone || null, 
        rec.receiverEmail || null, 
        rec.address || null, 
        rec.city || null, 
        rec.state || null, 
        rec.pincode || null, 
        rec.country || 'India', 
        adminId, 
        1 // pIsActive
      ]
    );
    return rows[0][0].PkReceiverDetailsId;
  }

  /**
   * Internal wrapper for prc_order_items_set.
   * @private
   */
  async _executeOrderItem(connection, receiverDetailsId, prod, adminId) {
    await connection.execute(
      'CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        0, // pPkOrderItemId
        receiverDetailsId, 
        prod.productId, 
        prod.qty, 
        null, // pFkUnitId
        prod.unitPrice || null, 
        adminId, 
        1 // pIsActive
      ]
    );
  }

  /**
   * Internal wrapper for prc_parcel_details_set.
   * @private
   */
  async _executeParcelDetails(connection, receiverDetailsId, courierId, adminId) {
    await connection.execute(
      'CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)',
      [
        0, // pTriggerType: 0 (CREATE)
        0, // pPkParcelDetailsId
        receiverDetailsId, 
        null, // pAWBNumber
        courierId, 
        adminId
      ]
    );
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get all orders summary list using centralized search procedure.
   * Procedure: prc_order_master_search
   * 
   * @param {object} filters - Pagination and status filters.
   * @returns {Promise<object>} { data, total }
   */
  async findAllOrders(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_search(?, ?, ?, ?)', [
        0, // pPkOrderId: 0 for list
        0, // pFkPartyId: 0
        filters.courierId || 0, 
        filters.statusId || 0
      ]);
      // Pagination is handled in-memory for this module's search results.
      return this._paginateData(rows[0] || [], filters);
    }
    return this._findAllOrdersMock(filters);
  }

  /**
   * Internal pagination and search logic for summary lists.
   * @private
   */
  _paginateData(data, filters) {
    let result = data;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      // Handle dual-case naming convention: OrderCode (Live) vs orderCode (Mock)
      result = result.filter(o => {
        const code = (o.OrderCode || o.orderCode || '').toLowerCase();
        const name = (o.SenderName || o.senderName || '').toLowerCase();
        return code.includes(s) || name.includes(s);
      });
    }
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    return {
      data: result.slice((page - 1) * limit, page * limit),
      total: result.length
    };
  }

  /**
   * Get full order aggregate via search procedure.
   * 
   * @param {number|string} orderId - Primary identifier.
   * @returns {Promise<object|null>} Aggregated order record.
   */
  async findById(orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_search(?, ?, ?, ?)', [orderId, 0, 0, 0]);
      return rows[0]?.[0] || null;
    }
    return this._findByIdMock(orderId);
  }

  // ============================================================================
  // UPDATE & CANCEL OPERATIONS
  // ============================================================================

  /**
   * Update order master details.
   * 
   * @param {number|string} orderId
   * @param {object} payload
   * @param {number|string} adminId
   * @returns {Promise<object|null>} Updated record.
   */
  async updateOrder(orderId, payload, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId, 
        null, // pSenderId: null (do not update FK)
        payload.senderName || null, 
        payload.senderMobile || null, 
        payload.senderAddress || null, 
        null, null, null, // Address components
        null, // pTotalAmount
        adminId, 
        1 // pIsActive
      ]);
      return rows[0]?.[0] || null;
    }
    return this._updateOrderMock(orderId, payload);
  }

  /**
   * Logic for cancelling an order by setting IsActive=0.
   * Cascaded logic for parcels is handled by DB triggers/procedures.
   * 
   * @param {number|string} orderId
   * @param {number|string} adminId
   */
  async cancelOrder(orderId, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId, 
        null, null, null, null, null, null, null, null,
        adminId, 
        0 // pIsActive=0 signifies cancellation
      ]);
      return rows[0]?.[0] || null;
    }
    return this._cancelOrderMock(orderId);
  }

  // ============================================================================
  // MOCK IMPLEMENTATIONS (Clean Code separation)
  // ============================================================================

  /** @private */
  _createOrderMock(data, adminId) {
    const order = { id: seedOrders.length + 1, orderCode: `ORD-${Date.now()}`, fkSenderId: data.senderId, senderName: data.senderName, senderMobile: data.senderMobile, senderAddress: data.senderAddress, fkCourierId: data.courierId, totalAmount: 0, createdBy: adminId || null, createdAt: new Date(), isActive: true };
    seedOrders.push(order);
    return order;
  }

  /** @private */
  _findAllOrdersMock(filters) {
    const activeOrders = seedOrders.filter((o) => o.isActive);
    const data = activeOrders.map((order) => {
      const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id);
      const parcels = seedParcels.filter((p) => receivers.some((r) => r.id === p.fkReceiverDetailsId));
      return { id: order.id, orderCode: order.orderCode, senderName: order.senderName, senderMobile: order.senderMobile, totalAmount: order.totalAmount, totalReceivers: receivers.length, totalParcels: parcels.length, derivedStatus: this._deriveOrderStatus(parcels), createdAt: order.createdAt };
    });
    return this._paginateData(data, filters);
  }

  /** @private */
  _findByIdMock(orderId) {
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;
    const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id).map(r => ({
      ...r,
      items: seedOrderItems.filter(i => i.fkReceiverDetailsId === r.id),
      parcel: seedParcels.find(p => p.fkReceiverDetailsId === r.id)
    }));
    return { ...order, derivedStatus: this._deriveOrderStatus(receivers.map(r => r.parcel).filter(Boolean)), receivers };
  }

  /** @private */
  _updateOrderMock(orderId, payload) {
    const orderIndex = seedOrders.findIndex((o) => o.id === parseInt(orderId) && o.isActive);
    if (orderIndex === -1) return null;
    this._checkUpdateBlocked(orderId);
    seedOrders[orderIndex] = { ...seedOrders[orderIndex], ...payload };
    return seedOrders[orderIndex];
  }

  /** @private */
  _checkUpdateBlocked(orderId) {
    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) => receivers.some((r) => r.id === p.fkReceiverDetailsId));
    // Blocking logic: No updates after label printing/scanning begins
    if (parcels.some((p) => ['AWB_LINKED', 'DISPATCHED', 'DELIVERED'].includes(p.parcelStatusCode))) {
      const error = new Error('Cannot update order: physical execution has begun.');
      error.statusCode = 400;
      throw error;
    }
  }

  /** @private */
  _cancelOrderMock(orderId) {
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;
    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) => receivers.some((r) => r.id === p.fkReceiverDetailsId));
    if (parcels.some((p) => ['DISPATCHED', 'DELIVERED'].includes(p.parcelStatusCode))) {
      const error = new Error('Cannot cancel order: already dispatched.');
      error.statusCode = 400;
      throw error;
    }
    parcels.forEach(p => { p.parcelStatusCode = 'CANCELLED'; });
    return { orderId: order.id, cancelledCount: parcels.length };
  }

  /**
   * Mathematical status derivation from parcel lifecycle states.
   * Source of Truth: Parcel execution state.
   * @private
   */
  _deriveOrderStatus(parcels) {
    if (!parcels || parcels.length === 0) return 'Created';
    const s = parcels.map((p) => p.parcelStatusCode);
    if (s.every((x) => x === 'CANCELLED')) return 'Cancelled';
    if (s.every((x) => x === 'DELIVERED')) return 'Completed';
    if (s.every((x) => x === 'DISPATCHED')) return 'Dispatched';
    if (s.some((x) => ['DISPATCHED', 'DELIVERED'].includes(x))) return 'Partially Dispatched';
    if (s.every((x) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(x))) return 'Label Printed';
    if (s.some((x) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(x))) return 'Partially Printed';
    return 'Created';
  }

  // MOCK sub-methods used by service
  async createReceiver(orderId, data) {
    const r = { id: seedReceivers.length + 1, fkOrderId: orderId, ...data, isActive: true };
    seedReceivers.push(r); return r;
  }
  async createOrderItem(recId, prodId, qty, price) {
    const i = { id: seedOrderItems.length + 1, fkReceiverDetailsId: recId, fkProductId: prodId, outwardQty: qty, unitPrice: price || 0 };
    seedOrderItems.push(i); return i;
  }
  async createParcel(recId, courierId) {
    const p = { id: seedParcels.length + 1, fkReceiverDetailsId: recId, fkCourierId: courierId, parcel_id: `PDS-${uuidv4().split('-')[0].toUpperCase()}`, trackingNo: null, parcelStatusCode: 'PENDING', labelPrintCount: 0, dispatchDate: null, createdAt: new Date() };
    seedParcels.push(p); return p;
  }

  // ============================================================================
  // RESOLUTION OPERATIONS
  // ============================================================================

  async resolveParty(partyId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [1, null, partyId]);
      return rows[0]?.[0] || null;
    }
    // Mock implementation
    return {
      PkPartyId: partyId,
      CustomerName: `Mock Party ${partyId}`,
      PhoneNo: `99900000${partyId % 10}`
    };
  }

  async resolveAddress(partyId, addressId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_details_get(?, ?)', [1, partyId]);
      const addresses = rows[0] || [];
      return addresses.find(a => a.PkPartyDetailsId === addressId) || null;
    }
    // Mock implementation
    return {
      PkPartyDetailsId: addressId,
      Address: `Mock Address ${addressId}`,
      City: 'MockCity',
      State: 'MockState',
      Pincode: '000000'
    };
  }

  async resolveVariation(variationId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_get(?, ?)', [1, variationId]);
      return rows[0]?.[0] || null;
    }
    // Mock implementation
    return {
      PkProductColorId: variationId,
      FkProductId: 1,
      MaterialRate: 500
    };
  }
}

export default new OrderRepository();
