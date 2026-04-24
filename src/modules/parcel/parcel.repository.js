// ============================================================================
// File: src/modules/parcel/parcel.repository.js
// Description: Data access layer for the Parcel module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v2.md):
//   - prc_parcel_details_search: List and detail
//   - prc_parcel_details_search_by_qr: Lookup by QR
//   - prc_parcel_details_search_by_awb: Lookup by AWB
//   - prc_parcel_details_set: Upsert/Update state
//   - prc_receiver_status_details_search: Timeline/Browse events
//   - prc_receiver_status_details_set: Append-only log
// ============================================================================

import db from '../../infrastructure/database/db.js';

import {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
  seedStatusLog,
} from './parcel.seed.js';

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
   * Procedure: CALL prc_parcel_details_search(id, receiverId, courierId, statusId)
   * Passing 0 for unused filters.
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder, status }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAll(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // Note: prc_parcel_details_search in v2 spec takes (id, receiverId, courierId, statusId)
      // For listing with search/pagination, we might need a more specialized SP or handle in service.
      // The user request says: "Maps to CALL prc_parcel_details_search(id, ...) passing 0 for unused filters."
      const [rows] = await db.execute('CALL prc_parcel_details_search(?, ?, ?, ?)', [
        0, // pPkParcelDetailsId
        0, // pFkReceiverDetailsId
        0, // pFkCourierId
        filters.statusId || 0  // pFkParcelStatusId
      ]);
      
      // Handle pagination and search in JS if SP doesn't support it yet, 
      // but usually we prefer SP-side. For now, following user's mapping.
      let data = rows[0] || [];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(p => 
          (p.QRCode && p.QRCode.toLowerCase().includes(q)) || 
          (p.TrackingNo && p.TrackingNo.toLowerCase().includes(q))
        );
      }

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
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit).map(p => this._mapMockParcel(p));

    return { data, total };
  }

  /**
   * Get a single parcel by ID.
   * Procedure: CALL prc_parcel_details_search(id, 0, 0, 0)
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @returns {Promise<object|null>} Parcel detail, or null if not found.
   */
  async findById(id) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_search(?, ?, ?, ?)', [
        id, 0, 0, 0
      ]);
      return rows[0]?.[0] || null;
    }

    const parcel = seedParcels.find((p) => p.id === parseInt(id));
    return parcel ? this._mapMockParcel(parcel) : null;
  }

  /**
   * Find a parcel by its QR code (parcel_id).
   * Procedure: CALL prc_parcel_details_search_by_qr(?)
   *
   * @param {string} qrCode
   * @returns {Promise<object|null>}
   */
  async findByQR(qrCode) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_search_by_qr(?)', [qrCode]);
      return rows[0]?.[0] || null;
    }
    return seedParcels.find((p) => p.parcel_id === qrCode) || null;
  }

  /**
   * Find a parcel by its AWB number.
   * Procedure: CALL prc_parcel_details_search_by_awb(?)
   *
   * @param {string} awb
   * @returns {Promise<object|null>}
   */
  async findByAWB(awb) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_search_by_awb(?)', [awb]);
      return rows[0]?.[0] || null;
    }
    return seedParcels.find((p) => p.trackingNo === awb) || null;
  }

  /**
   * Get label data for a parcel.
   * Since there is no specific SP for label data in the user request, 
   * we use findById and map it in the service layer.
   *
   * @param {number|string} id
   * @returns {Promise<object|null>}
   */
  async getLabelData(id) {
    // In v2, findById should return enough info for label
    const parcel = await this.findById(id);
    if (!parcel) return null;

    // In LIVE mode, the search SP should join enough tables.
    // If not, we might need a separate SP, but following the "integrate inside existing" rule.
    return parcel;
  }

  /**
   * Get chronological timeline of events.
   * Procedure: CALL prc_receiver_status_details_search(0, receiverDetailsId, 0)
   *
   * @param {number} receiverDetailsId
   * @returns {Promise<Array>}
   */
  async getTimeline(receiverDetailsId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_status_details_search(?, ?, ?)', [
        0, receiverDetailsId, 0
      ]);
      return rows[0] || [];
    }

    return seedStatusLog
      .filter((log) => log.fkReceiverDetailsId === parseInt(receiverDetailsId))
      .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
  }

  // ============================================================================
  // WRITE OPERATIONS
  // ============================================================================

  /**
   * Update parcel state.
   * Procedure: CALL prc_parcel_details_set(triggerType, parcelId, 0, awbNumber, courierId, adminId)
   *
   * @param {number} parcelId
   * @param {number} triggerType - 1=PRINT, 2=SCAN, 3=DISPATCH, 4=DELIVERED, 5=RETURNED
   * @param {string|null} awbNumber
   * @param {number|null} courierId
   * @param {string} adminId - EmployeeCode
   * @returns {Promise<object>}
   */
  async updateParcelState(parcelId, triggerType, awbNumber, courierId, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?, ?)', [
        triggerType,
        parcelId,
        0, // pFkReceiverDetailsId (usually 0 if updating existing)
        awbNumber || null,
        courierId || 0,
        adminId
      ]);
      return rows[0]?.[0] || null;
    }

    // MOCK MODE
    const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
    if (index === -1) return null;

    const parcel = seedParcels[index];
    const previousStatus = parcel.parcelStatusCode;

    switch (triggerType) {
      case 1: // PRINT_LABEL
        parcel.labelPrintCount += 1;
        parcel.parcelStatusCode = 'LABEL_PRINTED';
        break;
      case 2: // SCAN_LINK_AWB
        parcel.trackingNo = awbNumber;
        parcel.parcelStatusCode = 'AWB_LINKED';
        break;
      case 3: // DISPATCH
        parcel.parcelStatusCode = 'DISPATCHED';
        parcel.dispatchDate = new Date();
        break;
      case 4: // DELIVERED
        parcel.parcelStatusCode = 'DELIVERED';
        break;
      case 5: // RETURNED
        parcel.parcelStatusCode = 'RETURNED';
        break;
    }

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
    if (process.env.USE_MOCK_DB !== 'true') {
      await db.execute('CALL prc_receiver_status_details_set(?, ?, ?, ?, ?)', [
        parcelId,
        receiverDetailsId,
        actionType,
        awbNumber || null,
        adminId
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
      createdDate: new Date()
    });
  }

  /**
   * Browse system-wide events.
   * Procedure: CALL prc_receiver_status_details_search(0, 0, 0)
   * (Optionally filtering if SP supports more params)
   */
  async browseEvents(filters = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_status_details_search(?, ?, ?)', [
        0, 0, 0
      ]);
      
      let data = rows[0] || [];
      // Manual filtering for now if SP is limited
      if (filters.actionType) data = data.filter(e => e.ActionType === filters.actionType);
      
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
    const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
    const order = receiver ? seedOrders.find((o) => o.id === receiver.fkOrderId) : null;

    return {
      ...parcel,
      parcelId: parcel.parcel_id,
      status: parcel.parcelStatusCode,
      receiverName: receiver?.receiverName || null,
      receiverPhone: receiver?.receiverPhone || null,
      address: receiver?.address || null,
      city: receiver?.city || null,
      state: receiver?.state || null,
      pincode: receiver?.pincode || null,
      orderCode: order?.orderCode || null,
      orderId: order?.id || null
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
          p.parcel_id.toLowerCase().includes(q) ||
          (p.trackingNo && p.trackingNo.toLowerCase().includes(q))
      );
    }
    return filtered;
  }
}

export default new ParcelRepository();
