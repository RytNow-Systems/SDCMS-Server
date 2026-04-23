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

  // ============================================================================
  // SENDER LOOKUP OPERATIONS (autocomplete dropdowns)
  // ============================================================================

  /**
   * Retrieves all distinct active sender names.
   * @returns {Promise<Array<string>>} List of sender name strings.
   */
  async getAllSenderNames() {
    return await senderRepository.findAllNames();
  }

  /**
   * Retrieves all distinct active phone numbers.
   * @returns {Promise<Array<string>>} List of phone number strings.
   */
  async getAllPhoneNumbers() {
    return await senderRepository.findAllPhones();
  }

  /**
   * Search senders by name (partial match).
   * @param {string} name - Search query string.
   * @returns {Promise<Array>} List of matching sender records (API format).
   * @throws {Error} 400 if name param is missing.
   */
  async lookupByName(name) {
    if (!name) {
      const error = new Error('Name query parameter is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const senders = await senderRepository.findByName(name);
    return senders.map((s) => this._mapToApi(s));
  }

  // ============================================================================
  // ADDRESS BOOK (PARTY_DETAILS) OPERATIONS
  // ============================================================================

  /**
   * Maps a Party_Details DB record to the API response shape.
   * @param {object} detail - Raw Party_Details record.
   * @returns {object} API-formatted address object.
   */
  _mapAddressToApi(detail) {
    if (!detail) return null;
    return {
      id: detail.PkPartyDetailsId,
      partyId: detail.FkPartyId,
      partyName: detail.PartyName,
      phoneNo: detail.PhoneNo,
      emailId: detail.EmailId,
      address: detail.Address,
      city: detail.City,
      state: detail.State,
      pincode: detail.Pincode,
      country: detail.Country,
      isDefault: detail.IsDefault === 1 || detail.IsDefault === true,
      createdAt: detail.CreatedDate
    };
  }

  /**
   * Retrieves all active addresses for a given party (address book dropdown).
   * @param {number|string} partyId - PkPartyId.
   * @returns {Promise<Array>} List of address objects.
   * @throws {Error} 404 if party not found.
   */
  async getAddressesByPartyId(partyId) {
    // Verify party exists first
    const party = await senderRepository.findById(partyId);
    if (!party) {
      const error = new Error('Party not found');
      error.statusCode = 404;
      throw error;
    }

    const addresses = await senderRepository.findAddressesByPartyId(partyId);
    return addresses.map((d) => this._mapAddressToApi(d));
  }

  /**
   * Creates a new address entry for a party.
   * @param {number|string} partyId - PkPartyId to link address to.
   * @param {object} data - Validated address payload.
   * @param {object} user - Authenticated user from JWT.
   * @returns {Promise<object>} The created address object.
   * @throws {Error} 404 if party not found.
   */
  async createAddress(partyId, data, user) {
    // Verify party exists first
    const party = await senderRepository.findById(partyId);
    if (!party) {
      const error = new Error('Party not found');
      error.statusCode = 404;
      throw error;
    }

    const result = await senderRepository.createPartyDetail(partyId, data, user);
    return this._mapAddressToApi(result);
  }
}

export default new SenderService();
