// ============================================================================
// File: src/modules/parcel/parcel.repository.js
// Description: Data access layer for the Parcel module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v2.md):
//   - prc_parcel_details_get(pAction, pPkParcelDetailsId):
//       pAction=0 → List all parcels
//       pAction=1 → Get single parcel by ID
//       pAction=2 → Get label data (parcel + receiver join)
//   - prc_parcel_details_search_by_qr: Lookup by QR
//   - prc_parcel_details_search_by_awb: Lookup by AWB
//   - prc_parcel_details_set: Upsert/Update state
//   - prc_receiver_status_details_search: Timeline/Browse events
//   - prc_receiver_status_details_set: Append-only log
// ============================================================================

import db from "../../infrastructure/database/db.js";

import {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
  seedStatusLog,
} from "./parcel.seed.js";

/**
 * ParcelRepository
 *
 * INJECTION SITE:
 * This repository is the sole data access point for the Parcel module.
 * It interacts with the database via 'db' (MySQL2) using stored procedures
 * as defined in 'api_procedure_spec_v2.md'.
 *
 * In MOCK mode, it uses local seeds from './parcel.seed.js'.
 */
class ParcelRepository {
  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get all parcels with pagination and optional filtering.
   * Procedure: CALL prc_parcel_details_get(pAction, pPkParcelDetailsId)
   * pAction=0 returns all parcels ordered by PkParcelDetailsId DESC.
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder, status }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAll(filters = {}) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_parcel_details_search(?, ?, ?, ?)",
        [
          0, // pPkParcelDetailsId=0: match all
          0, // pFkReceiverDetailsId=0: match all
          0, // pFkCourierId=0: match all
          0, // pFkParcelStatusId=0: match all
        ],
      );

      let data = rows[0] || [];

      // Client-side status filter — case-insensitive because API uses uppercase ("PENDING")
      // while lu_details returns proper case ("Pending").
      if (filters.status) {
        const statusLower = filters.status.toLowerCase();
        data = data.filter(
          (p) => p.ParcelStatusName?.toLowerCase() === statusLower,
        );
      }

      // Client-side search — checks parcelId, ParcelCode (UC code), and TrackingNo
      if (filters.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(
          (p) =>
            (p.PkParcelDetailsId &&
              p.PkParcelDetailsId.toString().includes(q)) ||
            (p.ParcelCode && p.ParcelCode.toLowerCase().includes(q)) ||
            (p.TrackingNo && p.TrackingNo.toLowerCase().includes(q)),
        );
      }

      // Client-side sort — SP always returns DESC by PkParcelDetailsId
      const sortFieldMap = {
        created_at: "CreatedDate",
        createdAt: "CreatedDate",
        status: "ParcelStatusName",
        trackingNo: "TrackingNo",
        parcelId: "PkParcelDetailsId",
        parcelCode: "ParcelCode",
      };
      const sortCol = sortFieldMap[filters.sortBy] || "PkParcelDetailsId";
      const sortDir = filters.sortOrder?.toLowerCase() === "asc" ? 1 : -1;
      data.sort((a, b) => {
        const av = a[sortCol] ?? "";
        const bv = b[sortCol] ?? "";
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      });

      const total = data.length;
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const start = (page - 1) * limit;
      const paginatedData = data.slice(start, start + limit);

      return { data: paginatedData, total };
    }

    // MOCK MODE
    const results = this._filterMockParcels(filters);
    const total = results.length;

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    const data = results
      .slice(start, start + limit)
      .map((p) => this._mapMockParcel(p));

    return { data, total };
  }

  /**
   * Get a single parcel by ID.
   * Procedure: CALL prc_parcel_details_get(pAction, pPkParcelDetailsId)
   * pAction=1 returns a single parcel matching the given ID.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @returns {Promise<object|null>} Parcel detail, or null if not found.
   */
  async findById(id) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_parcel_details_search(?, ?, ?, ?)",
        [
          id, // pPkParcelDetailsId: filter by specific parcel
          0,  // pFkReceiverDetailsId=0: match all
          0,  // pFkCourierId=0: match all
          0,  // pFkParcelStatusId=0: match all
        ],
      );
      return rows[0]?.[0] || null;
    }

    const parcel = seedParcels.find((p) => p.id === parseInt(id));
    return parcel ? this._mapMockParcel(parcel) : null;
  }

  /**
   * Find a parcel by its AWB number.
   * Procedure: CALL prc_parcel_details_search_by_awb(?)
   *
   * @param {string} awb
   * @returns {Promise<object|null>}
   */
  async findByAWB(awb) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_parcel_details_search_by_awb(?)",
        [awb],
      );
      return rows[0]?.[0] || null;
    }
    return seedParcels.find((p) => p.trackingNo === awb) || null;
  }

  /**
   * Get label data for a parcel (full enriched join including Party_master fallback).
   * Procedure: CALL prc_parcel_details_search(pPkParcelDetailsId, 0, 0, 0)
   * Returns all fields needed for label rendering: status, receiver info, address, orderCode.
   *
   * @param {number|string} id - PkParcelDetailsId
   * @returns {Promise<object|null>}
   */
  async getLabelData(id) {
    if (process.env.USE_MOCK_DB !== "true") {
      // prc_parcel_details_get(pAction=2) only returns bare receiver_details columns —
      // no ParcelStatusName, State, OrderCode, and no Party_master fallback for Mode A orders.
      // prc_parcel_details_search returns all enriched fields via full JOINs.
      const [rows] = await db.execute(
        "CALL prc_parcel_details_search(?, ?, ?, ?)",
        [id, 0, 0, 0],
      );
      return rows[0]?.[0] || null;
    }

    // MOCK MODE — stitch from seeds
    const parcel = seedParcels.find((p) => p.id === parseInt(id));
    if (!parcel) return null;
    return this._mapMockParcel(parcel);
  }

  /**
   * Get order header to resolve FkSenderId for label data.
   * Procedure: CALL prc_order_master_get(1, orderId)
   *
   * @param {number} orderId
   * @returns {Promise<object|null>}
   */
  async getOrderHeader(orderId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute("CALL prc_order_master_get(?, ?)", [
        1,
        orderId,
      ]);
      return rows[0]?.[0] || null;
    }
    return seedOrders.find((o) => o.id === parseInt(orderId)) || null;
  }

  /**
   * Get sender party details by PkPartyId.
   * Procedure: CALL prc_Party_master_get(1, NULL, senderId)
   * pFkPartyTypeId=NULL skips type filter, matches any party type.
   *
   * @param {number} senderId - PkPartyId
   * @returns {Promise<object|null>}
   */
  async getSenderById(senderId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_Party_master_get(?, ?, ?)",
        [1, null, senderId],
      );
      return rows[0]?.[0] || null;
    }
    return seedParties.find((p) => p.id === parseInt(senderId)) || null;
  }

  /**
   * Get all order items for a specific receiver (for label product list).
   * Procedure: CALL prc_order_items_get(0, 0) — returns all items; filter by FkReceiverDetailsId.
   * prc_order_items_get includes ColorName; prc_order_items_search does not.
   *
   * @param {number} receiverDetailsId
   * @returns {Promise<Array>}
   */
  async getItemsForReceiver(receiverDetailsId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute("CALL prc_order_items_get(?, ?)", [0, 0]);
      const all = rows[0] || [];
      return all.filter(
        (item) => item.FkReceiverDetailsId === parseInt(receiverDetailsId),
      );
    }
    return [];
  }

  /**
   * Get chronological timeline of events.
   * Procedure: CALL prc_receiver_status_details_get(1, parcelId)
   *
   * @param {number} parcelId
   * @returns {Promise<Array>}
   */
  async getTimeline(parcelId) {
    if (process.env.USE_MOCK_DB !== "true") {
      // pAction=1 only returns 5 bare columns (no PreviousStatus, CreatedBy).
      // pAction=0 returns all columns; filter by FkParcelDetailsId client-side.
      const [rows] = await db.execute(
        "CALL prc_receiver_status_details_get(?, ?)",
        [0, 0],
      );
      const all = rows[0] || [];
      return all
        .filter((e) => e.FkParcelDetailsId === parseInt(parcelId))
        .sort((a, b) => new Date(a.CreatedDate) - new Date(b.CreatedDate));
    }

    return seedStatusLog
      .filter((log) => log.fkParcelDetailsId === parseInt(parcelId))
      .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
  }

  // ============================================================================
  // WRITE OPERATIONS
  // ============================================================================

  /**
   * Update parcel state.
   * Procedure: CALL prc_parcel_details_set(parcelId, triggerType, null, awbNumber, courierId, adminId)
   *
   * @param {number} parcelId
   * @param {number} triggerType - 1=PRINT, 2=SCAN, 3=DISPATCH, 4=DELIVERED, 5=CANCELLED
   * @param {string|null} awbNumber
   * @param {number|null} courierId
   * @param {string} adminId - EmployeeCode
   * @returns {Promise<object>}
   */
  async updateParcelState(
    parcelId,
    triggerType,
    awbNumber,
    courierId,
    adminId,
  ) {
    if (process.env.USE_MOCK_DB !== "true") {
      await db.execute(
        "CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)",
        [
          parcelId,
          triggerType,
          null, // pFkReceiverDetailsId
          awbNumber || null,
          courierId || 0,
          adminId,
        ],
      );
      // SP update triggers (1-5) have no SELECT — re-fetch the updated record
      return this.findById(parcelId);
    }

    // MOCK MODE
    const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
    if (index === -1) return null;

    const parcel = seedParcels[index];
    const previousStatus = parcel.parcelStatusCode;

    let actionType = "STATUS_UPDATE";

    switch (triggerType) {
      case 1: // PRINT_LABEL
        parcel.labelPrintCount += 1;
        parcel.parcelStatusCode = "LABEL_PRINTED";
        break;
      case 2: // SCAN_LINK_AWB
        parcel.trackingNo = awbNumber;
        parcel.parcelStatusCode = "AWB_LINKED";
        actionType = "AWB_LINK";
        break;
      case 3: // DISPATCH
        parcel.parcelStatusCode = "DISPATCHED";
        parcel.dispatchDate = new Date();
        break;
      case 4: // DELIVERED
        parcel.parcelStatusCode = "DELIVERED";
        break;
      case 5: // CANCELLED
        parcel.parcelStatusCode = "CANCELLED";
        break;
    }

    // Mock mode auto-logging
    seedStatusLog.push({
      id: seedStatusLog.length + 1,
      fkParcelDetailsId: parseInt(parcelId),
      fkReceiverDetailsId: parseInt(parcel.fkReceiverDetailsId),
      actionType,
      awbNumber: awbNumber || null,
      createdBy: adminId,
      createdDate: new Date(),
    });

    return { ...parcel, previousStatus };
  }

  /**
   * Log event to receiver_status_details.
   * Procedure: CALL prc_receiver_status_details_set(parcelId, receiverId, actionType, awbNumber, adminId)
   *
   * @param {number} parcelId
   * @param {number} receiverDetailsId
   * @param {string} actionType - QR_SCAN, AWB_LINK, STATUS_UPDATE, RELINK_AWB
   * @param {string|null} awbNumber
   * @param {string} adminId - EmployeeCode
   */
  async logEvent(parcelId, receiverDetailsId, actionType, awbNumber, adminId) {
    if (process.env.USE_MOCK_DB !== "true") {
      await db.execute("CALL prc_receiver_status_details_set(?, ?, ?, ?, ?)", [
        parcelId,
        receiverDetailsId,
        actionType,
        awbNumber || null,
        adminId,
      ]);
      return;
    }

    // MOCK MODE
    seedStatusLog.push({
      id: seedStatusLog.length + 1,
      fkParcelDetailsId: parseInt(parcelId),
      fkReceiverDetailsId: parseInt(receiverDetailsId),
      actionType,
      awbNumber: awbNumber || null,
      createdBy: adminId,
      createdDate: new Date(),
    });
  }

  /**
   * Browse system-wide events.
   * Procedure: CALL prc_receiver_status_details_search(0, 0, 0)
   * (Optionally filtering if SP supports more params)
   */
  async browseEvents(filters = {}) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_receiver_status_details_get(?, ?)",
        [0, 0],
      );

      let data = rows[0] || [];
      // Manual filtering for now if SP is limited
      if (filters.actionType)
        data = data.filter((e) => e.ActionType === filters.actionType);

      const total = data.length;
      const page = filters.page || 1;
      const limit = filters.limit || 50;
      const start = (page - 1) * limit;
      const paginatedData = data.slice(start, start + limit);

      return { data: paginatedData, total };
    }

    // MOCK MODE
    let filtered = [...seedStatusLog];
    if (filters.actionType) {
      filtered = filtered.filter((e) => e.actionType === filters.actionType);
    }
    const total = filtered.length;
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { data, total };
  }

  // ============================================================================
  // INTERNAL MOCK HELPERS
  // ============================================================================

  /**
   * Internal mapper to enrich mock parcel data with receiver/order info.
   * @private
   */
  _mapMockParcel(parcel) {
    const receiver = seedReceivers.find(
      (r) => r.id === parcel.fkReceiverDetailsId,
    );
    const order = receiver
      ? seedOrders.find((o) => o.id === receiver.fkOrderId)
      : null;

    return {
      ...parcel,
      parcelDetailsId: parcel.id,
      status: parcel.parcelStatusCode,
      receiverName: receiver?.receiverName || null,
      receiverPhone: receiver?.receiverPhone || null,
      address: receiver?.address || null,
      city: receiver?.city || null,
      state: receiver?.state || null,
      pincode: receiver?.pincode || null,
      orderCode: order?.orderCode || null,
      orderId: order?.id || null,
    };
  }

  /**
   * Internal helper to filter mock parcels.
   * @private
   */
  _filterMockParcels(filters) {
    let filtered = [...seedParcels];
    if (filters.status) {
      filtered = filtered.filter((p) => p.parcelStatusCode === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.id.toString().includes(q) ||
          (p.trackingNo && p.trackingNo.toLowerCase().includes(q)),
      );
    }
    return filtered;
  }
}

export default new ParcelRepository();
