// ============================================================================
// File: src/modules/sender/sender.service.js
// Description: Business logic layer for Senders (Parties).
// ============================================================================

import senderRepository from './sender.repository.js';

class SenderService {
  _mapToApi(sender) {
    if (!sender) return null;
    return {
      id: sender.PkPartyId,
      customerName: sender.CustomerName,
      phoneNo: sender.PhoneNo,
      emailId: sender.EmailId,
      address: sender.Address,
      city: sender.City,
      state: sender.State,
      pincode: sender.Pincode,
      isActive: sender.IsActive === 1 || sender.IsActive === true,
      createdAt: sender.CreatedDate
    };
  }

  /**
   * Retrieves all active senders.
   * @returns {Promise<Array>}
   */
  async getSenders() {
    const senders = await senderRepository.findAll();
    return senders.map(s => this._mapToApi(s));
  }

  /**
   * Retrieves a specific sender by ID.
   * @param {number|string} id 
   * @returns {Promise<object>}
   */
  async getSenderById(id) {
    const sender = await senderRepository.findById(id);
    if (!sender) {
      const error = new Error('Sender not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(sender);
  }

  /**
   * Creates a new sender.
   * @param {object} senderData 
   * @returns {Promise<object>}
   */
  async createSender(senderData) {
    // Note: pPartyId = 0 for Insert
    const result = await senderRepository.upsert(0, senderData);
    return this._mapToApi(result);
  }

  /**
   * Updates an existing sender.
   * @param {number|string} id 
   * @param {object} senderData 
   * @returns {Promise<object>}
   */
  async updateSender(id, senderData) {
    // Verify existence first
    await this.getSenderById(id);
    
    // Note: pPartyId = id for Update
    const result = await senderRepository.upsert(id, senderData);
    return this._mapToApi(result);
  }

  /**
   * Soft-deletes a sender.
   * @param {number|string} id 
   * @returns {Promise<object>}
   */
  async deleteSender(id) {
    // Verify existence first
    await this.getSenderById(id);
    
    // Note: pIsActive = 0 for Soft-Delete
    const result = await senderRepository.upsert(id, {}, 0);
    return true; // usually delete returns a truthy value or success message
  }

  /**
   * Looks up a sender by phone number.
   * Useful for frontend auto-fill or duplicate checks.
   * @param {string} phone 
   * @returns {Promise<object|null>}
   */
  async lookupByPhone(phone) {
    if (!phone) {
      const error = new Error('Phone number is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const sender = await senderRepository.findByPhone(phone);
    return this._mapToApi(sender);
  }
}

export default new SenderService();
