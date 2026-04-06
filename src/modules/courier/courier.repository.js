// ============================================================================
// File: src/modules/courier/courier.repository.js
// Description: Data access layer for Courier Partners, explicitly mocking 
// the Stored Procedure architecture defined in Database_Procedures_Requirements.md
// ============================================================================

import db from '../../infrastructure/database/db.js';

// In-Memory Seed Data Fallback per strict 'Zero Direct DB' rule until SPs are ready
let seedCouriers = [];

const initializeSeedData = () => {
  seedCouriers = [
    {
      id: 1,
      courierName: 'Delhivery',
      apiKey: 'test_delhivery_key',
      trackingUrlTemplate: 'https://delhivery.com/track/{AWB}',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      courierName: 'BlueDart',
      apiKey: 'test_bluedart_key',
      trackingUrlTemplate: 'https://bluedart.com/track/{AWB}',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];
};

initializeSeedData();

class CourierRepository {
  /**
   * Mock implementation of: CALL sp_get_all_courier_partners(?, ?, ?)
   */
  async findAll(page = 1, limit = 20, search = '') {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_get_all_courier_partners(?, ?, ?)', [page, limit, search]);
    // return { data: rows[0], total: rows[1][0].total_records };
    // ------------------------------------------------------------------

    const activeCouriers = seedCouriers.filter(c => c.isActive);
    let filtered = activeCouriers;
    
    if (search) {
      filtered = filtered.filter(c => 
        c.courierName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return {
      data: filtered,
      total: filtered.length
    };
  }

  /**
   * Mock implementation of: CALL sp_get_courier_partner_by_id(?)
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_get_courier_partner_by_id(?)', [id]);
    // return rows[0][0] || null;
    // ------------------------------------------------------------------

    const courier = seedCouriers.find((c) => c.id.toString() === id.toString() && c.isActive);
    return courier || null;
  }

  /**
   * Mock implementation of: CALL sp_create_courier_partner(?, ?, ?)
   */
  async create(courierData) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_create_courier_partner(?, ?, ?)', [
    //   courierData.courierName,
    //   courierData.apiKey || null,
    //   courierData.trackingUrlTemplate
    // ]);
    // return rows[0][0];
    // ------------------------------------------------------------------

    const newId = seedCouriers.length > 0 ? Math.max(...seedCouriers.map(c => c.id)) + 1 : 1;
    const newCourier = {
      id: newId,
      courierName: courierData.courierName,
      apiKey: courierData.apiKey || null,
      trackingUrlTemplate: courierData.trackingUrlTemplate,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    seedCouriers.push(newCourier);
    return newCourier;
  }

  /**
   * Mock implementation of: CALL sp_update_courier_partner(?, ?, ?)
   */
  async update(id, updates) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_update_courier_partner(?, ?, ?)', [
    //   id,
    //   updates.courierName,
    //   updates.trackingUrlTemplate
    // ]);
    // return rows[0][0] || null;
    // ------------------------------------------------------------------

    const index = seedCouriers.findIndex(c => c.id.toString() === id.toString() && c.isActive);
    if (index === -1) return null;

    seedCouriers[index] = {
      ...seedCouriers[index],
      ...updates
    };

    return seedCouriers[index];
  }

  /**
   * Mock implementation of: CALL sp_soft_delete_courier_partner(?)
   */
  async delete(id) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_soft_delete_courier_partner(?)', [id]);
    // return true; // Success
    // ------------------------------------------------------------------

    const index = seedCouriers.findIndex(c => c.id.toString() === id.toString() && c.isActive);
    if (index === -1) return false;

    seedCouriers[index].isActive = false;
    return true;
  }
}

export default new CourierRepository();
