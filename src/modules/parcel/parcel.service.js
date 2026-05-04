// ============================================================================
// File: src/modules/parcel/parcel.service.js
// Description: Business logic layer for the Parcel module.
// Enforces the strict parcel status flow:
//   Created → Label Printed → AWB Linked → Dispatched → Delivered
// and terminal state (Cancelled).
// ============================================================================

import parcelRepository from './parcel.repository.js';
import ParcelCodeService from './parcel-code.service.js';

// Status constants mapping (from lu_details/system flow)
const STATUS = {
  PENDING: 'PENDING',
  LABEL_PRINTED: 'LABEL_PRINTED',
  AWB_LINKED: 'AWB_LINKED',
  DISPATCHED: 'DISPATCHED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

// Valid transitions (v2.3 System Flow — RETURNED removed, trigger 5 = CANCELLED)
const VALID_TRANSITIONS = {
  [STATUS.PENDING]:       [STATUS.LABEL_PRINTED, STATUS.CANCELLED],
  [STATUS.LABEL_PRINTED]: [STATUS.AWB_LINKED, STATUS.DISPATCHED, STATUS.CANCELLED],
  [STATUS.AWB_LINKED]:    [STATUS.DISPATCHED, STATUS.CANCELLED],
  [STATUS.DISPATCHED]:    [STATUS.DELIVERED],
  [STATUS.DELIVERED]:     [],
  [STATUS.CANCELLED]:     []
};

/**
 * ParcelService
 * 
 * INJECTION SITE:
 * This service depends on 'parcelRepository' for all data persistence and SP execution.
 * All business logic relating to the Parcel lifecycle (v2.2) is orchestrated here.
 * 
 * Rules Enforced:
 * - Order = Planning, Parcel = Execution.
 * - Strict state machine transitions.
 * - Atomic Scan/Link flow with role-based auto-dispatch.
 */
class ParcelService {
  // ============================================================================
  // INTERNAL MAPPERS
  // ============================================================================

  async _mapParcel(parcel) {
    if (!parcel) return null;

    const parcelDetailsId = parcel.PkParcelDetailsId || parcel.id || parcel.parcelDetailsId;
    const receiverDetailsId = parcel.FkReceiverDetailsId || parcel.fkReceiverDetailsId;

    return {
      parcelDetailsId,
      parcelId: await ParcelCodeService.generateCodeAsync({
        orderId: parcel.FkOrderId || parcel.orderId,
        parcelId: parcelDetailsId,
        receiverDetailsId
      }),
      trackingNo: parcel.TrackingNo || parcel.trackingNo || null,
      status: parcel.ParcelStatusName || parcel.StatusDescription || parcel.status || parcel.parcelStatusCode || STATUS.PENDING,
      labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
      dispatchDate: parcel.DispatchDate || parcel.dispatchDate || null,
      receiverName: parcel.ReceiverName || parcel.receiverName || null,
      receiverPhone: parcel.ReceiverPhone || parcel.receiverPhone || null,
      address: parcel.Address || parcel.address || null,
      city: parcel.ReceiverCity || parcel.City || parcel.city || null,
      state: parcel.ReceiverState || parcel.State || parcel.state || null,
      pincode: parcel.ReceiverPincode || parcel.Pincode || parcel.pincode || null,
      orderCode: parcel.OrderCode || parcel.orderCode || null,
      orderId: parcel.FkOrderId || parcel.orderId,
      receiverDetailsId,
      createdAt: parcel.CreatedDate || parcel.createdAt
    };
  }

  _mapEvent(event) {
    if (!event) return null;
    return {
      receiverStatusDetailsId: event.PkReceiverStatusDetailsId || event.id || event.receiverStatusDetailsId,
      parcelId: event.QRCode || event.parcelId, // Still uses QRCode from event log if available, but we'll transition this too if needed.
      orderCode: event.OrderCode || event.orderCode,
      actionType: event.ActionType || event.actionType,
      awbNumber: event.AwbNumber || event.awbNumber,
      previousStatus: event.PreviousStatus || event.previousStatus,
      newStatus: event.StatusDescription || event.newStatus,
      scannedBy: event.CreatedBy || event.scannedBy,
      timestamp: event.CreatedDate || event.timestamp
    };
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  async getParcelList(filters) {
    const { data, total } = await parcelRepository.findAll(filters);
    return { data: await Promise.all(data.map(p => this._mapParcel(p))), total };
  }

  async getParcelDetails(id) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return await this._mapParcel(parcel);
  }

  async getLabelData(id) {
    const data = await parcelRepository.getLabelData(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return await this._mapParcel(data);
  }

  async getTimeline(id) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    const receiverId = parcel.FkReceiverDetailsId || parcel.fkReceiverDetailsId;
    const timeline = await parcelRepository.getTimeline(receiverId);
    return timeline.map(e => this._mapEvent(e));
  }

  // ============================================================================
  // WRITE OPERATIONS
  // ============================================================================

  async logLabelPrint(id, user) {
    const parcel = await this.getParcelDetails(id);
    const employeeCode = user?.employeeCode || 'SYSTEM';

    // State validation
    const allowed = [STATUS.PENDING, STATUS.LABEL_PRINTED];
    if (!allowed.includes(parcel.status)) {
      const error = new Error(`Cannot print label in '${parcel.status}' state`);
      error.statusCode = 400;
      throw error;
    }

    // Update State (Trigger 1 = PRINT_LABEL)
    const result = await parcelRepository.updateParcelState(id, 1, null, 0, employeeCode);

    return await this._mapParcel(result);
  }

  /**
   * QR scan + AWB link atomic two-scan flow (API Contract §10).
   * Orchestrates finding, duplicate checks, and state transitions.
   * 
   * Rule: COURIER role triggers automatic dispatch.
   *
   * @param {object} payload - { qrCode, awbNumber }
   * @param {object} user - Authenticated user.
   * @returns {Promise<object>} Updated parcel.
   */
  async scanAndLinkAWB(payload, user) {
    try {
      const { parcelId, awbNumber } = payload;
      const employeeCode = user?.employeeCode || 'SYSTEM';
      const role = user?.role || 'OPERATOR';

      // 1. Find and Validate Parcel
      const parcel = await this._getAndValidateForLinking(parcelId);

      // 2. Check for Duplicate AWB
      await this._ensureUniqueAWB(awbNumber);

      // 3. Perform linking based on role (Auto-dispatch for Couriers)
      const result = await this._executeLinkingFlow(parcel, awbNumber, role, employeeCode);

      return await this._mapParcel(result);
    } catch (error) {
      // Service layer error handling (AGENTS.md §3D)
      throw error;
    }
  }

  async dispatchParcels(parcelDetailsIds, user) {
    const employeeCode = user?.employeeCode || 'SYSTEM';
    const dispatched = [];

    for (const id of parcelDetailsIds) {
      const parcel = await this.getParcelDetails(id);
      
      if (parcel.status !== STATUS.AWB_LINKED) {
        const error = new Error(`Parcel ${parcel.parcelId} cannot be dispatched (Status: ${parcel.status})`);
        error.statusCode = 400;
        throw error;
      }

      const result = await parcelRepository.updateParcelState(id, 3, parcel.trackingNo, 0, employeeCode);
      dispatched.push(await this._mapParcel(result));
    }

    return { dispatched: dispatched.length, parcels: dispatched };
  }

  async deliverParcel(id, user) {
    return await this._transition(id, 4, STATUS.DELIVERED, user);
  }

  async cancelParcel(id, user) {
    return await this._transition(id, 5, STATUS.CANCELLED, user);
  }

  // ============================================================================
  // BROWSE EVENTS
  // ============================================================================

  async browseEvents(filters) {
    const { data, total } = await parcelRepository.browseEvents(filters);
    return { data: data.map(e => this._mapEvent(e)), total };
  }

  // ============================================================================
  // INTERNAL HELPERS
  // ============================================================================

  async _transition(id, triggerType, targetStatus, user) {
    const parcel = await this.getParcelDetails(id);
    const employeeCode = user?.employeeCode || 'SYSTEM';

    const allowed = VALID_TRANSITIONS[parcel.status] || [];
    if (!allowed.includes(targetStatus)) {
      const error = new Error(`Invalid transition: ${parcel.status} -> ${targetStatus}`);
      error.statusCode = 400;
      throw error;
    }

    const result = await parcelRepository.updateParcelState(id, triggerType, parcel.trackingNo, 0, employeeCode);
    
    return await this._mapParcel(result);
  }

  /**
   * Internal helper to find and validate a parcel for the linking flow.
   * Uses deconstruction to resolve the numeric ID from the dynamic PCL code.
   * @private
   */
  async _getAndValidateForLinking(parcelId) {
    // 1. Deconstruct PCL code
    const deconstructed = ParcelCodeService.deconstructCode(parcelId);
    if (!deconstructed) {
      const error = new Error(`Invalid parcel identifier format: ${parcelId}`);
      error.statusCode = 400;
      throw error;
    }

    const { parcelId: parcelDetailsId } = deconstructed;

    // 2. Fetch by PK
    const parcelRaw = await parcelRepository.findById(parcelDetailsId);
    if (!parcelRaw) {
      const error = new Error(`Parcel not found for ID: ${parcelDetailsId}`);
      error.statusCode = 404;
      throw error;
    }

    const parcel = await this._mapParcel(parcelRaw);
    if (parcel.status !== STATUS.LABEL_PRINTED) {
      const error = new Error(`Cannot link AWB: parcel is '${parcel.status}', must be '${STATUS.LABEL_PRINTED}'`);
      error.statusCode = 400;
      throw error;
    }
    return parcel;
  }

  /**
   * Internal helper to ensure AWB is not already in use.
   * @private
   */
  async _ensureUniqueAWB(awbNumber) {
    const existingAWB = await parcelRepository.findByAWB(awbNumber);
    if (existingAWB) {
      const error = new Error(`AWB '${awbNumber}' is already linked to another parcel`);
      error.statusCode = 409;
      throw error;
    }
  }

  /**
   * Internal helper to execute the linking database updates.
   * @private
   */
  async _executeLinkingFlow(parcel, awbNumber, role, employeeCode) {
    const id = parcel.parcelDetailsId;
    if (role === 'COURIER') {
      // Auto-dispatch for couriers (Trigger 3)
      return await parcelRepository.updateParcelState(id, 3, awbNumber, 0, employeeCode);
    } 
    
    // Normal linking (Trigger 2)
    return await parcelRepository.updateParcelState(id, 2, awbNumber, 0, employeeCode);
  }
}

export default new ParcelService();
