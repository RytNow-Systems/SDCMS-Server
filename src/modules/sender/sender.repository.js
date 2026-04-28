// ============================================================================
// File: src/modules/sender/sender.repository.js
// Description: Data access layer for Senders (Parties), using stored procedures.
//
// [INJECTION SITE] Repository Dependencies:
// - db: Centralized MySQL connection pool for executing stored procedures.
// - process.env.USE_MOCK_DB: Toggles between Live MySQL and In-Memory seed data.
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let mockParties = [
  {
    PkPartyId: 1,
    PartyTypeId: 30, // 30 for Senders in DB
    CustomerName: 'John Doe',
    PhoneNo: '9876543210',
    EmailId: 'john@example.com',
    Address: '123 Test Street',
    City: 'Mumbai',
    State: 'Maharashtra',
    Pincode: '400001',
    IsActive: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    PkPartyId: 2,
    PartyTypeId: 30,
    CustomerName: 'Jane Smith',
    PhoneNo: '9876543211',
    EmailId: 'jane@example.com',
    Address: '456 Sample Road',
    City: 'Delhi',
    State: 'Delhi',
    Pincode: '110001',
    IsActive: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

let mockPartyDetails = [
  {
    PkPartyDetailsId: 1,
    FkPartyId: 1,
    PartyName: 'John Doe',
    PhoneNo: '9876543210',
    EmailId: 'john@example.com',
    Address: '123 Test Street',
    City: 'Mumbai',
    State: 'Maharashtra',
    Pincode: '400001',
    Country: 'India',
    IsActive: 1,
    IsDefault: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

class SenderRepository {
  /**
   * Checks if a phone number already exists for a different party.
   * @param {number|string} id - Current PkPartyId (0 for new).
   * @param {string} phone - Phone number to check.
   * @returns {Promise<number>} Count of duplicates found.
   */
  async checkDuplicate(id, phone) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_Party_master(?, ?)', [id, phone]);
      return Object.values(rows[0][0])[0];
    }
    return mockParties.filter(s => s.PhoneNo === phone && s.PkPartyId !== parseInt(id) && s.IsActive === 1).length;
  }

  /**
   * Retrieves all active parties of a specific type.
   * @param {number} partyTypeId - 30 for Sender, 31 for Receiver.
   * @returns {Promise<Array>} List of raw party records.
   */
  async findAll(partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      return rows[0];
    }
    return mockParties.filter(s => s.IsActive === 1 && (partyTypeId === null || s.PartyTypeId === partyTypeId));
  }

  /**
   * Retrieves a party by ID and type.
   * @param {number|string} id - PkPartyId.
   * @param {number} partyTypeId - Type filter.
   * @returns {Promise<object|null>} Party record or null.
   */
  async findById(id, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [id, partyTypeId]);
      return rows[0][0] || null;
    }
    const match = mockParties.find(s => s.PkPartyId === parseInt(id) && s.IsActive === 1 && (partyTypeId === null || s.PartyTypeId === partyTypeId));
    return match || null;
  }

  /**
   * Creates a new Party record.
   * @param {object} data - Party master fields.
   * @param {number|string} adminId - PkEmployeeId of creator.
   * @param {number} partyTypeId - 30 (Sender) or 31 (Receiver).
   * @returns {Promise<object>} Created record.
   */
  async create(data, adminId, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      // Step 1: Create the party in Party_master (11 params)
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [0, partyTypeId, data.customerName, data.phoneNo, data.emailId || null, data.address, data.city, data.state, data.pincode, adminId, 1]
      );
      const party = rows[0][0];

      // Step 2: Seed the default address record in party_details
      if (party && party.IsNewParty === 1) {
        await db.execute(
          'CALL prc_party_details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            0,                          // pPkPartyDetailsId=0 for insert
            party.PkPartyId,            // pFkPartyId
            data.emailId || null,       // pEmailId
            data.address || null,       // pAddress
            data.city || null,          // pCity
            data.state || null,         // pState
            data.pincode || null,       // pPincode
            'India',                    // pCountry
            1,                          // pIsDefault: 1 (primary address)
            adminId,                    // pCreatedBy
            1                           // pIsActive
          ]
        );
      }

      return party;
    }
    const newId = mockParties.length > 0 ? Math.max(...mockParties.map(s => s.PkPartyId)) + 1 : 1;
    const newSender = { PkPartyId: newId, PartyTypeId: partyTypeId, CustomerName: data.customerName, PhoneNo: data.phoneNo, EmailId: data.emailId || null, Address: data.address, City: data.city, State: data.state, Pincode: data.pincode, IsActive: 1, CreatedDate: new Date().toISOString() };
    mockParties.push(newSender);
    // Also seed the default address in mockPartyDetails
    const newDetailId = mockPartyDetails.length > 0 ? Math.max(...mockPartyDetails.map(d => d.PkPartyDetailsId)) + 1 : 1;
    mockPartyDetails.push({ PkPartyDetailsId: newDetailId, FkPartyId: newId, PartyName: data.customerName, PhoneNo: data.phoneNo, EmailId: data.emailId || null, Address: data.address, City: data.city, State: data.state, Pincode: data.pincode, Country: 'India', IsActive: 1, IsDefault: 1, CreatedDate: new Date().toISOString() });
    return newSender;
  }

  /**
   * Updates an existing Party record.
   * @param {number|string} id - PkPartyId.
   * @param {object} data - Fields to update.
   * @param {number|string} adminId - PkEmployeeId of modifier.
   * @param {number} partyTypeId - Type filter.
   * @returns {Promise<object>} Updated record.
   */
  async update(id, data, adminId, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, partyTypeId, data.customerName, data.phoneNo, data.emailId || null, data.address, data.city, data.state, data.pincode, adminId, 1]
      );
      return rows[0][0];
    }
    const idx = mockParties.findIndex(s => s.PkPartyId === parseInt(id));
    if (idx === -1) return null;
    mockParties[idx] = { ...mockParties[idx], ...data };
    return mockParties[idx];
  }

  /**
   * Soft-deletes a Party record (IsActive=0).
   * @param {number|string} id - PkPartyId.
   * @param {number|string} adminId - PkEmployeeId of modifier.
   * @param {number} partyTypeId - Type filter.
   * @returns {Promise<object>} Deleted record summary.
   */
  async delete(id, adminId, partyTypeId) {
    const existing = await this.findById(id, partyTypeId);
    if (!existing) return null;
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, partyTypeId, existing.CustomerName, existing.PhoneNo, existing.EmailId, existing.Address, existing.City, existing.State, existing.Pincode, adminId, 0]
      );
      return rows[0][0];
    }
    const idx = mockParties.findIndex(s => s.PkPartyId === parseInt(id));
    mockParties[idx].IsActive = 0;
    return mockParties[idx];
  }

  /**
   * Retrieves unique names for autocomplete.
   * @param {number|null} partyTypeId - Optional type filter.
   * @returns {Promise<Array<string>>}
   */
  async findAllNames(partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      return [...new Set(rows[0].map(r => r.CustomerName))];
    }
    let list = mockParties.filter(s => s.IsActive === 1);
    if (partyTypeId) list = list.filter(s => s.PartyTypeId === partyTypeId);
    return [...new Set(list.map(s => s.CustomerName))];
  }

  /**
   * Retrieves unique phones for autocomplete.
   * @param {number|null} partyTypeId - Optional type filter.
   * @returns {Promise<Array<string>>}
   */
  async findAllPhones(partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      return [...new Set(rows[0].map(r => r.PhoneNo))];
    }
    let list = mockParties.filter(s => s.IsActive === 1);
    if (partyTypeId) list = list.filter(s => s.PartyTypeId === partyTypeId);
    return [...new Set(list.map(s => s.PhoneNo))];
  }

  /**
   * Partial name match for search suggestions.
   * @param {string} name - Partial query.
   * @param {number|null} partyTypeId - Type filter.
   * @returns {Promise<Array>}
   */
  async findByName(name, partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      const q = name.toLowerCase();
      return rows[0].filter(s => s.CustomerName && s.CustomerName.toLowerCase().includes(q));
    }
    const q = name.toLowerCase();
    let list = mockParties.filter(s => s.IsActive === 1 && s.CustomerName.toLowerCase().includes(q));
    if (partyTypeId) list = list.filter(s => s.PartyTypeId === partyTypeId);
    return list;
  }

  /**
   * Retrieves address book for a specific party.
   * @param {number|string} partyId - PkPartyId.
   * @returns {Promise<Array>}
   */
  async findAddressesByPartyId(partyId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_Details_get(?, ?, ?)', [0, 0, partyId]);
      return rows[0];
    }
    return mockPartyDetails.filter(d => d.FkPartyId === parseInt(partyId) && d.IsActive === 1);
  }

  /**
   * Creates a detailed address record (Address Book).
   * @param {number|string} partyId - Parent PkPartyId.
   * @param {object} data - Address details.
   * @param {object} user - Creator context.
   * @returns {Promise<object>}
   */
  async createPartyDetail(partyId, data, user) {
    const creator = user?.id || user?.employeeCode || null;
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_Details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [0, partyId, data.partyName, data.phoneNo, data.emailId, data.address, data.city, data.state, data.pincode, data.country, creator, 1, data.isDefault ? 1 : 0]);
      return rows[0][0];
    }
    const newId = mockPartyDetails.length > 0 ? Math.max(...mockPartyDetails.map(d => d.PkPartyDetailsId)) + 1 : 1;
    const newDet = { PkPartyDetailsId: newId, FkPartyId: parseInt(partyId), PartyName: data.partyName, PhoneNo: data.phoneNo, EmailId: data.emailId, Address: data.address, City: data.city, State: data.state, Pincode: data.pincode, Country: data.country || null, IsActive: 1, IsDefault: data.isDefault ? 1 : 0, CreatedDate: new Date().toISOString() };
    mockPartyDetails.push(newDet);
    return newDet;
  }
}

export default new SenderRepository();
