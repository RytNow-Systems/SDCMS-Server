// ============================================================================
// File: src/modules/sender/sender.service.js
// Description: Business logic layer for Senders (Parties).
//
// [INJECTION SITE] Service Dependencies:
// - senderRepository: Handles all direct database / stored procedure interactions.
// - partyTypeId: Enforced as 1 for Senders and 2 for Receivers.
// ============================================================================

import senderRepository from './sender.repository.js';

class SenderService {
  /**
   * Internal mapper to standardize Party DB records to the camelCase API contract.
   * @param {object} sender - Raw database record from Party_master.
   * @param {number|null} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {object} API-formatted sender object.
   */
  _mapToApi(sender, partyTypeId = null) {
    if (!sender) return null;
    const typeId = partyTypeId || sender.FkPartyTypeId || sender.PartyTypeId;
    const idKey = typeId === 2 ? 'receiverId' : 'senderId';
    
    return {
      [idKey]: sender.PkPartyId,
      customerName: sender.CustomerName,
      phoneNo: sender.PhoneNo,
      emailId: sender.EmailId || null,
      address: sender.Address || null,
      city: sender.City || null,
      state: sender.State || null,
      pincode: sender.Pincode || null,
      isActive: sender.IsActive === 1 || sender.IsActive === true,
      createdAt: sender.CreatedDate
    };
  }

  /**
   * Internal mapper for Address Book entries.
   * @param {object} detail - Raw database record from Party_Details.
   * @param {number|null} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {object} API-formatted address object.
   */
  _mapAddressToApi(detail, partyTypeId = null) {
    if (!detail) return null;
    const addrIdKey = partyTypeId === 2 ? 'receiverAddressId' : 'senderAddressId';
    const partyIdKey = partyTypeId === 2 ? 'receiverId' : 'senderId';

    return {
      [addrIdKey]: detail.PkPartyDetailsId,
      [partyIdKey]: detail.FkPartyId,
      customerName: detail.CustomerName || null,
      emailId: detail.EmailId || null,
      address: detail.Address,
      city: detail.City,
      state: detail.State,
      pincode: detail.Pincode,
      country: detail.Country || null,
      isDefault: detail.IsDefault === 1 || detail.IsDefault === true,
      isActive: detail.IsActive === 1 || detail.IsActive === true,
      createdAt: detail.CreatedDate
    };
  }

  /**
   * Retrieves all active parties (Senders or Receivers).
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<Array<object>>} List of parties in API format.
   */
  async getParties(partyTypeId) {
    const parties = await senderRepository.findAll(partyTypeId);
    return parties.map(p => this._mapToApi(p, partyTypeId));
  }

  /**
   * Retrieves a specific party by ID.
   * @param {number|string} id - PkPartyId.
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<object>} API-formatted party object.
   * @throws {Error} 404 if party not found.
   */
  async getPartyById(id, partyTypeId) {
    const party = await senderRepository.findById(id, partyTypeId);
    if (!party) {
      const typeLabel = partyTypeId === 1 ? 'Sender' : 'Receiver';
      const error = new Error(`${typeLabel} not found`);
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(party, partyTypeId);
  }

  /**
   * Creates a new party after uniqueness validation (phone/email).
   * @param {object} partyData - Payload from client.
   * @param {object} user - Authenticated user context.
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<object>} Created party in API format.
   * @throws {Error} 409 if phone number or email is duplicated.
   */
  async createParty(partyData, user, partyTypeId) {
    const count = await senderRepository.checkDuplicate(0, partyData.phoneNo, partyData.emailId);
    if (count > 0) {
      const typeLabel = partyTypeId === 1 ? 'Sender' : 'Receiver';
      const error = new Error(`${typeLabel} phone number or email already exists`);
      error.statusCode = 409;
      throw error;
    }
    const adminId = user?.id || user?.employeeCode || 1;
    const result = await senderRepository.create(partyData, adminId, partyTypeId);
    return this._mapToApi(result, partyTypeId);
  }

  /**
   * Updates party details with conditional duplicate checking.
   * @param {number|string} id - PkPartyId.
   * @param {object} partyData - Partial updates.
   * @param {object} user - Authenticated user context.
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<object>} Updated party.
   */
  async updateParty(id, partyData, user, partyTypeId) {
    const existing = await this.getPartyById(id, partyTypeId);
    const phoneChanged = partyData.phoneNo && partyData.phoneNo !== existing.phoneNo;
    const emailChanged = partyData.emailId && partyData.emailId !== existing.emailId;
    
    if (phoneChanged || emailChanged) {
      const count = await senderRepository.checkDuplicate(id, partyData.phoneNo || existing.phoneNo, partyData.emailId || existing.emailId);
      if (count > 0) {
        const typeLabel = partyTypeId === 1 ? 'Sender' : 'Receiver';
        const error = new Error(`${typeLabel} phone number or email already exists`);
        error.statusCode = 409;
        throw error;
      }
    }
    const adminId = user?.id || user?.employeeCode || 1;
    const result = await senderRepository.update(id, { ...existing, ...partyData }, adminId, partyTypeId);
    return this._mapToApi(result, partyTypeId);
  }

  /**
   * Performs soft-delete by deactivating the Party record.
   * @param {number|string} id - PkPartyId.
   * @param {object} user - Authenticated user context.
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<boolean>} True on success.
   */
  async deleteParty(id, user, partyTypeId) {
    await this.getPartyById(id, partyTypeId);
    const adminId = user?.id || user?.employeeCode || 1;
    await senderRepository.delete(id, adminId, partyTypeId);
    return true;
  }

  /**
   * Auto-fill lookup using phone number as unique key.
   * @param {string} phone - Target phone number.
   * @param {number} partyTypeId - 1 (Sender) or 2 (Receiver).
   * @returns {Promise<object>} Matching sender/receiver.
   */
  async lookupByPhone(phone, partyTypeId) {
    if (!phone) {
      const error = new Error('Phone number is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const parties = await senderRepository.findAll(partyTypeId);
    const party = parties.find(s => s.PhoneNo === phone);
    if (!party) {
      const typeLabel = partyTypeId === 1 ? 'Sender' : 'Receiver';
      const error = new Error(`No ${typeLabel} found for phone: ${phone}`);
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(party, partyTypeId);
  }

  /**
   * Autocomplete lookup for party names.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<string>>}
   */
  async getAllSenderNames(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 1 : partyTypeId === 2 ? 2 : partyTypeId;
    return await senderRepository.findAllNames(typeId);
  }

  /**
   * Autocomplete lookup for phone numbers.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<string>>}
   */
  async getAllPhoneNumbers(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 1 : partyTypeId === 2 ? 2 : partyTypeId;
    return await senderRepository.findAllPhones(typeId);
  }

  /**
   * Search parties by name prefix/partial.
   * @param {string} name - Partial name.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<object>>}
   */
  async lookupByName(name, partyTypeId = null) {
    if (!name) {
      const error = new Error('Name query parameter is required for lookup');
      error.statusCode = 400;
      throw error;
    }
    const typeId = partyTypeId === 1 ? 1 : partyTypeId === 2 ? 2 : partyTypeId;
    const parties = await senderRepository.findByName(name, typeId);
    return parties.map((s) => this._mapToApi(s, typeId));
  }

  /**
   * Retrieves all secondary addresses from the Address Book.
   * @param {number|string} partyId - PkPartyId.
   * @param {number|null} partyTypeId - Contextual type (1 for sender, 2 for receiver).
   * @returns {Promise<Array<object>>} API-formatted addresses.
   */
  async getAddressesByPartyId(partyId, partyTypeId = null) {
    const addresses = await senderRepository.findAddressesByPartyId(partyId);
    return addresses.map((d) => this._mapAddressToApi(d, partyTypeId));
  }

  /**
   * Adds a new entry to the Party's Address Book.
   * @param {number|string} partyId - Parent Party ID.
   * @param {object} data - Address fields.
   * @param {object} user - Creator context.
   * @param {number|null} partyTypeId - Contextual type (1 for sender, 2 for receiver).
   * @returns {Promise<object>} Created address object.
   */
  async createAddress(partyId, data, user, partyTypeId = null) {
    const party = await senderRepository.findById(partyId, null);
    if (!party) {
      const error = new Error('Party not found');
      error.statusCode = 404;
      throw error;
    }
    const payload = {
      emailId: party.EmailId,
      address: data.address, city: data.city, state: data.state, pincode: data.pincode,
      country: data.country || 'India', isDefault: data.isDefault
    };
    const result = await senderRepository.createPartyDetail(partyId, payload, user);
    return this._mapAddressToApi(result, partyTypeId);
  }
}

export default new SenderService();
