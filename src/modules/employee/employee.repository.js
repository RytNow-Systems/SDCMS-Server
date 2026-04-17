// ============================================================================
// File: src/modules/employee/employee.repository.js
// Description: Data access layer for Employee Management.
// Handles interactions with the 'employee_master' table.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_employee_master_get (pAction=0 list, pAction=1 specific)
//   - Upserts: prc_employee_master_set (EmployeeCode=0 insert, >0 update)
// ============================================================================

import db from '../../infrastructure/database/db.js';
import bcrypt from 'bcryptjs';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let seedEmployees = [];

const initializeSeedData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('securePass123', salt);

  seedEmployees = [
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
      AllowLogin: false,
      CreatedDate: '2026-04-03T08:52:00Z'
    }
  ];
};

initializeSeedData();

class EmployeeRepository {

  /**
   * Fetches an employee by their email (used for login and duplicate checks).
   * Procedure: CALL prc_employee_master_get(?, ?)
   * Convention: pAction=1, pass email to find specific employee by email.
   *
   * @param {string} email - Employee email address.
   * @returns {Promise<Object|null>} Employee record or null if not found.
   */
  async findByEmail(email) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_get (pAction=1, by email)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_get(?, ?)', [1, email]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by email
    // ------------------------------------------------------------------
    const emp = seedEmployees.find((e) => e.EmailAddress === email);
    return emp || null;
  }

  /**
   * Fetches a paginated list of employees with optional filtering.
   * Procedure: CALL prc_employee_master_get(?, ?, ?, ?, ?)
   * Convention: pAction=0, paginated list with optional search/role/allowLogin filters.
   *
   * @param {object} params - { page, limit, search, role, allowLogin }
   * @returns {Promise<object>} { data: [...], meta: { page, limit, totalRows, totalPages } }
   */
  async findAll({ page = 1, limit = 20, search, role, allowLogin }) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_get (pAction=0, paginated)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_get(?, ?, ?, ?, ?)', [
        0, // pAction=0 → Get all employees (paginated)
        page,
        limit,
        search || null,
        role || null
      ]);
      return {
        data: rows[0],
        meta: rows[1]?.[0] || { page, limit, totalRows: 0, totalPages: 0 }
      };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering and pagination
    // ------------------------------------------------------------------
    let results = [...seedEmployees];

    if (role) results = results.filter(e => e.RoleCode === role);
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(e => e.FullName.toLowerCase().includes(s) || e.EmailAddress.toLowerCase().includes(s));
    }
    if (allowLogin !== undefined) {
      results = results.filter(e => e.AllowLogin === (allowLogin === 'true' || allowLogin === true));
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedItems = results.slice(startIndex, startIndex + limit);

    return {
      data: paginatedItems,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalRows: results.length,
        totalPages: Math.ceil(results.length / limit)
      }
    };
  }

  /**
   * Fetches an employee by their EmployeeCode.
   * Procedure: CALL prc_employee_master_get(?, ?)
   * Convention: pAction=1, pass EmployeeCode.
   *
   * @param {number|string} id - EmployeeCode.
   * @returns {Promise<Object|null>} Employee record or null.
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_get (pAction=1, by EmployeeCode)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_get(?, ?)', [1, id]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by EmployeeCode
    // ------------------------------------------------------------------
    const emp = seedEmployees.find((e) => e.EmployeeCode.toString() === id.toString());
    return emp || null;
  }

  /**
   * Creates a new employee record.
   * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: EmployeeCode=0 triggers insert. No pAction on _set calls.
   *
   * @param {object} employeeData - { FullName, EmailAddress, Password, RoleCode, ... }
   * @returns {Promise<object>} The newly created employee record.
   */
  async create(employeeData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_set (EmployeeCode=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // EmployeeCode=0 → Insert new employee
        employeeData.FullName || employeeData.name,
        employeeData.ContactNumber || null,
        employeeData.EmailAddress || employeeData.email,
        employeeData.UserName || employeeData.EmailAddress || employeeData.email,
        employeeData.Password || employeeData.password,
        employeeData.FkRoleId || employeeData.roleId || null,
        employeeData.AllowLogin !== undefined ? employeeData.AllowLogin : 1
      ]);
      return rows[0]?.[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory push
    // ------------------------------------------------------------------
    const newId = seedEmployees.length > 0 ? Math.max(...seedEmployees.map(e => e.EmployeeCode)) + 1 : 1;

    const newEmployee = {
      EmployeeCode: newId,
      FullName: employeeData.FullName || employeeData.name,
      EmailAddress: employeeData.EmailAddress || employeeData.email,
      Password: employeeData.Password || employeeData.password,
      RoleCode: employeeData.RoleCode || employeeData.role,
      AllowLogin: true,
      CreatedDate: new Date().toISOString()
    };

    seedEmployees.push(newEmployee);
    return newEmployee;
  }

  /**
   * Updates an employee record entirely.
   * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: EmployeeCode>0 triggers update. No pAction on _set calls.
   *
   * @param {number|string} id - EmployeeCode.
   * @param {object} updateData - Fields to update.
   * @returns {Promise<object|null>} Updated employee record or null.
   */
  async update(id, updateData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_set (EmployeeCode>0 → Update)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
        id, // EmployeeCode>0 → Update existing employee
        updateData.FullName || updateData.name || null,
        updateData.ContactNumber || null,
        updateData.EmailAddress || updateData.email || null,
        updateData.UserName || null,
        updateData.Password || updateData.password || null,
        updateData.FkRoleId || updateData.roleId || null,
        updateData.AllowLogin !== undefined ? updateData.AllowLogin : null
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory update
    // ------------------------------------------------------------------
    const index = seedEmployees.findIndex((e) => e.EmployeeCode.toString() === id.toString());
    if (index === -1) return null;

    seedEmployees[index] = { ...seedEmployees[index], ...updateData };
    return seedEmployees[index];
  }

  /**
   * Toggles login access for an employee.
   * Procedure: CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: EmployeeCode>0 with AllowLogin flag. No pAction on _set calls.
   *
   * @param {number|string} id - EmployeeCode.
   * @param {boolean} allowLogin - New access state.
   * @returns {Promise<object|null>} Updated employee record or null.
   */
  async patchAccess(id, allowLogin) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_employee_master_set (update AllowLogin only)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        null, // FullName — no change
        null, // ContactNumber — no change
        null, // EmailAddress — no change
        null, // UserName — no change
        null, // Password — no change
        null, // FkRoleId — no change
        allowLogin ? 1 : 0
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory toggle
    // ------------------------------------------------------------------
    const index = seedEmployees.findIndex((e) => e.EmployeeCode.toString() === id.toString());
    if (index === -1) return null;

    seedEmployees[index].AllowLogin = allowLogin;
    return seedEmployees[index];
  }
}

export default new EmployeeRepository();
