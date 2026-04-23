// ============================================================================
// File: src/modules/sender/sender.repository.js
// Description: Data access layer for Senders (Parties), using stored procedures.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention:
//   - Upsert: prc_Party_master_set (ID=0 insert, >0 update, IsActive=0 delete)
//   - Read:   prc_Party_master_get (pAction=0 list, 1 by-id, 2 by-phone)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let mockSenders = [
  {
    PkPartyId: 1,
    PartyTypeId: 1,
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
    PartyTypeId: 1,
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

// ============================================================================
// MOCK MODE: In-Memory Seed Data for Party_Details (Address Book)
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
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
  },
  {
    PkPartyDetailsId: 2,
    FkPartyId: 1,
    PartyName: 'John Doe',
    PhoneNo: '9876543210',
    EmailId: 'john@example.com',
    Address: '78 Warehouse Lane',
    City: 'Pune',
    State: 'Maharashtra',
    Pincode: '411001',
    Country: 'India',
    IsActive: 1,
    IsDefault: 0,
    CreatedDate: '2026-04-05T10:00:00Z'
  },
  {
    PkPartyDetailsId: 3,
    FkPartyId: 2,
    PartyName: 'Jane Smith',
    PhoneNo: '9876543211',
    EmailId: 'jane@example.com',
    Address: '456 Sample Road',
    City: 'Delhi',
    State: 'Delhi',
    Pincode: '110001',
    Country: 'India',
    IsActive: 1,
    IsDefault: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

class SenderRepository {
  /**
   * Upsert a sender (Create or Update).
   * Procedure: CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   * 
   * @param {number} pPartyId - 0 for Insert, >0 for Update
   * @param {object} pData - Sender details
   * @param {number} pIsActive - 1 for Active, 0 for Soft-Delete
   * @param {string} pCreatedBy - EmployeeCode or username
   * @returns {Promise<object>} The operation result.
   */
  async upsert(pPartyId, pData, pIsActive = 1, pCreatedBy = 'SYSTEM') {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          pPartyId,
          1, // pPartyTypeId: 1 = Sender
          pData.customerName || null,
          pData.phoneNo || null,
          pData.emailId || null,
          pData.address || null,
          pData.city || null,
          pData.state || null,
          pData.pincode || null,
          pCreatedBy,
          pIsActive
        ]
      );
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory upsert
    // ------------------------------------------------------------------
    if (pPartyId === 0) {
      // Insert
      const newId = mockSenders.length > 0 ? Math.max(...mockSenders.map(s => s.PkPartyId)) + 1 : 1;
      const newSender = {
        PkPartyId: newId,
        PartyTypeId: 1,
        CustomerName: pData.customerName,
        PhoneNo: pData.phoneNo,
        EmailId: pData.emailId || null,
        Address: pData.address || null,
        City: pData.city || null,
        State: pData.state || null,
        Pincode: pData.pincode || null,
        IsActive: pIsActive,
        CreatedDate: new Date().toISOString()
      };
      mockSenders.push(newSender);
      return newSender;
    }

    // Update
    const index = mockSenders.findIndex(s => s.PkPartyId === pPartyId);
    if (index === -1) return null;
    mockSenders[index] = { ...mockSenders[index], ...pData, IsActive: pIsActive };
    return mockSenders[index];
  }

  /**
   * Get all active senders.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * 
   * @returns {Promise<Array>} List of senders.
   */
  async findAll() {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_get (pAction=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [0, 0, null]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory list
    // ------------------------------------------------------------------
    return mockSenders.filter(s => s.IsActive === 1);
  }

  /**
   * Get specific sender by ID.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * 
   * @param {number} id - Party ID
   * @returns {Promise<object|null>} Sender record or null.
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_get (pAction=1)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [1, id, null]);
      return rows[0][0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup
    // ------------------------------------------------------------------
    return mockSenders.find(s => s.PkPartyId === parseInt(id) && s.IsActive === 1) || null;
  }

  /**
   * Lookup sender by phone number.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * 
   * @param {string} phone - Phone number
   * @returns {Promise<object|null>} Sender record or null.
   */
  async findByPhone(phone) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_get (pAction=2)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, 0, phone]);
      return rows[0][0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by phone
    // ------------------------------------------------------------------
    return mockSenders.find(s => s.PhoneNo === phone && s.IsActive === 1) || null;
  }

  // ============================================================================
  // SENDER LOOKUP OPERATIONS
  // SP Convention:
  //   - prc_Party_master_get (pAction=3 allNames, pAction=4 allPhones, pAction=5 byName)
  // ============================================================================

  /**
   * Get all distinct active sender names.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * pAction=3 → All distinct CustomerName where IsActive=1
   *
   * @returns {Promise<Array<string>>} List of sender names.
   */
  async findAllNames() {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_get (pAction=3)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [3, 0, null]);
      return rows[0].map((r) => r.CustomerName);
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory distinct names
    // ------------------------------------------------------------------
    return [...new Set(
      mockSenders.filter((s) => s.IsActive === 1).map((s) => s.CustomerName)
    )];
  }

  /**
   * Get all distinct active sender phone numbers.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * pAction=4 → All distinct PhoneNo where IsActive=1
   *
   * @returns {Promise<Array<string>>} List of phone numbers.
   */
  async findAllPhones() {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_get (pAction=4)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [4, 0, null]);
      return rows[0].map((r) => r.PhoneNo);
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory distinct phones
    // ------------------------------------------------------------------
    return [...new Set(
      mockSenders.filter((s) => s.IsActive === 1).map((s) => s.PhoneNo)
    )];
  }

  /**
   * Search senders by name (partial match).
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * pAction=5 → Partial match on CustomerName where IsActive=1
   *
   * @param {string} name - Search string for partial match.
   * @returns {Promise<Array>} List of matching sender records.
   */
  async findByName(name) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_master_get (pAction=5)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [5, 0, name]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory partial name match (case-insensitive)
    // ------------------------------------------------------------------
    const q = name.toLowerCase();
    return mockSenders.filter(
      (s) => s.IsActive === 1 && s.CustomerName.toLowerCase().includes(q)
    );
  }

  // ============================================================================
  // PARTY_DETAILS (ADDRESS BOOK) OPERATIONS
  // SP Convention:
  //   - Upsert: prc_Party_Details_set (ID=0 insert, >0 update)
  //   - Read:   prc_Party_Details_get (pAction=0 all-by-party, pAction=1 by-id)
  // ============================================================================

  /**
   * Get all active addresses for a given party.
   * Procedure: CALL prc_Party_Details_get(?, ?, ?)
   * pAction=0 → All active addresses for a party (WHERE FkPartyId=? AND IsActive=1)
   *
   * @param {number|string} partyId - PkPartyId of the party.
   * @returns {Promise<Array>} List of Party_Details records.
   */
  async findAddressesByPartyId(partyId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_Details_get (pAction=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_Details_get(?, ?, ?)', [
        0, // pAction=0 → All addresses for party
        0,
        partyId
      ]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filter by FkPartyId
    // ------------------------------------------------------------------
    return mockPartyDetails.filter(
      (d) => d.FkPartyId === parseInt(partyId) && d.IsActive === 1
    );
  }

  /**
   * Create a new address entry in Party_Details.
   * Procedure: CALL prc_Party_Details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: ID=0 → Insert new address.
   *
   * @param {number|string} partyId - FkPartyId to link to.
   * @param {object} data - Address fields { partyName, phoneNo, emailId, address, city, state, pincode, country, isDefault }.
   * @param {object} user - Authenticated user from JWT.
   * @returns {Promise<object>} The created Party_Details record.
   */
  async createPartyDetail(partyId, data, user) {
    const createdBy = user?.id || user?.employeeCode || null;

    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Party_Details_set (ID=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_Details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          0, // ID=0 → Insert
          partyId,
          data.partyName || null,
          data.phoneNo || null,
          data.emailId || null,
          data.address,
          data.city,
          data.state,
          data.pincode,
          data.country || null,
          createdBy,
          1, // IsActive=1
          data.isDefault ? 1 : 0
        ]
      );
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory insert
    // ------------------------------------------------------------------
    const newId = mockPartyDetails.length > 0
      ? Math.max(...mockPartyDetails.map((d) => d.PkPartyDetailsId)) + 1
      : 1;

    const newDetail = {
      PkPartyDetailsId: newId,
      FkPartyId: parseInt(partyId),
      PartyName: data.partyName || null,
      PhoneNo: data.phoneNo || null,
      EmailId: data.emailId || null,
      Address: data.address,
      City: data.city,
      State: data.state,
      Pincode: data.pincode,
      Country: data.country || null,
      IsActive: 1,
      IsDefault: data.isDefault ? 1 : 0,
      CreatedDate: new Date().toISOString()
    };
    mockPartyDetails.push(newDetail);
    return newDetail;
  }
}

export default new SenderRepository();
