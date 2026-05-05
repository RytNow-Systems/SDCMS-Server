// ============================================================================
// File: src/modules/parcel/parcel-code.service.js
// Description: Utility service to dynamically generate and deconstruct
// the PCL prefix code for Parcels based on the Order and Parcel primary keys.
//
// INJECTION SITE:
// This service delegates orderId resolution from receiverDetailsId to
// senderRepository.resolveReceiverOrderId(), which traverses the
// parcel → receiver → order FK chain via prc_receiver_details_get.
// ============================================================================

import senderRepository from "../sender/sender.repository.js";

class ParcelCodeService {
  /**
   * Generates a parcel code using the formula PCL-[orderId]-[parcelId].
   * This is a synchronous method — use only when orderId is already known.
   *
   * @param {number|string} orderId
   * @param {number|string} parcelId
   * @returns {string|null} Generated parcel code, or null if missing inputs
   */
  generateCode(orderId, parcelId) {
    if (!orderId || !parcelId) return null;
    return `PCL-${orderId}-${parcelId}`;
  }

  /**
   * Generates a parcel code with automatic orderId resolution.
   * When orderId is not directly available (e.g., from prc_parcel_details_get),
   * this method resolves it by looking up the receiver's FkOrderId via the DB.
   *
   * Resolution chain: parcel.FkReceiverDetailsId → receiver_details.FkOrderId
   *
   * @param {object} params
   * @param {number|string|null} params.orderId - Direct orderId (if known).
   * @param {number|string} params.parcelId - PkParcelDetailsId (required).
   * @param {number|string|null} params.receiverDetailsId - FkReceiverDetailsId for orderId resolution fallback.
   * @returns {Promise<string|null>} Generated parcel code, or null if resolution fails.
   */
  async generateCodeAsync({ orderId, parcelId, receiverDetailsId }) {
    if (!parcelId) return null;

    // Fast path: orderId already known
    if (orderId) {
      return `PCL-${orderId}-${parcelId}`;
    }

    // Slow path: resolve orderId from receiverDetailsId
    if (!receiverDetailsId) return null;

    const resolvedOrderId = await this._resolveOrderId(receiverDetailsId);
    if (!resolvedOrderId) return null;

    return `PCL-${resolvedOrderId}-${parcelId}`;
  }

  /**
   * Deconstructs a parcel code back into its constituent Order and Parcel IDs.
   * Useful for debugging or backward lookup.
   *
   * @param {string} parcelCode
   * @returns {object|null} Object containing orderId and parcelId, or null if invalid
   */
  deconstructCode(parcelCode) {
    if (
      !parcelCode ||
      typeof parcelCode !== "string" ||
      !parcelCode.startsWith("PCL-")
    ) {
      return null;
    }

    const parts = parcelCode.split("-");
    if (parts.length !== 3) return null;

    const [, orderIdStr, parcelIdStr] = parts;
    const orderId = parseInt(orderIdStr, 10);
    const parcelId = parseInt(parcelIdStr, 10);

    if (isNaN(orderId) || isNaN(parcelId)) {
      return null;
    }

    return { orderId, parcelId };
  }

  /**
   * Resolves the orderId from a receiverDetailsId by querying receiver_details.
   * Procedure: CALL prc_receiver_details_get(pAction=1, pPkReceiverDetailsId)
   *
   * In MOCK mode, returns null (mock callers should supply orderId directly).
   *
   * @private
   * @param {number|string} receiverDetailsId
   * @returns {Promise<number|null>} FkOrderId or null
   */
  async _resolveOrderId(receiverDetailsId) {
    return senderRepository.resolveReceiverOrderId(receiverDetailsId);
  }
}

export default new ParcelCodeService();
