// ============================================================================
// File: src/modules/auth/auth.repository.js
// Description: Data access layer for Authentication and Profile management.
// Follows the Zero Direct DB Access rule using Stored Procedures.
// ============================================================================

import db from '../../infrastructure/database/db.js';

class AuthRepository {
  /**
   * Fetches employee profile details by EmployeeCode.
   * Calls prc_employee_master_get with pAction=1.
   * 
   * @param {string} employeeCode - The unique identifier for the employee.
   * @returns {Promise<Object|null>} The employee profile or null if not found.
   */
  async findById(employeeCode) {
    // ------------------------------------------------------------------
    // Injection Site: DB interaction via Stored Procedure
    // Rule: src/modules/ modules must use prc_... calls.
    // ------------------------------------------------------------------
    const [rows] = await db.execute('CALL prc_employee_master_get(?, ?)', [1, employeeCode]);
    
    // Procedure returns a resultset as the first element of rows
    return rows[0][0] || null;
  }
}

export default new AuthRepository();
