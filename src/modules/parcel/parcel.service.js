// ============================================================================
// File: src/modules/parcel/parcel.service.js
// Description: Business logic layer for the Parcel module.
// Enforces the strict parcel status flow:
//   Created → Label Printed → AWB Linked → Dispatched → Delivered
// and terminal states (Cancelled, Returned).
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
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED'
};

// Valid transitions (v2.2 System Flow)
const VALID_TRANSITIONS = {
  [STATUS.PENDING]:       [STATUS.LABEL_PRINTED, STATUS.CANCELLED],
  [STATUS.LABEL_PRINTED]: [STATUS.AWB_LINKED, STATUS.DISPATCHED, STATUS.CANCELLED],
  [STATUS.AWB_LINKED]:    [STATUS.DISPATCHED, STATUS.CANCELLED],
  [STATUS.DISPATCHED]:    [STATUS.DELIVERED, STATUS.RETURNED],
  [STATUS.DELIVERED]:     [STATUS.RETURNED],
  [STATUS.CANCELLED]:     [],
  [STATUS.RETURNED]:      []
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

  _mapParcel(parcel) {
    if (!parcel) return null;
    return {
      id: parcel.PkParcelDetailsId || parcel.id,
      parcelId: parcel.QRCode || parcel.parcelId || parcel.parcel_id,
      trackingNo: parcel.TrackingNo || parcel.trackingNo,
      status: parcel.StatusDescription || parcel.status || parcel.parcelStatusCode || STATUS.PENDING,
      labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
      dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
      receiverName: parcel.ReceiverName || parcel.receiverName,
      receiverPhone: parcel.ReceiverPhone || parcel.receiverPhone,
      address: parcel.Address || parcel.address,
      city: parcel.City || parcel.city,
      state: parcel.State || parcel.state,
      pincode: parcel.Pincode || parcel.pincode,
      orderCode: parcel.OrderCode || parcel.orderCode,
      orderId: parcel.FkOrderId || parcel.orderId,
      receiverDetailsId: parcel.FkReceiverDetailsId || parcel.fkReceiverDetailsId,
      createdAt: parcel.CreatedDate || parcel.createdAt,
      parcelCode: ParcelCodeService.generateCode(
        parcel.FkOrderId || parcel.orderId,
        parcel.PkParcelDetailsId || parcel.id
      )
    };
  }

  _mapEvent(event) {
    if (!event) return null;
    return {
      id: event.PkReceiverStatusDetailsId || event.id,
      parcelId: event.QRCode || event.parcelId,
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
    return { data: data.map(p => this._mapParcel(p)), total };
  }

  async getParcelDetails(id) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapParcel(parcel);
  }

  async getLabelData(id) {
    const data = await parcelRepository.getLabelData(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapParcel(data);
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

    return this._mapParcel(result);
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
      const { qrCode, awbNumber } = payload;
      const employeeCode = user?.employeeCode || 'SYSTEM';
      const role = user?.role || 'OPERATOR';

      // 1. Find and Validate Parcel
      const parcel = await this._getAndValidateForLinking(qrCode);

      // 2. Check for Duplicate AWB
      await this._ensureUniqueAWB(awbNumber);

      // 3. Perform linking based on role (Auto-dispatch for Couriers)
      const result = await this._executeLinkingFlow(parcel, awbNumber, role, employeeCode);

      return this._mapParcel(result);
    } catch (error) {
      // Service layer error handling (AGENTS.md §3D)
      throw error;
    }
  }

  async dispatchParcels(parcelIds, user) {
    const employeeCode = user?.employeeCode || 'SYSTEM';
    const dispatched = [];

    for (const id of parcelIds) {
      const parcel = await this.getParcelDetails(id);
      
      if (parcel.status !== STATUS.AWB_LINKED) {
        const error = new Error(`Parcel ${parcel.parcelId} cannot be dispatched (Status: ${parcel.status})`);
        error.statusCode = 400;
        throw error;
      }

      const result = await parcelRepository.updateParcelState(id, 3, parcel.trackingNo, 0, employeeCode);
      dispatched.push(this._mapParcel(result));
    }

    return { dispatched: dispatched.length, parcels: dispatched };
  }

  async deliverParcel(id, user) {
    return await this._transition(id, 4, STATUS.DELIVERED, user);
  }

  async returnParcel(id, user) {
    return await this._transition(id, 5, STATUS.RETURNED, user);
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
    
    return this._mapParcel(result);
  }

  /**
   * Internal helper to find and validate a parcel for the linking flow.
   * @private
   */
  async _getAndValidateForLinking(qrCode) {
    const parcelRaw = await parcelRepository.findByQR(qrCode);
    if (!parcelRaw) {
      const error = new Error(`Parcel not found for QR: ${qrCode}`);
      error.statusCode = 404;
      throw error;
    }
    const parcel = this._mapParcel(parcelRaw);
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
    if (role === 'COURIER') {
      // Auto-dispatch for couriers (Trigger 3)
      return await parcelRepository.updateParcelState(parcel.id, 3, awbNumber, 0, employeeCode);
    } 
    
    // Normal linking (Trigger 2)
    return await parcelRepository.updateParcelState(parcel.id, 2, awbNumber, 0, employeeCode);
  }
}

export default new ParcelService();
