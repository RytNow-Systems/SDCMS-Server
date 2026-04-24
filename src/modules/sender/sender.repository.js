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
//   - Read:   prc_party_master_search (pPkPartyId, pFkPartyTypeId)
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
  },
  {
    PkPartyId: 3,
    PartyTypeId: 31, // Receivers
    CustomerName: 'Receiver Corp',
    PhoneNo: '9123456780',
    EmailId: 'recv@example.com',
    Address: '99 Delivery Lane',
    City: 'Bangalore',
    State: 'Karnataka',
    Pincode: '560001',
    IsActive: 1,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    PkPartyId: 4,
    PartyTypeId: 31,
    CustomerName: 'Warehouse Delhi',
    PhoneNo: '9123456781',
    EmailId: 'warehouse@example.com',
    Address: '12 Godown Road',
    City: 'Delhi',
    State: 'Delhi',
    Pincode: '110002',
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
  async checkDuplicate(id, phone) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_Party_master(?, ?)', [id, phone]);
      return Object.values(rows[0][0])[0];
    }
    return mockParties.filter(s => s.PhoneNo === phone && s.PkPartyId !== parseInt(id) && s.IsActive === 1).length;
  }

  async findAll(partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      return rows[0];
    }
    return mockParties.filter(s => s.IsActive === 1 && (partyTypeId === null || s.PartyTypeId === partyTypeId));
  }

  async findById(id, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [id, partyTypeId]);
      return rows[0][0] || null;
    }
    return mockParties.find(s => s.PkPartyId === parseInt(id) && s.IsActive === 1 && (partyTypeId === null || s.PartyTypeId === partyTypeId)) || null;
  }

  async create(data, adminId, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          0,
          partyTypeId,
          data.customerName || null,
          data.phoneNo || null,
          data.emailId || null,
          data.address || null, // pAddressLine1
          null, // pAddressLine2
          data.city || null,
          data.state || null,
          data.pincode || null,
          adminId,
          1 // IsActive
        ]
      );
      return rows[0][0];
    }
    const newId = mockParties.length > 0 ? Math.max(...mockParties.map(s => s.PkPartyId)) + 1 : 1;
    const newSender = {
      PkPartyId: newId,
      PartyTypeId: partyTypeId,
      CustomerName: data.customerName,
      PhoneNo: data.phoneNo,
      EmailId: data.emailId || null,
      Address: data.address || null,
      City: data.city || null,
      State: data.state || null,
      Pincode: data.pincode || null,
      IsActive: 1,
      CreatedDate: new Date().toISOString()
    };
    mockParties.push(newSender);
    return newSender;
  }

  async update(id, data, adminId, partyTypeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          partyTypeId,
          data.customerName || null,
          data.phoneNo || null,
          data.emailId || null,
          data.address || null,
          null,
          data.city || null,
          data.state || null,
          data.pincode || null,
          adminId,
          1
        ]
      );
      return rows[0][0];
    }
    const index = mockParties.findIndex(s => s.PkPartyId === parseInt(id));
    if (index === -1) return null;
    mockParties[index] = { ...mockParties[index], ...data };
    return mockParties[index];
  }

  async delete(id, adminId, partyTypeId) {
    const existing = await this.findById(id, partyTypeId);
    if (!existing) return null;

    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          partyTypeId,
          existing.CustomerName || null,
          existing.PhoneNo || null,
          existing.EmailId || null,
          existing.Address || null,
          null,
          existing.City || null,
          existing.State || null,
          existing.Pincode || null,
          adminId,
          0 // IsActive = 0
        ]
      );
      return rows[0][0];
    }
    const index = mockParties.findIndex(s => s.PkPartyId === parseInt(id));
    mockParties[index].IsActive = 0;
    return mockParties[index];
  }

  async findAllNames(partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      return [...new Set(rows[0].map(r => r.CustomerName))];
    }
    let parties = mockParties.filter(s => s.IsActive === 1);
    if (partyTypeId) parties = parties.filter(s => s.PartyTypeId === partyTypeId);
    return [...new Set(parties.map(s => s.CustomerName))];
  }

  async findAllPhones(partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      return [...new Set(rows[0].map(r => r.PhoneNo))];
    }
    let parties = mockParties.filter(s => s.IsActive === 1);
    if (partyTypeId) parties = parties.filter(s => s.PartyTypeId === partyTypeId);
    return [...new Set(parties.map(s => s.PhoneNo))];
  }

  async findByName(name, partyTypeId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_party_master_search(?, ?)', [0, partyTypeId]);
      const q = name.toLowerCase();
      return rows[0].filter(s => s.CustomerName && s.CustomerName.toLowerCase().includes(q));
    }
    const q = name.toLowerCase();
    let parties = mockParties.filter(
      s => s.IsActive === 1 && s.CustomerName.toLowerCase().includes(q)
    );
    if (partyTypeId) parties = parties.filter(s => s.PartyTypeId === partyTypeId);
    return parties;
  }

  async findAddressesByPartyId(partyId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Party_Details_get(?, ?, ?)', [
        0, 
        0,
        partyId
      ]);
      return rows[0];
    }
    return mockPartyDetails.filter(
      (d) => d.FkPartyId === parseInt(partyId) && d.IsActive === 1
    );
  }

  async createPartyDetail(partyId, data, user) {
    const createdBy = user?.id || user?.employeeCode || null;
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_Party_Details_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          0,
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
          1, 
          data.isDefault ? 1 : 0
        ]
      );
      return rows[0][0];
    }
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
