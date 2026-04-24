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
    const senders = await senderRepository.findAll(30);
    return senders.map(s => this._mapToApi(s));
  }

  /**
   * Retrieves a specific sender by ID.
   * @param {number|string} id 
   * @returns {Promise<object>}
   */
  async getSenderById(id) {
    const sender = await senderRepository.findById(id, 30);
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
   * @param {object} user 
   * @returns {Promise<object>}
   */
  async createSender(senderData, user) {
    const count = await senderRepository.checkDuplicate(0, senderData.phoneNo);
    if (count > 0) {
      const error = new Error('Sender phone number already exists');
      error.statusCode = 409;
      throw error;
    }

    const adminId = user?.id || user?.employeeCode || 1;
    const result = await senderRepository.create(senderData, adminId, 30);
    return this._mapToApi(result);
  }

  /**
   * Updates an existing sender.
   * @param {number|string} id 
   * @param {object} senderData 
   * @param {object} user 
   * @returns {Promise<object>}
   */
  async updateSender(id, senderData, user) {
    const existing = await this.getSenderById(id);

    if (senderData.phoneNo && senderData.phoneNo !== existing.phoneNo) {
      const count = await senderRepository.checkDuplicate(id, senderData.phoneNo);
      if (count > 0) {
        const error = new Error('Sender phone number already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    const adminId = user?.id || user?.employeeCode || 1;
    // merge existing with update data
    const payload = {
      ...existing,
      ...senderData
    };
    const result = await senderRepository.update(id, payload, adminId, 30);
    return this._mapToApi(result);
  }

  /**
   * Soft-deletes a sender.
   * @param {number|string} id 
   * @param {object} user 
   * @returns {Promise<object>}
   */
  async deleteSender(id, user) {
    await this.getSenderById(id);
    const adminId = user?.id || user?.employeeCode || 1;
    await senderRepository.delete(id, adminId, 30);
    return true;
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
    const senders = await senderRepository.findAll(30);
    const sender = senders.find(s => s.PhoneNo === phone);
    if (!sender) {
      const error = new Error(`No sender found for phone: ${phone}`);
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(sender);
  }

  // ============================================================================
  // PARTY LOOKUP OPERATIONS (shared by senders & receivers)
  // partyTypeId: 1=Sender, 2=Receiver, null=all
  // ============================================================================

  /**
   * Retrieves all distinct active party names, filtered by party type.
   * @param {number|null} [partyTypeId=null] - 1=Sender, 2=Receiver, null=all.
   * @returns {Promise<Array<string>>} List of party name strings.
   */
  async getAllSenderNames(partyTypeId = null) {
    // For senders, partyTypeId is 30 in the DB, though the arg might be 1 from the controller.
    // Let's use 30 if partyTypeId is 1 (or 31 if 2), or just map directly.
    const typeId = partyTypeId === 1 ? 30 : partyTypeId === 2 ? 31 : partyTypeId;
    return await senderRepository.findAllNames(typeId);
  }

  /**
   * Retrieves all distinct active phone numbers, filtered by party type.
   * @param {number|null} [partyTypeId=null] - 1=Sender, 2=Receiver, null=all.
   * @returns {Promise<Array<string>>} List of phone number strings.
   */
  async getAllPhoneNumbers(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 30 : partyTypeId === 2 ? 31 : partyTypeId;
    return await senderRepository.findAllPhones(typeId);
  }

  /**
   * Search parties by name (partial match), filtered by party type.
   * @param {string} name - Search query string.
   * @param {number|null} [partyTypeId=null] - 1=Sender, 2=Receiver, null=all.
   * @returns {Promise<Array>} List of matching party records (API format).
   * @throws {Error} 400 if name param is missing.
   */
  async lookupByName(name, partyTypeId = null) {
    if (!name) {
      const error = new Error('Name query parameter is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const typeId = partyTypeId === 1 ? 30 : partyTypeId === 2 ? 31 : partyTypeId;
    const parties = await senderRepository.findByName(name, typeId);
    return parties.map((s) => this._mapToApi(s));
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
    const party = await senderRepository.findById(partyId, null);
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
    const party = await senderRepository.findById(partyId, null);
    if (!party) {
      const error = new Error('Party not found');
      error.statusCode = 404;
      throw error;
    }


    // Use party master fields from :id (ignore identity fields from client body)
    const payload = {
      partyName: party.CustomerName || null,
      phoneNo: party.PhoneNo || null,
      emailId: party.EmailId || null,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country || null,
      isDefault: data.isDefault
    };


    const result = await senderRepository.createPartyDetail(partyId, payload, user);
    return this._mapAddressToApi(result);
  }
}

export default new SenderService();
