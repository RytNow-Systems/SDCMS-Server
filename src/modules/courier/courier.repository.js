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
   * Procedure: CALL prc_courier_partner_master_get(?, ?)
   * Convention: pAction=0 → list all, pCourierId=0 → no specific filter.
   * Pagination and search filtering are handled in-memory (master data table).
   *
   * @param {object} params - { page, limit, search }
   * @returns {Promise<object>} { data: [...], meta: { page, limit, totalRows, totalPages } }
   */
  async findAll({ page = 1, limit = 20, search } = {}) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_get (pAction=0, pCourierId=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_get(?, ?)', [
        0, // pAction=0 → Get all couriers
        0  // pCourierId=0 → No specific courier filter
      ]);

      let results = rows[0] || [];

      // In-memory filter for search
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(c =>
          c.CourierName?.toLowerCase().includes(s)
        );
      }

      const totalRows = results.length;
      const startIndex = (page - 1) * limit;
      const paginatedItems = results.slice(startIndex, startIndex + limit);

      return {
        data: paginatedItems,
        meta: { page: parseInt(page), limit: parseInt(limit), totalRows, totalPages: Math.ceil(totalRows / limit) }
      };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering and pagination
    // ------------------------------------------------------------------
    const activeCouriers = seedCouriers.filter(c => c.IsActive);
    let results = [...activeCouriers];

    if (search) {
      const s = search.toLowerCase();
      results = results.filter(c =>
        c.CourierName.toLowerCase().includes(s)
      );
    }

    const totalRows = results.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = results.slice(startIndex, startIndex + limit);

    return {
      data: paginatedItems,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalRows,
        totalPages: Math.ceil(totalRows / limit)
      }
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
   * Checks if a courier name already exists (excluding a specific ID for updates).
   * Procedure: CALL prc_check_duplicate_courier_partner_master(?, ?)
   *
   * @param {number} id - Courier ID to exclude (0 for inserts)
   * @param {string} name - Courier name to check
   * @returns {Promise<number>} Count of duplicates found
   */
  async checkDuplicate(id, name) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_courier_partner_master(?, ?)', [
        id || 0,
        name
      ]);
      return rows[0]?.[0]?.DuplicateCount || 0;
    }

    // MOCK MODE
    const duplicate = seedCouriers.find(
      c => c.CourierName.toLowerCase() === name.toLowerCase() && c.CourierId.toString() !== id?.toString() && c.IsActive
    );
    return duplicate ? 1 : 0;
  }

  /**
   * Creates a new courier partner.
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)
   * Convention: CourierId=0 triggers insert.
   *
   * @param {object} courierData - { courierName, trackingUrlTemplate }
   * @param {number|string} adminId - ID of the creating admin
   * @returns {Promise<object>} The newly created courier record.
   */
  async create(courierData, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (CourierId=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)', [
        0, // CourierId=0 → Insert new courier
        courierData.courierName,
        courierData.trackingUrlTemplate || null,
        adminId || null,
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
      TrackingUrlTemplate: courierData.trackingUrlTemplate || null,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    };

    seedCouriers.push(newCourier);
    return newCourier;
  }

  /**
   * Updates an existing courier partner.
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)
   * Convention: CourierId>0 triggers update.
   *
   * @param {number|string} id - CourierId.
   * @param {object} updates - Fields to update.
   * @param {number|string} adminId - ID of the updating admin
   * @returns {Promise<object|null>} Updated courier record or null.
   */
  async update(id, updates, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (CourierId>0 → Update)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)', [
        id, // CourierId>0 → Update existing courier
        updates.courierName,
        updates.trackingUrlTemplate || null,
        adminId || null,
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
   * Procedure: CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)
   * Convention: Pass IsActive=0 for soft-delete.
   *
   * @param {number|string} id - CourierId.
   * @param {number|string} adminId - ID of the deleting admin
   * @returns {Promise<boolean>} True if deleted, false if not found.
   */
  async delete(id, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_courier_partner_master_set (IsActive=0 → Soft Delete)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const existing = await this.findById(id);
      if (!existing) return false;

      const [rows] = await db.execute('CALL prc_courier_partner_master_set(?, ?, ?, ?, ?)', [
        id,
        existing.CourierName,
        existing.TrackingUrlTemplate,
        adminId || null,
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
