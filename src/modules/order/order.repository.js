// ============================================================================
// File: src/modules/order/order.repository.js
// Description: Data access layer for the Order module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v2.md):
//   - Search:  prc_order_master_search
//   - Upserts: prc_order_master_set, prc_receiver_details_set, prc_order_items_set, prc_parcel_details_set
//   - Party:   prc_Party_master_set
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
   *
   * @param {object} senderData - { senderName, senderMobile, address?, city?, state?, pincode?, createdBy }
   * @returns {Promise<object>} The found or newly created party record.
   */
  async findOrCreateParty(senderData) {
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
   * Create a new order atomically using a managed transaction.
   * Orchestrates multiple SP calls: order_master -> receiver_details -> order_items -> parcel_details.
   *
   * @param {object} orderData - The normalized order payload.
   * @param {number|string} adminId - The ID of the employee creating the order.
   * @returns {Promise<object>} The created order summary.
   */
  async createOrder(orderData, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();

        // 1. Create Order Master
        const [orderResult] = await connection.execute(
          'CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            0, // pPkOrderId
            orderData.senderId || null,
            orderData.senderName,
            orderData.senderMobile,
            orderData.senderAddress || null,
            null, // City (from party usually)
            null, // State
            null, // Pincode
            orderData.totalAmount || 0,
            adminId,
            1 // IsActive
          ]
        );
        const orderId = orderResult[0][0].PkOrderId;

        // 2. Iterate Receivers
        for (const rec of orderData.receivers) {
          const [recResult] = await connection.execute(
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
              1 // IsActive
            ]
          );
          const receiverDetailsId = recResult[0][0].PkReceiverDetailsId;

          // 3. Iterate Products/Items
          for (const prod of rec.products) {
            await connection.execute(
              'CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)',
              [
                0, // pPkOrderItemId
                receiverDetailsId,
                prod.productId,
                prod.qty,
                null, // pFkUnitId (resolved in SP usually)
                prod.unitPrice || null,
                adminId,
                1 // IsActive
              ]
            );
          }

          // 4. Generate Parcel (TriggerType 0 = CREATE)
          await connection.execute(
            'CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)',
            [
              0, // pTriggerType: CREATE
              0, // pPkParcelDetailsId
              receiverDetailsId,
              null, // pAWBNumber
              orderData.courierId,
              adminId
            ]
          );
        }

        await connection.commit();
        return { orderId, orderCode: orderResult[0][0].OrderCode };
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    }

    // MOCK MODE
    const order = {
      id: seedOrders.length + 1,
      orderCode: `ORD-${Date.now()}`,
      fkSenderId: orderData.senderId,
      senderName: orderData.senderName,
      senderMobile: orderData.senderMobile,
      senderAddress: orderData.senderAddress,
      fkCourierId: orderData.courierId,
      totalAmount: 0,
      createdBy: adminId || null,
      createdAt: new Date(),
      isActive: true
    };
    seedOrders.push(order);
    return order;
  }

  // MOCK sub-methods used by service in mock mode
  async createReceiver(orderId, receiverData) {
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

  async createOrderItem(receiverDetailsId, productId, quantity, unitPrice) {
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

  async createParcel(receiverDetailsId, courierId) {
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
   * Get all orders summary list.
   * Procedure: CALL prc_order_master_search(0, 0, 0, 0)
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder, statusId }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAllOrders(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_search(?, ?, ?, ?)', [
        0, // pPkOrderId
        0, // pFkPartyId
        filters.courierId || 0,
        filters.statusId || 0
      ]);
      
      let data = rows[0] || [];
      
      // In-memory pagination/search if not handled by SP
      if (filters.search) {
        const s = filters.search.toLowerCase();
        data = data.filter(o => 
          o.OrderCode.toLowerCase().includes(s) || 
          o.SenderName.toLowerCase().includes(s)
        );
      }

      const total = data.length;
      const page = parseInt(filters.page) || 1;
      const limit = parseInt(filters.limit) || 20;
      const paginatedData = data.slice((page - 1) * limit, page * limit);

      return { data: paginatedData, total };
    }

    // MOCK MODE
    const activeOrders = seedOrders.filter((o) => o.isActive);
    return {
      data: activeOrders.map((order) => {
        const receivers = seedReceivers.filter((r) => r.fkOrderId === order.id);
        const parcels = seedParcels.filter((p) =>
          receivers.some((r) => r.id === p.fkReceiverDetailsId)
        );
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
   * Get full order aggregate.
   * Procedure: CALL prc_order_master_search(id, 0, 0, 0)
   *
   * @param {number|string} orderId
   * @returns {Promise<object|null>}
   */
  async findById(orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_search(?, ?, ?, ?)', [
        orderId,
        0, 0, 0
      ]);
      return rows[0]?.[0] || null;
    }

    // MOCK MODE
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;

    const receiversRaw = seedReceivers.filter((r) => r.fkOrderId === order.id);
    const orderItemsRaw = seedOrderItems.filter((i) =>
      receiversRaw.some((r) => r.id === i.fkReceiverDetailsId)
    );
    const parcelsRaw = seedParcels.filter((p) =>
      receiversRaw.some((r) => r.id === p.fkReceiverDetailsId)
    );

    const receiverMap = new Map();
    receiversRaw.forEach((r) => {
      receiverMap.set(r.id, { ...r, items: [], parcel: null });
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

    const derivedStatus = this._deriveOrderStatus(parcelsRaw);

    return {
      ...order,
      derivedStatus,
      receivers: Array.from(receiverMap.values())
    };
  }

  // ============================================================================
  // UPDATE & CANCEL OPERATIONS
  // ============================================================================

  /**
   * Update an existing order.
   *
   * @param {number|string} orderId
   * @param {object} payload
   * @param {number|string} adminId
   * @returns {Promise<object|null>}
   */
  async updateOrder(orderId, payload, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId,
        null, // pSenderId
        payload.senderName || null,
        payload.senderMobile || null,
        payload.senderAddress || null,
        null, null, null, // City, State, Pincode
        null, // pTotalAmount
        adminId,
        1 // pIsActive
      ]);
      return rows[0]?.[0] || null;
    }

    // MOCK MODE check threshold
    const orderIndex = seedOrders.findIndex((o) => o.id === parseInt(orderId) && o.isActive);
    if (orderIndex === -1) return null;

    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) =>
      receivers.some((r) => r.id === p.fkReceiverDetailsId)
    );

    const BLOCKED_STATUSES = ['AWB_LINKED', 'DISPATCHED', 'DELIVERED'];
    if (parcels.some((p) => BLOCKED_STATUSES.includes(p.parcelStatusCode))) {
      const error = new Error('Cannot update order: physical execution has begun.');
      error.statusCode = 400;
      throw error;
    }

    seedOrders[orderIndex] = { ...seedOrders[orderIndex], ...payload };
    return seedOrders[orderIndex];
  }

  /**
   * Cancel an order.
   *
   * @param {number|string} orderId
   * @param {number|string} adminId
   * @returns {Promise<object|null>}
   */
  async cancelOrder(orderId, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // In v2, cancellation might involve individual parcel updates
      // or a specific order cancellation procedure.
      // For now, we'll fetch parcels and cancel them.
      const order = await this.findById(orderId);
      if (!order) return null;

      // This logic should ideally be in a procedure, but following user request
      // to handle complex transactions in repository if needed.
      // Assuming prc_order_master_set handles pIsActive=0 as cancellation.
      const [rows] = await db.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId,
        null, null, null, null, null, null, null, null,
        adminId,
        0 // pIsActive=0 for cancel
      ]);
      return rows[0]?.[0] || null;
    }

    // MOCK MODE
    const order = seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive);
    if (!order) return null;

    const receivers = seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId));
    const parcels = seedParcels.filter((p) =>
      receivers.some((r) => r.id === p.fkReceiverDetailsId)
    );

    const TERMINAL_BLOCKING = ['DISPATCHED', 'DELIVERED'];
    if (parcels.some((p) => TERMINAL_BLOCKING.includes(p.parcelStatusCode))) {
      const error = new Error('Cannot cancel order: already dispatched or delivered.');
      error.statusCode = 400;
      throw error;
    }

    parcels.forEach(p => { p.parcelStatusCode = 'CANCELLED'; });
    return { orderId: order.id, cancelledCount: parcels.length };
  }

  _deriveOrderStatus(parcels) {
    if (!parcels || parcels.length === 0) return 'Created';
    const statuses = parcels.map((p) => p.parcelStatusCode);
    if (statuses.every((s) => s === 'CANCELLED')) return 'Cancelled';
    if (statuses.every((s) => s === 'DELIVERED')) return 'Completed';
    if (statuses.every((s) => s === 'DISPATCHED')) return 'Dispatched';
    if (statuses.some((s) => ['DISPATCHED', 'DELIVERED'].includes(s))) return 'Partially Dispatched';
    if (statuses.every((s) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(s))) return 'Label Printed';
    if (statuses.some((s) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(s))) return 'Partially Printed';
    return 'Created';
  }
}

export default new OrderRepository();
