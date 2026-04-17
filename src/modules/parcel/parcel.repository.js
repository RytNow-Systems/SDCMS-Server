// ============================================================================
// File: src/modules/parcel/parcel.repository.js
// Description: Data access layer for the Parcel module.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_parcel_details_get (pAction=0 list, 1 detail, 2 label-data)
//   - Reads:   prc_receiver_status_details_get (pAction=0 all events, 1 timeline)
//   - Writes:  prc_parcel_details_set (log-print, scan, dispatch, terminal states)
//              → internally triggers prc_receiver_status_details_set
// ============================================================================

import db from '../../infrastructure/database/db.js';

import {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
  seedStatusLog,
} from './parcel.seed.js';

class ParcelRepository {
  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get all parcels with pagination and optional filtering.
   * Procedure: CALL prc_parcel_details_get(0, ?, ?, ?, ?, ?)
   * Convention: pAction=0 → paginated list of all active parcels.
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder, status }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAllParcels(filters = {}) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_get (pAction=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?, ?, ?, ?, ?)', [
        0, // pAction=0 → Get all parcels (paginated)
        filters.page || 1,
        filters.limit || 20,
        filters.search || null,
        filters.sortBy || 'CreatedDate',
        filters.sortOrder || 'desc'
      ]);
      return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering
    // ------------------------------------------------------------------
    let filtered = seedParcels.filter(() => true);

    // Optional status filter
    if (filters.status) {
      filtered = filtered.filter((p) => p.parcelStatusCode === filters.status);
    }

    // Optional search (matches parcel_id or trackingNo)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.parcel_id.toLowerCase().includes(q) ||
          (p.trackingNo && p.trackingNo.toLowerCase().includes(q))
      );
    }

    return {
      data: filtered.map((parcel) => {
        const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
        const order = receiver
          ? seedOrders.find((o) => o.id === receiver.fkOrderId)
          : null;

        return {
          id: parcel.id,
          parcelId: parcel.parcel_id,
          trackingNo: parcel.trackingNo,
          status: parcel.parcelStatusCode,
          labelPrintCount: parcel.labelPrintCount,
          dispatchDate: parcel.dispatchDate,
          receiverName: receiver?.receiverName || null,
          orderCode: order?.orderCode || null,
          createdAt: parcel.createdAt
        };
      }),
      total: filtered.length
    };
  }

  /**
   * Get a single parcel by ID.
   * Procedure: CALL prc_parcel_details_get(1, ?)
   * Convention: pAction=1 → single parcel detail.
   *
   * @param {number|string} parcelId - PkParcelDetailsId.
   * @returns {Promise<object|null>} Parcel detail, or null if not found.
   */
  async findById(parcelId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_get (pAction=1)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [
        1, // pAction=1 → Get specific parcel
        parcelId
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup with enrichment
    // ------------------------------------------------------------------
    const parcel = seedParcels.find((p) => p.id === parseInt(parcelId));
    if (!parcel) return null;

    const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
    const order = receiver
      ? seedOrders.find((o) => o.id === receiver.fkOrderId)
      : null;

    return {
      id: parcel.id,
      parcelId: parcel.parcel_id,
      trackingNo: parcel.trackingNo,
      status: parcel.parcelStatusCode,
      labelPrintCount: parcel.labelPrintCount,
      dispatchDate: parcel.dispatchDate,
      fkCourierId: parcel.fkCourierId,
      receiverName: receiver?.receiverName || null,
      receiverPhone: receiver?.receiverPhone || null,
      addressLine1: receiver?.addressLine1 || null,
      addressLine2: receiver?.addressLine2 || null,
      city: receiver?.city || null,
      state: receiver?.state || null,
      pincode: receiver?.pincode || null,
      orderCode: order?.orderCode || null,
      orderId: order?.id || null,
      createdAt: parcel.createdAt
    };
  }

  /**
   * Get label data for a parcel (stitched flat JSON for frontend label rendering).
   * Procedure: CALL prc_parcel_details_get(2, ?)
   * Convention: pAction=2 → stitched sender snapshot + receiver address + parcel_id.
   * The frontend is responsible for rendering the QR code from parcel_id.
   *
   * @param {number|string} parcelId - PkParcelDetailsId.
   * @returns {Promise<object|null>} Flat label data JSON, or null if not found.
   */
  async getLabelData(parcelId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_get (pAction=2)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [
        2, // pAction=2 → Label data (stitched flat JSON)
        parcelId
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory label data stitching
    // ------------------------------------------------------------------
    const parcel = seedParcels.find((p) => p.id === parseInt(parcelId));
    if (!parcel) return null;

    const receiver = seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId);
    const order = receiver
      ? seedOrders.find((o) => o.id === receiver.fkOrderId)
      : null;

    return {
      parcelId: parcel.parcel_id,
      orderCode: order?.orderCode || null,
      // Sender snapshot (from order_master at creation time)
      senderName: order?.senderName || null,
      senderMobile: order?.senderMobile || null,
      senderAddress: order?.senderAddress || null,
      // Receiver address (from receiver_details)
      receiverName: receiver?.receiverName || null,
      receiverPhone: receiver?.receiverPhone || null,
      addressLine1: receiver?.addressLine1 || null,
      addressLine2: receiver?.addressLine2 || null,
      city: receiver?.city || null,
      state: receiver?.state || null,
      pincode: receiver?.pincode || null,
      country: receiver?.country || 'India',
      // Parcel metadata
      labelPrintCount: parcel.labelPrintCount,
      status: parcel.parcelStatusCode
    };
  }

  /**
   * Get chronological timeline of all events for a specific parcel.
   * Procedure: CALL prc_receiver_status_details_get(1, ?)
   * Convention: pAction=1 → timeline for a specific parcel (Amazon-style).
   *
   * @param {number|string} parcelId - PkParcelDetailsId.
   * @returns {Promise<Array>} Chronological event timeline.
   */
  async getTimeline(parcelId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_receiver_status_details_get (pAction=1)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_status_details_get(?, ?)', [
        1, // pAction=1 → Timeline for specific parcel
        parcelId
      ]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory timeline filtering
    // ------------------------------------------------------------------
    return seedStatusLog
      .filter((log) => log.fkParcelDetailsId === parseInt(parcelId))
      .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
      .map((log) => ({
        id: log.id,
        actionType: log.actionType,
        awbNumber: log.awbNumber,
        previousStatus: log.previousStatus,
        newStatus: log.newStatus,
        createdBy: log.createdBy,
        createdDate: log.createdDate
      }));
  }

  // ============================================================================
  // WRITE OPERATIONS (STATE TRANSITIONS)
  // All writes through prc_parcel_details_set internally trigger
  // prc_receiver_status_details_set to maintain the append-only audit trail.
  // ============================================================================

  /**
   * Log a label print event and transition parcel to LABEL_PRINTED.
   * Procedure: CALL prc_parcel_details_set(parcelId, 'LOG_PRINT', ?)
   * Internally: increments LabelPrintCount, transitions to LABEL_PRINTED,
   * appends event to receiver_status_details via prc_receiver_status_details_set.
   *
   * @param {number|string} parcelId - PkParcelDetailsId.
   * @param {string} employeeCode - CreatedBy for the event log.
   * @returns {Promise<object>} Updated parcel record.
   */
  async logPrint(parcelId, employeeCode) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_set (LOG_PRINT action)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?)', [
        parcelId,
        'LOG_PRINT',
        employeeCode
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory label print with audit log
    // ------------------------------------------------------------------
    const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
    if (index === -1) return null;

    const previousStatus = seedParcels[index].parcelStatusCode;
    seedParcels[index].labelPrintCount += 1;
    seedParcels[index].parcelStatusCode = 'LABEL_PRINTED';

    // ✔ Append event to receiver_status_details (append-only audit trail)
    this._appendStatusLog(parseInt(parcelId), seedParcels[index].fkReceiverDetailsId, {
      actionType: 'STATUS_UPDATE',
      awbNumber: null,
      previousStatus,
      newStatus: 'LABEL_PRINTED',
      createdBy: employeeCode
    });

    return {
      id: seedParcels[index].id,
      parcelId: seedParcels[index].parcel_id,
      status: seedParcels[index].parcelStatusCode,
      labelPrintCount: seedParcels[index].labelPrintCount
    };
  }

  /**
   * Atomic two-scan operation: QR scan + AWB link.
   * Procedure: CALL prc_parcel_details_set(parcelId, 'SCAN_LINK_AWB', ?, ?, ?)
   * Internally: validates parcel_id, links AWB, transitions status,
   * appends event(s) to receiver_status_details.
   *
   * Role-based auto-dispatch:
   *   - COURIER → status jumps to DISPATCHED (stamps DispatchDate)
   *   - OPERATOR/ADMIN → status goes to AWB_LINKED only
   *
   * @param {string} qrCode - The parcel_id from QR scan.
   * @param {string} awbNumber - The AWB barcode number.
   * @param {string} role - User role (ADMIN, OPERATOR, COURIER).
   * @param {string} employeeCode - CreatedBy for the event log.
   * @returns {Promise<object|null>} Updated parcel, or null if not found.
   */
  async scanAndLinkAWB(qrCode, awbNumber, role, employeeCode) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_set (SCAN_LINK_AWB action)
    // The SP handles QR lookup, AWB uniqueness check, role-based status
    // transition, and audit logging internally.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?, ?, ?)', [
        qrCode,       // parcel_id (QR code value)
        'SCAN_LINK_AWB',
        awbNumber,
        role,
        employeeCode
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory scan + AWB link with role-based dispatch
    // ------------------------------------------------------------------
    // Find parcel by parcel_id (QR code value)
    const index = seedParcels.findIndex((p) => p.parcel_id === qrCode);
    if (index === -1) return null;

    const parcel = seedParcels[index];
    const previousStatus = parcel.parcelStatusCode;

    // Link AWB number
    seedParcels[index].trackingNo = awbNumber;

    // Role-based status transition (Systemflow Part 6)
    if (role === 'COURIER') {
      seedParcels[index].parcelStatusCode = 'DISPATCHED';
      seedParcels[index].dispatchDate = new Date();
    } else {
      seedParcels[index].parcelStatusCode = 'AWB_LINKED';
    }

    // ✔ Append AWB_LINK event to receiver_status_details
    this._appendStatusLog(parcel.id, parcel.fkReceiverDetailsId, {
      actionType: 'AWB_LINK',
      awbNumber,
      previousStatus,
      newStatus: seedParcels[index].parcelStatusCode,
      createdBy: employeeCode
    });

    return {
      id: seedParcels[index].id,
      parcelId: seedParcels[index].parcel_id,
      trackingNo: seedParcels[index].trackingNo,
      status: seedParcels[index].parcelStatusCode,
      dispatchDate: seedParcels[index].dispatchDate
    };
  }

  /**
   * Dispatch parcels in bulk (array of parcelIds).
   * Procedure: CALL prc_parcel_details_set(parcelId, 'DISPATCH', ?)
   * Internally: stamps DispatchDate, transitions to DISPATCHED,
   * appends event for each parcel to receiver_status_details.
   *
   * @param {number[]} parcelIds - Array of PkParcelDetailsId values.
   * @param {string} employeeCode - CreatedBy for the event log.
   * @returns {Promise<object>} { dispatched: number, parcels: [...] }
   */
  async dispatchParcels(parcelIds, employeeCode) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_set (DISPATCH action, per parcel)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const dispatched = [];
      for (const pid of parcelIds) {
        const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?)', [
          pid,
          'DISPATCH',
          employeeCode
        ]);
        if (rows[0]?.[0]) dispatched.push(rows[0][0]);
      }
      return { dispatched: dispatched.length, parcels: dispatched };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory bulk dispatch with audit logs
    // ------------------------------------------------------------------
    const dispatched = [];

    for (const pid of parcelIds) {
      const index = seedParcels.findIndex((p) => p.id === pid);
      if (index === -1) continue;

      const previousStatus = seedParcels[index].parcelStatusCode;
      seedParcels[index].parcelStatusCode = 'DISPATCHED';
      seedParcels[index].dispatchDate = new Date();

      // ✔ Append event to receiver_status_details
      this._appendStatusLog(pid, seedParcels[index].fkReceiverDetailsId, {
        actionType: 'STATUS_UPDATE',
        awbNumber: seedParcels[index].trackingNo,
        previousStatus,
        newStatus: 'DISPATCHED',
        createdBy: employeeCode
      });

      dispatched.push({
        id: seedParcels[index].id,
        parcelId: seedParcels[index].parcel_id,
        status: 'DISPATCHED',
        dispatchDate: seedParcels[index].dispatchDate
      });
    }

    return { dispatched: dispatched.length, parcels: dispatched };
  }

  /**
   * Update parcel to a terminal status (DELIVERED, CANCELLED, RETURNED).
   * Procedure: CALL prc_parcel_details_set(parcelId, statusAction, ?)
   * Internally: transitions status and appends event to receiver_status_details.
   *
   * @param {number|string} parcelId - PkParcelDetailsId.
   * @param {string} newStatus - Target terminal status.
   * @param {string} employeeCode - CreatedBy for the event log.
   * @returns {Promise<object|null>} Updated parcel, or null if not found.
   */
  async updateTerminalStatus(parcelId, newStatus, employeeCode) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_details_set (terminal status action)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_details_set(?, ?, ?)', [
        parcelId,
        newStatus, // 'DELIVERED' | 'CANCELLED' | 'RETURNED'
        employeeCode
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory terminal status update with audit log
    // ------------------------------------------------------------------
    const index = seedParcels.findIndex((p) => p.id === parseInt(parcelId));
    if (index === -1) return null;

    const previousStatus = seedParcels[index].parcelStatusCode;
    seedParcels[index].parcelStatusCode = newStatus;

    // ✔ Append event to receiver_status_details
    this._appendStatusLog(parseInt(parcelId), seedParcels[index].fkReceiverDetailsId, {
      actionType: 'STATUS_UPDATE',
      awbNumber: seedParcels[index].trackingNo,
      previousStatus,
      newStatus,
      createdBy: employeeCode
    });

    return {
      id: seedParcels[index].id,
      parcelId: seedParcels[index].parcel_id,
      status: seedParcels[index].parcelStatusCode,
      previousStatus
    };
  }

  // ============================================================================
  // EVENT LOG OPERATIONS (receiver_status_details)
  // ============================================================================

  /**
   * Browse system-wide events from receiver_status_details (paginated, filtered).
   * Procedure: CALL prc_receiver_status_details_get(0, ?, ?, ?, ?, ?, ?)
   * Convention: pAction=0 → all events with optional filters.
   *
   * @param {object} filters - { page, limit, dateFrom, dateTo, actionType, scannedBy }
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async browseEvents(filters = {}) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_receiver_status_details_get (pAction=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_receiver_status_details_get(?, ?, ?, ?, ?, ?, ?)', [
        0, // pAction=0 → Browse all events
        filters.page || 1,
        filters.limit || 50,
        filters.dateFrom || null,
        filters.dateTo || null,
        filters.actionType || null,
        filters.scannedBy || null
      ]);
      return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory event filtering with enrichment
    // ------------------------------------------------------------------
    let filtered = [...seedStatusLog];

    if (filters.actionType) {
      filtered = filtered.filter((e) => e.actionType === filters.actionType);
    }
    if (filters.scannedBy) {
      filtered = filtered.filter((e) => e.createdBy === filters.scannedBy);
    }
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      filtered = filtered.filter((e) => new Date(e.createdDate) >= from);
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      filtered = filtered.filter((e) => new Date(e.createdDate) <= to);
    }

    // Enrich with parcel_id and orderCode for display
    const enriched = filtered.map((log) => {
      const parcel = seedParcels.find((p) => p.id === log.fkParcelDetailsId);
      const receiver = parcel
        ? seedReceivers.find((r) => r.id === parcel.fkReceiverDetailsId)
        : null;
      const order = receiver
        ? seedOrders.find((o) => o.id === receiver.fkOrderId)
        : null;

      return {
        id: log.id,
        parcelId: parcel?.parcel_id || null,
        orderCode: order?.orderCode || null,
        actionType: log.actionType,
        awbNumber: log.awbNumber,
        previousStatus: log.previousStatus,
        newStatus: log.newStatus,
        scannedBy: log.createdBy,
        timestamp: log.createdDate
      };
    });

    return { data: enriched, total: enriched.length };
  }

  /**
   * Check if an AWB number already exists for duplicate detection.
   * MOCK MODE ONLY — in live mode, the SP handles this check internally.
   *
   * @param {string} awbNumber - The AWB number to check.
   * @returns {boolean} True if AWB already linked to a parcel.
   */
  checkDuplicateAWB(awbNumber) {
    return seedParcels.some(
      (p) => p.trackingNo && p.trackingNo === awbNumber
    );
  }

  /**
   * Find a parcel by its parcel_id (QR code value).
   * MOCK MODE ONLY — in live mode, the SP resolves QR internally.
   *
   * @param {string} qrCode - The parcel_id string.
   * @returns {object|null} Raw parcel seed data, or null.
   */
  findByQRCode(qrCode) {
    return seedParcels.find((p) => p.parcel_id === qrCode) || null;
  }

  // ============================================================================
  // INTERNAL HELPERS (MOCK MODE ONLY)
  // ============================================================================

  /**
   * Appends an event to the mock receiver_status_details log.
   * In production, this is handled internally by prc_parcel_details_set
   * calling prc_receiver_status_details_set.
   *
   * @param {number} fkParcelDetailsId
   * @param {number} fkReceiverDetailsId
   * @param {object} eventData - { actionType, awbNumber, previousStatus, newStatus, createdBy }
   * @private
   */
  _appendStatusLog(fkParcelDetailsId, fkReceiverDetailsId, eventData) {
    seedStatusLog.push({
      id: seedStatusLog.length + 1,
      fkParcelDetailsId,
      fkReceiverDetailsId,
      actionType: eventData.actionType,
      awbNumber: eventData.awbNumber || null,
      previousStatus: eventData.previousStatus || null,
      newStatus: eventData.newStatus,
      createdBy: eventData.createdBy,
      createdDate: new Date()
    });
  }
}

export default new ParcelRepository();
