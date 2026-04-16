// ============================================================================
// File: src/modules/parcel/parcel.service.js
// Description: Business logic layer for the Parcel module.
// Enforces the strict parcel status flow:
//   Created → Label Printed → AWB Linked → Dispatched → Delivered
// and terminal states (Cancelled, Returned).
// All state transitions are validated before delegating to the repository.
// Procedure mapping:
//   - Reads:  prc_parcel_details_get, prc_receiver_status_details_get
//   - Writes: prc_parcel_details_set (internally triggers audit logging)
// ============================================================================

import parcelRepository from './parcel.repository.js';

// ============================================================================
// PARCEL STATUS PRECEDENCE MAP
// Defines valid transitions: key = current status, value = allowed next statuses.
// This is the single source of truth for state machine enforcement in the
// service layer (Systemflow §Part 6, API Contract Appendix A).
// ============================================================================
const VALID_TRANSITIONS = {
  'PENDING':        ['LABEL_PRINTED', 'CANCELLED'],
  'LABEL_PRINTED':  ['AWB_LINKED', 'DISPATCHED', 'CANCELLED'],
  'AWB_LINKED':     ['DISPATCHED', 'CANCELLED'],
  'DISPATCHED':     ['DELIVERED', 'RETURNED'],
  'DELIVERED':      ['RETURNED'],
  'CANCELLED':      [],
  'RETURNED':       []
};

class ParcelService {
  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Get paginated parcel list with optional filters.
   * Maps to prc_parcel_details_get (pAction=0).
   *
   * @param {object} filters - { page, limit, search, status, sortBy, sortOrder }
   * @returns {object} { data: [...], total: number }
   */
  async getParcelList(filters) {
    return await parcelRepository.findAllParcels(filters);
  }

  /**
   * Get single parcel details by ID.
   * Maps to prc_parcel_details_get (pAction=1).
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @returns {object} Parcel detail.
   * @throws {Error} 404 if parcel not found.
   */
  async getParcelDetails(id) {
    const data = await parcelRepository.findById(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return data;
  }

  /**
   * Get stitched label data for frontend rendering.
   * Maps to prc_parcel_details_get (pAction=2).
   * Returns flat JSON: sender snapshot + receiver address + parcel_id.
   * Backend does NOT generate QR images — frontend responsibility.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @returns {object} Flat label data JSON.
   * @throws {Error} 404 if parcel not found.
   */
  async getLabelData(id) {
    const data = await parcelRepository.getLabelData(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return data;
  }

  /**
   * Get Amazon-style event timeline for a parcel.
   * Maps to prc_receiver_status_details_get (pAction=1).
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @returns {Array} Chronological event timeline.
   */
  async getTimeline(id) {
    // Verify parcel exists first
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return await parcelRepository.getTimeline(id);
  }

  // ============================================================================
  // WRITE OPERATIONS (STATE TRANSITIONS)
  // ============================================================================

  /**
   * Log a label print event and transition to LABEL_PRINTED.
   * Maps to prc_parcel_details_set.
   * Business rule: Parcel must be in PENDING or LABEL_PRINTED state.
   * Re-printing (LABEL_PRINTED → LABEL_PRINTED) is allowed to increment count.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Updated parcel.
   * @throws {Error} 404/400 on invalid parcel or state.
   */
  async logLabelPrint(id, user) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }

    // Allow printing from PENDING or re-printing from LABEL_PRINTED
    const allowedStates = ['PENDING', 'LABEL_PRINTED'];
    if (!allowedStates.includes(parcel.status)) {
      const error = new Error(
        `Cannot print label: parcel is in '${parcel.status}' state. ` +
        `Label printing is only allowed when parcel is PENDING or LABEL_PRINTED.`
      );
      error.statusCode = 400;
      throw error;
    }

    const employeeCode = user?.employeeCode || 'SYSTEM';
    return await parcelRepository.logPrint(id, employeeCode);
  }

  /**
   * Atomic two-scan operation: QR scan + AWB link.
   * Maps to prc_parcel_details_set.
   *
   * Business rules:
   *   1. Parcel must be in LABEL_PRINTED state (no AWB before label print).
   *   2. AWB number must be unique (409 on duplicate).
   *   3. Role-based auto-dispatch:
   *      - COURIER → DISPATCHED (stamps DispatchDate)
   *      - OPERATOR/ADMIN → AWB_LINKED only
   *
   * @param {object} payload - { qrCode, awbNumber }
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Updated parcel.
   * @throws {Error} 404/400/409 on invalid state or duplicate AWB.
   */
  async scanAndLinkAWB(payload, user) {
    const { qrCode, awbNumber } = payload;
    const employeeCode = user?.employeeCode || 'SYSTEM';
    const role = user?.role || 'OPERATOR';

    // Step 1: Find parcel by QR code (parcel_id)
    const parcel = parcelRepository.findByQRCode(qrCode);
    if (!parcel) {
      const error = new Error(`Parcel not found for QR code: ${qrCode}`);
      error.statusCode = 404;
      throw error;
    }

    // Step 2: Validate state — must be LABEL_PRINTED
    if (parcel.parcelStatusCode !== 'LABEL_PRINTED') {
      const error = new Error(
        `Cannot link AWB: parcel is in '${parcel.parcelStatusCode}' state. ` +
        `AWB linking requires parcel to be in LABEL_PRINTED state.`
      );
      error.statusCode = 400;
      throw error;
    }

    // Step 3: Check AWB uniqueness (409 on duplicate)
    const isDuplicate = parcelRepository.checkDuplicateAWB(awbNumber);
    if (isDuplicate) {
      const error = new Error(`AWB number '${awbNumber}' is already linked to another parcel`);
      error.statusCode = 409;
      throw error;
    }

    // Step 4: Execute scan + link
    const result = await parcelRepository.scanAndLinkAWB(qrCode, awbNumber, role, employeeCode);
    return result;
  }

  /**
   * Dispatch parcels in bulk.
   * Maps to prc_parcel_details_set.
   * Business rule: All parcels must be in AWB_LINKED state.
   *
   * @param {number[]} parcelIds - Array of PkParcelDetailsId values.
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Dispatch result.
   * @throws {Error} 400 if any parcel is not AWB_LINKED.
   */
  async dispatchParcels(parcelIds, user) {
    const employeeCode = user?.employeeCode || 'SYSTEM';

    // Validate all parcels exist and are in AWB_LINKED state
    for (const pid of parcelIds) {
      const parcel = await parcelRepository.findById(pid);
      if (!parcel) {
        const error = new Error(`Parcel with ID ${pid} not found`);
        error.statusCode = 404;
        throw error;
      }
      if (parcel.status !== 'AWB_LINKED') {
        const error = new Error(
          `Cannot dispatch parcel ${parcel.parcelId}: status is '${parcel.status}'. ` +
          `Dispatch requires AWB_LINKED status.`
        );
        error.statusCode = 400;
        throw error;
      }
    }

    return await parcelRepository.dispatchParcels(parcelIds, employeeCode);
  }

  /**
   * Mark parcel as DELIVERED (terminal state).
   * Maps to prc_parcel_details_set.
   * Business rule: Parcel must be DISPATCHED.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Updated parcel.
   */
  async deliverParcel(id, user) {
    return await this._transitionToTerminal(id, 'DELIVERED', user);
  }

  /**
   * Cancel a parcel (before dispatch).
   * Maps to prc_parcel_details_set.
   * Business rule: Parcel must be PENDING, LABEL_PRINTED, or AWB_LINKED.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Updated parcel.
   */
  async cancelParcel(id, user) {
    return await this._transitionToTerminal(id, 'CANCELLED', user);
  }

  /**
   * Mark parcel as RETURNED (only after dispatch).
   * Maps to prc_parcel_details_set.
   * Business rule: Parcel must be DISPATCHED or DELIVERED.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Updated parcel.
   */
  async returnParcel(id, user) {
    return await this._transitionToTerminal(id, 'RETURNED', user);
  }

  // ============================================================================
  // EVENT LOG OPERATIONS
  // ============================================================================

  /**
   * Browse system-wide parcel events (paginated, filtered).
   * Maps to prc_receiver_status_details_get (pAction=0).
   *
   * @param {object} filters - { page, limit, dateFrom, dateTo, actionType, scannedBy }
   * @returns {object} { data: [...], total: number }
   */
  async browseEvents(filters) {
    return await parcelRepository.browseEvents(filters);
  }

  // ============================================================================
  // INTERNAL HELPERS
  // ============================================================================

  /**
   * Generic terminal state transition with validation.
   * Validates the current status against VALID_TRANSITIONS before delegating.
   *
   * @param {number|string} id - PkParcelDetailsId.
   * @param {string} targetStatus - The desired new status.
   * @param {object} user - Authenticated user from JWT.
   * @returns {object} Updated parcel.
   * @throws {Error} 404/400 on invalid parcel or transition.
   * @private
   */
  async _transitionToTerminal(id, targetStatus, user) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }

    // Validate transition using the state machine
    const allowedNext = VALID_TRANSITIONS[parcel.status] || [];
    if (!allowedNext.includes(targetStatus)) {
      const error = new Error(
        `Invalid state transition: cannot move parcel from '${parcel.status}' to '${targetStatus}'. ` +
        `Allowed transitions from '${parcel.status}': [${allowedNext.join(', ')}]`
      );
      error.statusCode = 400;
      throw error;
    }

    const employeeCode = user?.employeeCode || 'SYSTEM';
    return await parcelRepository.updateTerminalStatus(id, targetStatus, employeeCode);
  }
}

export default new ParcelService();
