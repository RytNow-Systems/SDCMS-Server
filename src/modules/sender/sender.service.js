// ============================================================================
// File: src/modules/sender/sender.service.js
// Description: Business logic layer for Senders (Parties).
// ============================================================================

import senderRepository from './sender.repository.js';

class SenderService {
  /**
   * Retrieves all active senders.
   * @returns {Promise<Array>}
   */
  async getSenders() {
    return await senderRepository.findAll();
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
    return sender;
  }

  /**
   * Creates a new sender.
   * @param {object} senderData 
   * @returns {Promise<object>}
   */
  async createSender(senderData) {
    // Note: pPartyId = 0 for Insert
    const result = await senderRepository.upsert(0, senderData);
    return result;
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
    return result;
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
    return result;
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
    return await senderRepository.findByPhone(phone);
  }
}

export default new SenderService();
