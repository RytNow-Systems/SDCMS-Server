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
}

export default new SenderRepository();
