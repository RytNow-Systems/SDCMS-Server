// ============================================================================
// File: src/modules/courier/courier.repository.js
// Description: Data access layer for Courier Partners.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_courier_partner_master_get (pAction=0 list, pAction=1 specific)
//   - Upserts: prc_courier_partner_master_set (CourierId=0 insert, >0 update, IsActive=0 delete)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let seedCouriers = [];

const initializeSeedData = () => {
  seedCouriers = [
    {
      CourierId: 1,
      CourierName: 'Delhivery',
      TrackingUrlTemplate: 'https://delhivery.com/track/{AWB}',
      IsActive: true,
      CreatedDate: new Date().toISOString()
    },
    {
      CourierId: 2,
      CourierName: 'BlueDart',
      TrackingUrlTemplate: 'https://bluedart.com/track/{AWB}',
      IsActive: true,
      CreatedDate: new Date().toISOString()
    }
  ];
};

initializeSeedData();

class CourierRepository {
  /**
   * Fetches a paginated list of courier partners with optional search.
   * Procedure: CALL prc_courier_partner_master_get(?, ?, ?, ?)
   * Convention: pAction=0 → paginated list.
   *
   * @param {number} page - Page number.
   * @param {number} limit - Results per page.
   * @param {string} search - Optional search term.
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAll(page = 1, limit = 20, search = '') {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_get (pAction=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?, ?, ?)', [
        0, // pAction=0 → Get all couriers (paginated)
        page,
        limit,
        search || null
      ]);
      return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering
    // ------------------------------------------------------------------
    const activeCouriers = seedCouriers.filter(c => c.IsActive);
    let filtered = activeCouriers;

    if (search) {
      filtered = filtered.filter(c =>
        c.CourierName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return {
      data: filtered,
      total: filtered.length
    };
  }

  /**
   * Fetches a courier partner by ID.
   * Procedure: CALL prc_courier_partner_master_get(?, ?)
   * Convention: pAction=1 → specific record.
   *
   * @param {number|string} id - CourierId.
   * @returns {Promise<object|null>} Courier record or null.
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_get (pAction=1)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?)', [1, id]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by CourierId
    // ------------------------------------------------------------------
    const courier = seedCouriers.find((c) => c.CourierId.toString() === id.toString() && c.IsActive);
    return courier || null;
  }

  /**
   * Creates a new courier partner.
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?)
   * Convention: CourierId=0 triggers insert. No pAction on _set calls.
   *
   * @param {object} courierData - { courierName, trackingUrlTemplate }
   * @returns {Promise<object>} The newly created courier record.
   */
  async create(courierData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (CourierId=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?)', [
        0, // CourierId=0 → Insert new courier
        courierData.courierName,
        courierData.trackingUrlTemplate,
        1  // IsActive=1
      ]);
      return rows[0]?.[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory push
    // ------------------------------------------------------------------
    const newId = seedCouriers.length > 0 ? Math.max(...seedCouriers.map(c => c.CourierId)) + 1 : 1;
    const newCourier = {
      CourierId: newId,
      CourierName: courierData.courierName,
      TrackingUrlTemplate: courierData.trackingUrlTemplate,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    };

    seedCouriers.push(newCourier);
    return newCourier;
  }

  /**
   * Updates an existing courier partner.
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?)
   * Convention: CourierId>0 triggers update. No pAction on _set calls.
   *
   * @param {number|string} id - CourierId.
   * @param {object} updates - Fields to update.
   * @returns {Promise<object|null>} Updated courier record or null.
   */
  async update(id, updates) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (CourierId>0 → Update)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?)', [
        id, // CourierId>0 → Update existing courier
        updates.courierName || null,
        updates.trackingUrlTemplate || null,
        1   // IsActive=1 (still active)
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory update
    // ------------------------------------------------------------------
    const index = seedCouriers.findIndex(c => c.CourierId.toString() === id.toString() && c.IsActive);
    if (index === -1) return null;

    if (updates.courierName) seedCouriers[index].CourierName = updates.courierName;
    if (updates.trackingUrlTemplate) seedCouriers[index].TrackingUrlTemplate = updates.trackingUrlTemplate;

    return seedCouriers[index];
  }

  /**
   * Soft-deletes a courier partner (sets IsActive=0).
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?)
   * Convention: Pass IsActive=0 for soft-delete. No pAction on _set calls.
   *
   * @param {number|string} id - CourierId.
   * @returns {Promise<boolean>} True if deleted, false if not found.
   */
  async delete(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (IsActive=0 → Soft Delete)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?)', [
        id,
        null, // CourierName — no change
        null, // TrackingUrlTemplate — no change
        0     // IsActive=0 → Soft delete
      ]);
      return true;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory soft delete
    // ------------------------------------------------------------------
    const index = seedCouriers.findIndex(c => c.CourierId.toString() === id.toString() && c.IsActive);
    if (index === -1) return false;

    seedCouriers[index].IsActive = false;
    return true;
  }
}

export default new CourierRepository();
