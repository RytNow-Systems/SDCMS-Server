// ============================================================================
// File: src/modules/sender/sender.service.js
// Description: Business logic layer for Senders (Parties).
//
// [INJECTION SITE] Service Dependencies:
// - senderRepository: Handles all direct database / stored procedure interactions.
// - partyTypeId: Enforced as 30 for Senders and 31 for Receivers.
// ============================================================================

import senderRepository from './sender.repository.js';

class SenderService {
  /**
   * Internal mapper to standardize Party DB records to the camelCase API contract.
   * @param {object} sender - Raw database record from Party_master.
   * @returns {object} API-formatted sender object.
   */
  _mapToApi(sender) {
    if (!sender) return null;
    return {
      id: sender.PkPartyId,
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
   * @returns {object} API-formatted address object.
   */
  _mapAddressToApi(detail) {
    if (!detail) return null;
    return {
      id: detail.PkPartyDetailsId,
      partyId: detail.FkPartyId,
      partyName: detail.PartyName,
      phoneNo: detail.PhoneNo,
      emailId: detail.EmailId || null,
      address: detail.Address,
      city: detail.City,
      state: detail.State,
      pincode: detail.Pincode,
      country: detail.Country || null,
      isDefault: detail.IsDefault === 1 || detail.IsDefault === true,
      createdAt: detail.CreatedDate
    };
  }

  /**
   * Retrieves all active senders (PartyTypeId=30).
   * @returns {Promise<Array<object>>} List of senders in API format.
   */
  async getSenders() {
    const senders = await senderRepository.findAll(30);
    return senders.map(s => this._mapToApi(s));
  }

  /**
   * Retrieves a specific sender by ID.
   * @param {number|string} id - PkPartyId.
   * @returns {Promise<object>} API-formatted sender object.
   * @throws {Error} 404 if sender not found or is not a sender type.
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
   * Creates a new sender after uniqueness validation.
   * @param {object} senderData - Payload from client.
   * @param {object} user - Authenticated user context.
   * @returns {Promise<object>} Created sender in API format.
   * @throws {Error} 409 if phone number is duplicated.
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
   * Updates sender details with conditional duplicate checking.
   * @param {number|string} id - PkPartyId.
   * @param {object} senderData - Partial updates.
   * @param {object} user - Authenticated user context.
   * @returns {Promise<object>} Updated sender.
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
    const result = await senderRepository.update(id, { ...existing, ...senderData }, adminId, 30);
    return this._mapToApi(result);
  }

  /**
   * Performs soft-delete by deactivating the Party record.
   * @param {number|string} id - PkPartyId.
   * @param {object} user - Authenticated user context.
   * @returns {Promise<boolean>} True on success.
   */
  async deleteSender(id, user) {
    await this.getSenderById(id);
    const adminId = user?.id || user?.employeeCode || 1;
    await senderRepository.delete(id, adminId, 30);
    return true;
  }

  /**
   * Auto-fill lookup using phone number as unique key.
   * @param {string} phone - Target phone number.
   * @returns {Promise<object>} Matching sender.
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

  /**
   * Autocomplete lookup for party names.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<string>>}
   */
  async getAllSenderNames(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 30 : partyTypeId === 2 ? 31 : partyTypeId;
    return await senderRepository.findAllNames(typeId);
  }

  /**
   * Autocomplete lookup for phone numbers.
   * @param {number|null} [partyTypeId=null] - Optional filter.
   * @returns {Promise<Array<string>>}
   */
  async getAllPhoneNumbers(partyTypeId = null) {
    const typeId = partyTypeId === 1 ? 30 : partyTypeId === 2 ? 31 : partyTypeId;
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
    const typeId = partyTypeId === 1 ? 30 : partyTypeId === 2 ? 31 : partyTypeId;
    const parties = await senderRepository.findByName(name, typeId);
    return parties.map((s) => this._mapToApi(s));
  }

  /**
   * Retrieves all secondary addresses from the Address Book.
   * @param {number|string} partyId - PkPartyId.
   * @returns {Promise<Array<object>>} API-formatted addresses.
   */
  async getAddressesByPartyId(partyId) {
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
   * Adds a new entry to the Party's Address Book.
   * @param {number|string} partyId - Parent Party ID.
   * @param {object} data - Address fields.
   * @param {object} user - Creator context.
   * @returns {Promise<object>} Created address object.
   */
  async createAddress(partyId, data, user) {
    const party = await senderRepository.findById(partyId, null);
    if (!party) {
      const error = new Error('Party not found');
      error.statusCode = 404;
      throw error;
    }
    const payload = {
      partyName: party.CustomerName, phoneNo: party.PhoneNo, emailId: party.EmailId,
      address: data.address, city: data.city, state: data.state, pincode: data.pincode,
      country: data.country || null, isDefault: data.isDefault
    };
    const result = await senderRepository.createPartyDetail(partyId, payload, user);
    return this._mapAddressToApi(result);
  }
}

export default new SenderService();
