// ============================================================================
// File: src/modules/sender/sender.repository.js
// Description: Data access layer for Senders (Parties), using stored procedures.
// ============================================================================

import db from '../../infrastructure/database/db.js';

class SenderRepository {
  /**
   * Upsert a sender (Create or Update).
   * Procedure: CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   * 
   * @param {number} pPartyId - 0 for Insert, >0 for Update
   * @param {object} pData - Sender details
   * @param {number} pIsActive - 1 for Active, 0 for Soft-Delete
   * @param {string} pCreatedBy - EmployeeCode or username
   * @returns {Promise<object>} The operation result.
   */
  async upsert(pPartyId, pData, pIsActive = 1, pCreatedBy = 'SYSTEM') {
    const [rows] = await db.execute(
      'CALL prc_Party_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        pPartyId,
        1, // pPartyTypeId: 1 = Sender
        pData.customerName || null,
        pData.phoneNo || null,
        pData.emailId || null,
        pData.addressLine1 || null,
        pData.addressLine2 || null,
        pData.city || null,
        pData.state || null,
        pData.pincode || null,
        pCreatedBy,
        pIsActive
      ]
    );
    return rows[0][0];
  }

  /**
   * Get all active senders.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * 
   * @returns {Promise<Array>} List of senders.
   */
  async findAll() {
    const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [0, 0, null]);
    return rows[0];
  }

  /**
   * Get specific sender by ID.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * 
   * @param {number} id - Party ID
   * @returns {Promise<object|null>} Sender record or null.
   */
  async findById(id) {
    const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [1, id, null]);
    return rows[0][0] || null;
  }

  /**
   * Lookup sender by phone number.
   * Procedure: CALL prc_Party_master_get(?, ?, ?)
   * 
   * @param {string} phone - Phone number
   * @returns {Promise<object|null>} Sender record or null.
   */
  async findByPhone(phone) {
    const [rows] = await db.execute('CALL prc_Party_master_get(?, ?, ?)', [2, 0, phone]);
    return rows[0][0] || null;
  }
}

export default new SenderRepository();
