// ============================================================================
// File: src/modules/parcel/parcel.service.js
// Description: Business logic layer for the Parcel module.
// Enforces the strict parcel status flow:
//   Created → Label Printed → AWB Linked → Dispatched → Delivered
// and terminal states (Cancelled, Returned).
// All state transitions are validated before delegating to the repository.
//
// Dual-Mode: Service-layer validations apply in BOTH modes.
// In LIVE mode, the SP also validates (defense-in-depth).
// In MOCK mode, service validations are the sole guardrails.
//
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
  // INTERNAL MAPPERS (Standardize PascalCase to camelCase)
  // ============================================================================

  _mapParcelSummary(parcel) {
    if (!parcel) return null;
    return {
      id: parcel.PkParcelDetailsId || parcel.id,
      parcelId: parcel.ParcelId || parcel.parcel_id || parcel.parcelId,
      trackingNo: parcel.TrackingNo || parcel.trackingNo,
      status: parcel.ParcelStatusCode || parcel.status,
      labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
      dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
      receiverName: parcel.ReceiverName || parcel.receiverName,
      orderCode: parcel.OrderCode || parcel.orderCode,
      createdAt: parcel.CreatedDate || parcel.createdAt
    };
  }

  _mapParcelDetail(parcel) {
    if (!parcel) return null;
    return {
      id: parcel.PkParcelDetailsId || parcel.id,
      parcelId: parcel.ParcelId || parcel.parcel_id || parcel.parcelId,
      trackingNo: parcel.TrackingNo || parcel.trackingNo,
      status: parcel.ParcelStatusCode || parcel.status,
      labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
      dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
      fkCourierId: parcel.FkCourierId || parcel.fkCourierId,
      receiverName: parcel.ReceiverName || parcel.receiverName,
      receiverPhone: parcel.ReceiverPhone || parcel.receiverPhone,
      address: parcel.Address || parcel.address,
      city: parcel.City || parcel.city,
      state: parcel.State || parcel.state,
      pincode: parcel.Pincode || parcel.pincode,
      orderCode: parcel.OrderCode || parcel.orderCode,
      orderId: parcel.FkOrderId || parcel.orderId,
      createdAt: parcel.CreatedDate || parcel.createdAt
    };
  }

  _mapLabelData(data) {
    if (!data) return null;
    return {
      parcelId: data.ParcelId || data.parcel_id || data.parcelId,
      orderCode: data.OrderCode || data.orderCode,
      senderName: data.SenderName || data.senderName,
      senderMobile: data.SenderMobile || data.senderMobile,
      senderAddress: data.SenderAddress || data.senderAddress,
      receiverName: data.ReceiverName || data.receiverName,
      receiverPhone: data.ReceiverPhone || data.receiverPhone,
      address: data.Address || data.address,
      city: data.City || data.city,
      state: data.State || data.state,
      pincode: data.Pincode || data.pincode,
      country: data.Country || data.country,
      labelPrintCount: data.LabelPrintCount !== undefined ? data.LabelPrintCount : data.labelPrintCount,
      status: data.ParcelStatusCode || data.status
    };
  }

  _mapTimelineEvent(event) {
    if (!event) return null;
    return {
      id: event.PkReceiverStatusDetailsId || event.id,
      actionType: event.ActionType || event.actionType,
      awbNumber: event.AwbNumber || event.awbNumber,
      previousStatus: event.PreviousStatus || event.previousStatus,
      newStatus: event.NewStatus || event.newStatus,
      createdBy: event.CreatedBy || event.createdBy,
      createdDate: event.CreatedDate || event.createdDate
    };
  }

  _mapBrowseEvent(event) {
    if (!event) return null;
    return {
      id: event.PkReceiverStatusDetailsId || event.id,
      parcelId: event.ParcelId || event.parcelId,
      orderCode: event.OrderCode || event.orderCode,
      actionType: event.ActionType || event.actionType,
      awbNumber: event.AwbNumber || event.awbNumber,
      previousStatus: event.PreviousStatus || event.previousStatus,
      newStatus: event.NewStatus || event.newStatus,
      scannedBy: event.CreatedBy || event.scannedBy,
      timestamp: event.CreatedDate || event.timestamp
    };
  }

  _mapMutationResult(parcel) {
    if (!parcel) return null;
    return {
      id: parcel.PkParcelDetailsId || parcel.id,
      parcelId: parcel.ParcelId || parcel.parcel_id || parcel.parcelId,
      status: parcel.ParcelStatusCode || parcel.status,
      trackingNo: parcel.TrackingNo || parcel.trackingNo,
      labelPrintCount: parcel.LabelPrintCount !== undefined ? parcel.LabelPrintCount : parcel.labelPrintCount,
      dispatchDate: parcel.DispatchDate || parcel.dispatchDate,
      previousStatus: parcel.PreviousStatus || parcel.previousStatus
    };
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  async getParcelList(filters) {
    const result = await parcelRepository.findAllParcels(filters);
    return { ...result, data: result.data.map(p => this._mapParcelSummary(p)) };
  }

  async getParcelDetails(id) {
    const data = await parcelRepository.findById(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapParcelDetail(data);
  }

  async getLabelData(id) {
    const data = await parcelRepository.getLabelData(id);
    if (!data) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapLabelData(data);
  }

  async getTimeline(id) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }
    const timeline = await parcelRepository.getTimeline(id);
    return timeline.map(event => this._mapTimelineEvent(event));
  }

  // ============================================================================
  // WRITE OPERATIONS (STATE TRANSITIONS)
  // ============================================================================

  async logLabelPrint(id, user) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }

    const currentStatus = parcel.status || parcel.ParcelStatusCode;
    const allowedStates = ['PENDING', 'LABEL_PRINTED'];
    if (!allowedStates.includes(currentStatus)) {
      const error = new Error(
        `Cannot print label: parcel is in '${currentStatus}' state. ` +
        `Label printing is only allowed when parcel is PENDING or LABEL_PRINTED.`
      );
      error.statusCode = 400;
      throw error;
    }

    const employeeCode = user?.employeeCode || 'SYSTEM';
    const result = await parcelRepository.logPrint(id, employeeCode);
    return this._mapMutationResult(result);
  }

  async scanAndLinkAWB(payload, user) {
    const { qrCode, awbNumber } = payload;
    const employeeCode = user?.employeeCode || 'SYSTEM';
    const role = user?.role || 'OPERATOR';

    if (process.env.USE_MOCK_DB === 'true') {
      const parcel = parcelRepository.findByQRCode(qrCode);
      if (!parcel) {
        const error = new Error(`Parcel not found for QR code: ${qrCode}`);
        error.statusCode = 404;
        throw error;
      }

      if (parcel.parcelStatusCode !== 'LABEL_PRINTED') {
        const error = new Error(
          `Cannot link AWB: parcel is in '${parcel.parcelStatusCode}' state. ` +
          `AWB linking requires parcel to be in LABEL_PRINTED state.`
        );
        error.statusCode = 400;
        throw error;
      }

      const isDuplicate = parcelRepository.checkDuplicateAWB(awbNumber);
      if (isDuplicate) {
        const error = new Error(`AWB number '${awbNumber}' is already linked to another parcel`);
        error.statusCode = 409;
        throw error;
      }
    }

    const result = await parcelRepository.scanAndLinkAWB(qrCode, awbNumber, role, employeeCode);
    return this._mapMutationResult(result);
  }

  async dispatchParcels(parcelIds, user) {
    const employeeCode = user?.employeeCode || 'SYSTEM';

    for (const pid of parcelIds) {
      const parcel = await parcelRepository.findById(pid);
      if (!parcel) {
        const error = new Error(`Parcel with ID ${pid} not found`);
        error.statusCode = 404;
        throw error;
      }
      const currentStatus = parcel.status || parcel.ParcelStatusCode;
      if (currentStatus !== 'AWB_LINKED') {
        const error = new Error(
          `Cannot dispatch parcel ${parcel.parcelId || parcel.ParcelId}: status is '${currentStatus}'. ` +
          `Dispatch requires AWB_LINKED status.`
        );
        error.statusCode = 400;
        throw error;
      }
    }

    const { dispatched, parcels } = await parcelRepository.dispatchParcels(parcelIds, employeeCode);
    return {
      dispatched,
      parcels: parcels.map(p => this._mapMutationResult(p))
    };
  }

  async deliverParcel(id, user) {
    return await this._transitionToTerminal(id, 'DELIVERED', user);
  }

  async cancelParcel(id, user) {
    return await this._transitionToTerminal(id, 'CANCELLED', user);
  }

  async returnParcel(id, user) {
    return await this._transitionToTerminal(id, 'RETURNED', user);
  }

  // ============================================================================
  // EVENT LOG OPERATIONS
  // ============================================================================

  async browseEvents(filters) {
    const result = await parcelRepository.browseEvents(filters);
    return {
      ...result,
      data: result.data.map(e => this._mapBrowseEvent(e))
    };
  }

  // ============================================================================
  // INTERNAL HELPERS
  // ============================================================================

  async _transitionToTerminal(id, targetStatus, user) {
    const parcel = await parcelRepository.findById(id);
    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }

    const currentStatus = parcel.status || parcel.ParcelStatusCode;
    const allowedNext = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowedNext.includes(targetStatus)) {
      const error = new Error(
        `Invalid state transition: cannot move parcel from '${currentStatus}' to '${targetStatus}'. ` +
        `Allowed transitions from '${currentStatus}': [${allowedNext.join(', ')}]`
      );
      error.statusCode = 400;
      throw error;
    }

    const employeeCode = user?.employeeCode || 'SYSTEM';
    const result = await parcelRepository.updateTerminalStatus(id, targetStatus, employeeCode);
    return this._mapMutationResult(result);
  }
}

export default new ParcelService();
