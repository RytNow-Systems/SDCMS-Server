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
import logger from '../../shared/utils/logger.js';

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
      const orderId = orderResult.GeneratedOrderId || orderResult.UpdatedOrderId || orderResult.PkOrderId || orderResult.pkOrderId;

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
      logger.error('OrderRepository._createOrderLive', `Failed to create order: ${error.message}`, { adminId });
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
        data.senderId ?? null, 
        data.senderName ?? null, 
        data.senderMobile ?? null, 
        data.senderAddress ?? null, 
        null, null, null, // pCity, pState, pPincode (inherited from Party)
        data.totalAmount ?? 0, 
        adminId ?? null, 
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
        orderId ?? null, 
        rec.receiverId ?? null, 
        rec.receiverName ?? null, 
        rec.receiverPhone ?? null, 
        rec.receiverEmail ?? null, 
        rec.address ?? null, 
        rec.city ?? null, 
        rec.state ?? null, 
        rec.pincode ?? null, 
        rec.country ?? 'India', 
        adminId ?? null, 
        1 // pIsActive
      ]
    );
    return rows[0]?.[0]?.GeneratedReceiverId || rows[0]?.[0]?.UpdatedReceiverId || rows[0]?.[0]?.PkReceiverDetailsId || rows[0]?.[0]?.pkReceiverDetailsId;
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
        receiverDetailsId ?? null, 
        prod.productId ?? null, 
        prod.qty ?? null, 
        prod.unitId ?? null, // pFkUnitId
        prod.unitPrice ?? null, 
        adminId ?? null, 
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
        0, // pPkParcelDetailsId
        0, // pTriggerType: 0 (CREATE)
        receiverDetailsId ?? null, 
        null, // pAWBNumber
        courierId ?? null, 
        adminId ?? null
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
      const [rows] = await db.execute('CALL prc_order_master_get(?, ?)', [
        0, // pAction: 0 for list
        0  // pPkOrderId: 0
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
      // Step 1: Get order header from prc_order_master_get (pAction=1)
      const [orderRows] = await db.execute('CALL prc_order_master_get(?, ?)', [1, orderId]);
      const orderHeader = orderRows[0]?.[0] || null;
      if (!orderHeader) return null;

      // Step 2: Get receivers from prc_receiver_details_get (pAction=0).
      // Filter by FkOrderId in JS to isolate this order's receivers.
      const [receiverRows] = await db.execute('CALL prc_receiver_details_get(?, ?)', [
        0, // pAction: 0 = get all receivers
        0  // pLookUpId: 0 (unused for pAction=0)
      ]);
      const allReceivers = receiverRows[0] || [];
      const orderReceivers = allReceivers.filter(r =>
        r.FkOrderId === parseInt(orderId)
      );

      // Step 3: Get parcels from prc_parcel_details_get (pAction=0).
      // Match each parcel to its receiver via FkReceiverDetailsId.
      const [parcelRows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [
        0, // pAction: 0 = get all parcels
        0  // pLookUpId: 0 (unused for pAction=0)
      ]);
      const allParcels = parcelRows[0] || [];

      // Step 4: Get order items from prc_order_items_get (pAction=0).
      // Match each item to its receiver via FkReceiverDetailsId.
      const [itemRows] = await db.execute('CALL prc_order_items_get(?, ?)', [
        0, // pAction: 0 = get all order items
        0  // pLookUpId: 0 (unused for pAction=0)
      ]);
      const allItems = itemRows[0] || [];

      return this._buildOrderAggregate(orderHeader, orderReceivers, allParcels, allItems);
    }
    return this._findByIdMock(orderId);
  }

  // ============================================================================
  // UPDATE & CANCEL OPERATIONS
  // ============================================================================

  /**
   * Build nested order aggregate from order header + receivers + parcels + items.
   *
   * Data Sources:
   * - orderHeader: prc_order_master_get(pAction=1)   → order_master columns
   * - receivers:   prc_receiver_details_get(pAction=0) filtered by FkOrderId
   * - allParcels:  prc_parcel_details_get(pAction=0)   → matched by FkReceiverDetailsId
   * - allItems:    prc_order_items_get(pAction=0)      → grouped by FkReceiverDetailsId
   *
   * @private
   * @param {object} orderHeader - Single row from prc_order_master_get.
   * @param {Array}  receivers   - Rows from prc_receiver_details_get filtered by orderId.
   * @param {Array}  allParcels  - All parcel rows from prc_parcel_details_get.
   * @param {Array}  allItems    - All order item rows from prc_order_items_get.
   */
  _buildOrderAggregate(orderHeader, receivers, allParcels, allItems) {
    if (!orderHeader) return null;

    const order = {
      PkOrderId: orderHeader.PkOrderId,
      OrderCode: orderHeader.OrderCode,
      FkSenderId: orderHeader.FkSenderId,
      OrderDate: orderHeader.OrderDate,
      ExpectedDeliveryDate: orderHeader.ExpectedDeliveryDate,
      TotalAmount: orderHeader.TotalAmount,
      SenderName: orderHeader.SenderName || orderHeader.CustomerName,
      SenderMobile: orderHeader.SenderMobile || orderHeader.SenderPhone,
      receivers: []
    };

    // Collect this order's receiver IDs for filtering parcels and items
    const receiverIds = new Set(receivers.map(r => r.PkReceiverDetailsId));

    // Index parcels by FkReceiverDetailsId for O(1) lookup
    const parcelsByReceiver = new Map();
    for (const p of allParcels) {
      const recId = p.FkReceiverDetailsId;
      if (!recId || !receiverIds.has(recId)) continue;
      // One receiver → one parcel (1:1 per domain rule)
      if (!parcelsByReceiver.has(recId)) {
        parcelsByReceiver.set(recId, p);
      }
    }

    // Group order items by FkReceiverDetailsId (one receiver → many items)
    const itemsByReceiver = new Map();
    for (const item of allItems) {
      const recId = item.FkReceiverDetailsId;
      if (!recId || !receiverIds.has(recId)) continue;
      if (!itemsByReceiver.has(recId)) {
        itemsByReceiver.set(recId, []);
      }
      itemsByReceiver.get(recId).push(item);
    }

    // Map each receiver row and attach its parcel + items
    order.receivers = receivers.map(r => {
      const recId = r.PkReceiverDetailsId;
      const parcelRow = parcelsByReceiver.get(recId) || null;
      const receiverItems = itemsByReceiver.get(recId) || [];

      return {
        PkReceiverDetailsId: recId,
        FkPartyId: r.FkReceiverId,
        ReceiverName: r.ReceiverName,
        ReceiverPhone: r.ReceiverPhone,
        Address: r.Address,
        City: r.City,
        State: r.State,
        Pincode: r.Pincode,
        items: receiverItems.map(i => ({
          PkOrderItemId: i.PkOrderItemId,
          FkProductId: i.FkProductId,
          OutwardQty: i.OutwardQty,
          UnitPrice: i.UnitPrice,
          MaterialName: i.MaterialName,
          MaterialCode: i.MaterialCode,
          UnitTitle: i.UnitTitle
        })),
        parcel: parcelRow ? {
          PkParcelDetailsId: parcelRow.PkParcelDetailsId,
          ParcelID: parcelRow.QRCode,
          TrackingNo: parcelRow.TrackingNo,
          ParcelStatus: parcelRow.ParcelStatusName || parcelRow.StatusDescription || parcelRow.FkParcelStatusId
        } : null
      };
    });

    return order;
  }

  // ============================================================================
  // FULL GRAPH UPDATE OPERATIONS (READ & WRITE)
  // ============================================================================

  /**
   * Get order header by ID (lightweight check for existence).
   * Procedure: prc_order_master_get(pAction=1, pPkOrderId)
   */
  async getOrderHeader(orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_master_get(?, ?)', [1, orderId]);
      return rows[0]?.[0] || null;
    }
    return seedOrders.find((o) => o.id === parseInt(orderId) && o.isActive) || null;
  }

  /**
   * Get all active receivers for a specific order.
   * Procedure: prc_receiver_details_get(pAction=0, 0)
   */
  async getReceiversForOrder(orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_details_get(?, ?)', [0, 0]);
      return (rows[0] || []).filter(r => r.FkOrderId === parseInt(orderId) && r.IsActive !== 'InActive');
    }
    return seedReceivers.filter((r) => r.fkOrderId === parseInt(orderId) && r.isActive !== false);
  }

  /**
   * Get all active items for a set of receiver IDs.
   * Procedure: prc_order_items_get(pAction=0, 0)
   */
  async getItemsForReceivers(receiverIds) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_order_items_get(?, ?)', [0, 0]);
      const idSet = new Set(receiverIds.map(Number));
      return (rows[0] || []).filter(i => idSet.has(i.FkReceiverDetailsId) && i.IsActive !== 'InActive');
    }
    const idSet = new Set(receiverIds.map(Number));
    return seedOrderItems.filter((i) => idSet.has(i.fkReceiverDetailsId));
  }

  /**
   * Get all parcels for a set of receiver IDs.
   * Procedure: prc_parcel_details_get(pAction=0, 0)
   */
  async getParcelsForReceivers(receiverIds) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [0, 0]);
      const idSet = new Set(receiverIds.map(Number));
      return (rows[0] || []).filter(p => idSet.has(p.FkReceiverDetailsId));
    }
    const idSet = new Set(receiverIds.map(Number));
    return seedParcels.filter((p) => idSet.has(p.fkReceiverDetailsId));
  }

  /**
   * Full graph update within a managed transaction (LIVE mode).
   * Applies diff-based changes: update/create/remove receivers, items, parcels.
   *
   * @param {number|string} orderId
   * @param {object} header - Resolved sender snapshot.
   * @param {object} diffs - { receivers: { toUpdate, toCreate, toRemove } }.
   * @param {number|string} adminId - EmployeeCode of the actor.
   */
  async updateOrderGraph(orderId, header, diffs, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      return this._updateOrderGraphLive(orderId, header, diffs, adminId);
    }
    return this._updateOrderGraphMock(orderId, header, diffs, adminId);
  }

  /**
   * LIVE mode: Managed transaction for full graph update.
   * @private
   */
  async _updateOrderGraphLive(orderId, header, diffs, adminId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Step 1: Update order header
      await connection.execute(
        'CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          orderId,
          header.senderId ?? null,
          header.senderName ?? null,
          header.senderMobile ?? null,
          header.senderAddress ?? null,
          header.city ?? null,
          header.state ?? null,
          header.pincode ?? null,
          header.totalAmount ?? 0,
          adminId,
          1
        ]
      );

      // Step 2: Remove receivers (cancel parcel + soft-delete items + soft-delete receiver)
      for (const rec of diffs.receivers.toRemove) {
        if (rec.parcelId) {
          await connection.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)', [rec.parcelId, 5, 0, null, 0, adminId]);
        }
        for (const item of rec.existingItems || []) {
          const itemId = item.PkOrderItemId || item.id;
          await connection.execute('CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)', [itemId, rec.receiverDetailsId, item.FkProductId, 0, null, 0, adminId, 0]);
        }
        await connection.execute('CALL prc_receiver_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [rec.receiverDetailsId, orderId, null, '', '', null, '', '', '', '', 'India', adminId, 0]);
      }

      // Step 3: Update existing receivers and their items
      for (const rec of diffs.receivers.toUpdate) {
        await connection.execute(
          'CALL prc_receiver_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [rec.receiverDetailsId, orderId, rec.receiverId || null, rec.receiverName || null, rec.receiverPhone || null, rec.receiverEmail || null, rec.address || null, rec.city || null, rec.state || null, rec.pincode || null, 'India', adminId, 1]
        );
        for (const item of rec.itemDiffs.toRemove) {
          const itemId = item.PkOrderItemId || item.id;
          await connection.execute('CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)', [itemId, rec.receiverDetailsId, item.FkProductId, 0, null, 0, adminId, 0]);
        }
        for (const item of rec.itemDiffs.toUpdate) {
          await connection.execute('CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)', [item.orderItemId, rec.receiverDetailsId, item.productId, item.qty, item.unitId, item.unitPrice, adminId, 1]);
        }
        for (const item of rec.itemDiffs.toCreate) {
          await connection.execute('CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)', [0, rec.receiverDetailsId, item.productId, item.qty, item.unitId, item.unitPrice, adminId, 1]);
        }
      }

      // Step 4: Create new receivers with items and parcels
      for (const rec of diffs.receivers.toCreate) {
        const [recRows] = await connection.execute(
          'CALL prc_receiver_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [0, orderId, rec.receiverId || null, rec.receiverName || null, rec.receiverPhone || null, rec.receiverEmail || null, rec.address || null, rec.city || null, rec.state || null, rec.pincode || null, 'India', adminId, 1]
        );
        const newReceiverId = recRows[0]?.[0]?.GeneratedReceiverId || recRows[0]?.[0]?.PkReceiverDetailsId;
        
        for (const prod of rec.products) {
          await connection.execute('CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)', [0, newReceiverId, prod.productId, prod.qty, prod.unitId, prod.unitPrice, adminId, 1]);
        }
        
        // Trigger 0 = CREATE parcel
        await connection.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)', [0, 0, newReceiverId, null, 0, adminId]);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      logger.error('OrderRepository._updateOrderGraphLive', `Failed to update order graph: ${error.message}`, { orderId, adminId });
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Logic for cancelling an order by setting IsActive=0.
   * Cascades to all receivers, items, and parcels.
   */
  async cancelOrder(orderId, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      return this._cancelOrderLive(orderId, adminId);
    }
    return this._cancelOrderMock(orderId);
  }

  /**
   * Managed transaction for full cascading cancellation.
   * @private
   */
  async _cancelOrderLive(orderId, adminId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Fetch all associated data to cascade
      const receivers = await this.getReceiversForOrder(orderId);
      const receiverIds = receivers.map(r => r.PkReceiverDetailsId || r.id);
      
      const parcels = await this.getParcelsForReceivers(receiverIds);
      const items = await this.getItemsForReceivers(receiverIds);

      // 2. Cascade Parcel Cancellation (Trigger 5)
      for (const p of parcels) {
        await connection.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)', [
          p.PkParcelDetailsId || p.id,
          5, // pTriggerType: 5 (CANCELLED)
          0, // pFkReceiverDetailsId
          null, // pAWBNumber
          0, // pFkCourierId
          adminId
        ]);
      }

      // 3. Cascade Item Soft-Delete
      for (const item of items) {
        await connection.execute('CALL prc_order_items_set(?, ?, ?, ?, ?, ?, ?, ?)', [
          item.PkOrderItemId || item.id,
          item.FkReceiverDetailsId || item.fkReceiverDetailsId,
          item.FkProductId || item.fkProductId,
          0, // pOutwardQty
          null, // pFkUnitId
          0, // pUnitPrice
          adminId,
          0 // pIsActive
        ]);
      }

      // 4. Cascade Receiver Soft-Delete
      for (const r of receivers) {
        await connection.execute('CALL prc_receiver_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
          r.PkReceiverDetailsId || r.id,
          orderId,
          null, // pReceiverId
          '', // pReceiverName
          '', // pReceiverPhone
          null, // pReceiverEmail
          '', // pAddress
          '', // pCity
          '', // pState
          '', // pPincode
          'India', // pCountry
          adminId,
          0 // pIsActive
        ]);
      }

      // 5. Order Header Soft-Delete
      const [orderRows] = await connection.execute('CALL prc_order_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        orderId, null, null, null, null, null, null, null, null, adminId, 0
      ]);

      await connection.commit();
      return orderRows[0]?.[0] || { orderId, success: true };
    } catch (error) {
      await connection.rollback();
      logger.error('OrderRepository._cancelOrderLive', `Failed to cancel order: ${error.message}`, { orderId, adminId });
      throw error;
    } finally {
      connection.release();
    }
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
  _updateOrderGraphMock(orderId, header, diffs, adminId) {
    const orderIndex = seedOrders.findIndex((o) => o.id === parseInt(orderId) && o.isActive);
    if (orderIndex === -1) return;

    // Update order header
    const order = seedOrders[orderIndex];
    if (header.senderId) order.fkSenderId = header.senderId;
    if (header.senderName) order.senderName = header.senderName;
    if (header.senderMobile) order.senderMobile = header.senderMobile;
    if (header.senderAddress) order.senderAddress = header.senderAddress;
    if (header.totalAmount !== undefined) order.totalAmount = header.totalAmount;

    // Remove receivers
    for (const rec of diffs.receivers.toRemove) {
      // Cancel parcel
      const parcel = seedParcels.find((p) => p.fkReceiverDetailsId === rec.receiverDetailsId);
      if (parcel) parcel.parcelStatusCode = 'CANCELLED';
      // Soft-delete items
      seedOrderItems.forEach((i) => {
        if (i.fkReceiverDetailsId === rec.receiverDetailsId) i.isActive = false;
      });
      // Soft-delete receiver
      const recIdx = seedReceivers.findIndex((r) => r.id === rec.receiverDetailsId);
      if (recIdx !== -1) seedReceivers[recIdx].isActive = false;
    }

    // Update existing receivers
    for (const rec of diffs.receivers.toUpdate) {
      const recIdx = seedReceivers.findIndex((r) => r.id === rec.receiverDetailsId);
      if (recIdx !== -1) {
        seedReceivers[recIdx] = { ...seedReceivers[recIdx], ...rec, id: rec.receiverDetailsId };
      }
      // Remove items
      for (const item of rec.itemDiffs.toRemove) {
        const itemIdx = seedOrderItems.findIndex((i) => i.id === (item.PkOrderItemId || item.id));
        if (itemIdx !== -1) seedOrderItems[itemIdx].isActive = false;
      }
      // Update items
      for (const item of rec.itemDiffs.toUpdate) {
        const itemIdx = seedOrderItems.findIndex((i) => i.id === item.orderItemId);
        if (itemIdx !== -1) {
          seedOrderItems[itemIdx].fkProductId = item.productId;
          seedOrderItems[itemIdx].outwardQty = item.qty;
          seedOrderItems[itemIdx].unitPrice = item.unitPrice;
        }
      }
      // Create items
      for (const item of rec.itemDiffs.toCreate) {
        seedOrderItems.push({
          id: seedOrderItems.length + 1, fkReceiverDetailsId: rec.receiverDetailsId,
          fkProductId: item.productId, outwardQty: item.qty, fkUnitId: item.unitId, unitPrice: item.unitPrice
        });
      }
    }

    // Create new receivers
    for (const rec of diffs.receivers.toCreate) {
      const newRec = { id: seedReceivers.length + 1, fkOrderId: parseInt(orderId), ...rec, isActive: true };
      seedReceivers.push(newRec);
      for (const prod of rec.products) {
        seedOrderItems.push({
          id: seedOrderItems.length + 1, fkReceiverDetailsId: newRec.id,
          fkProductId: prod.productId, outwardQty: prod.qty, fkUnitId: prod.unitId, unitPrice: prod.unitPrice
        });
      }
      seedParcels.push({
        id: seedParcels.length + 1, fkReceiverDetailsId: newRec.id, fkCourierId: null,
        parcel_id: `PDS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, trackingNo: null,
        parcelStatusCode: 'PENDING', labelPrintCount: 0, dispatchDate: null, createdAt: new Date()
      });
    }
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
    const receiverIds = receivers.map(r => r.id);
    const parcels = seedParcels.filter((p) => receiverIds.includes(p.fkReceiverDetailsId));
    const items = seedOrderItems.filter((i) => receiverIds.includes(i.fkReceiverDetailsId));

    // Cascade Updates
    parcels.forEach(p => { p.parcelStatusCode = 'CANCELLED'; });
    items.forEach(i => { i.isActive = false; });
    receivers.forEach(r => { r.isActive = false; });
    order.isActive = false;

    return { orderId: order.id, cancelledCount: parcels.length };
  }

  /**
   * Mathematical status derivation from parcel lifecycle states.
   * Source of Truth: Parcel execution state.
   * @private
   */
  _deriveOrderStatus(parcels) {
    if (!parcels || parcels.length === 0) return 'Pending';
    const s = parcels.map((p) => p.parcelStatusCode);
    if (s.every((x) => x === 'CANCELLED')) return 'Cancelled';
    if (s.every((x) => x === 'DELIVERED')) return 'Completed';
    if (s.every((x) => x === 'DISPATCHED')) return 'Dispatched';
    if (s.some((x) => ['DISPATCHED', 'DELIVERED'].includes(x))) return 'Partially Dispatched';
    if (s.every((x) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(x))) return 'Label Printed';
    if (s.some((x) => ['LABEL_PRINTED', 'AWB_LINKED'].includes(x))) return 'Partially Printed';
    return 'Pending';
  }

  // MOCK sub-methods used by service
  async createReceiver(orderId, data) {
    const r = { id: seedReceivers.length + 1, fkOrderId: orderId, ...data, isActive: true };
    seedReceivers.push(r); return r;
  }
  async createOrderItem(recId, prodId, qty, price, unitId) {
    const i = { id: seedOrderItems.length + 1, fkReceiverDetailsId: recId, fkProductId: prodId, outwardQty: qty, fkUnitId: unitId || null, unitPrice: price || 0 };
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

  async resolveProduct(productId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [productId, 0, 0]);
      return rows[0]?.[0] || null;
    }
    // Mock
    return { PkProductId: productId, FkUnitId: 1 };
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
      FkUnitId: 1,
      MaterialRate: 500
    };
  }
}

export default new OrderRepository();
