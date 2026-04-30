// ============================================================================
// File: src/modules/parcel/parcel-code.service.js
// Description: Utility service to dynamically generate and deconstruct 
// the PCL prefix code for Parcels based on the Order and Parcel primary keys.
// ============================================================================

class ParcelCodeService {
  /**
   * Generates a parcel code using the formula PCL-[orderId]-[parcelId]
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
   * Deconstructs a parcel code back into its constituent Order and Parcel IDs.
   * Useful for debugging or backward lookup.
   * 
   * @param {string} parcelCode 
   * @returns {object|null} Object containing orderId and parcelId, or null if invalid
   */
  deconstructCode(parcelCode) {
    if (!parcelCode || typeof parcelCode !== 'string' || !parcelCode.startsWith('PCL-')) {
      return null;
    }
    
    const parts = parcelCode.split('-');
    if (parts.length !== 3) return null;
    
    const [, orderIdStr, parcelIdStr] = parts;
    const orderId = parseInt(orderIdStr, 10);
    const parcelId = parseInt(parcelIdStr, 10);
    
    if (isNaN(orderId) || isNaN(parcelId)) {
      return null;
    }

    return { orderId, parcelId };
  }
}

export default new ParcelCodeService();
