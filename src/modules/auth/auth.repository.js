// ============================================================================
// File: src/modules/auth/auth.repository.js
// Description: Data access layer for Authentication and Profile management.
// Follows the Zero Direct DB Access rule using Stored Procedures.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention: prc_employee_master_get (pAction=1, by EmployeeCode)
// ============================================================================

import db from '../../infrastructure/database/db.js';
import bcrypt from 'bcryptjs';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let mockEmployees = [];

const initializeMockData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('securePass123', salt);

  mockEmployees = [
    {
      EmployeeCode: 1,
      FullName: 'Admin User',
      EmailAddress: 'admin@example.com',
      Password: hashedPassword,
      RoleCode: 'ADMIN',
      AllowLogin: true,
      CreatedDate: '2026-04-03T08:52:00Z'
    },
    {
      EmployeeCode: 2,
      FullName: 'Test Operator',
      EmailAddress: 'operator@example.com',
      Password: hashedPassword,
      RoleCode: 'OPERATOR',
      AllowLogin: true,
      CreatedDate: '2026-04-03T08:52:00Z'
    }
  ];
};

initializeMockData();

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
    // LIVE DB MODE: prc_employee_master_get (pAction=1)
    // Injection Site: DB interaction via Stored Procedure
    // Rule: src/modules/ modules must use prc_... calls.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_get(?, ?)', [1, employeeCode]);

      // Procedure returns a resultset as the first element of rows
      return rows[0][0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by EmployeeCode
    // ------------------------------------------------------------------
    const emp = mockEmployees.find((e) => e.EmployeeCode.toString() === employeeCode.toString());
    return emp || null;
  }
}

export default new AuthRepository();
