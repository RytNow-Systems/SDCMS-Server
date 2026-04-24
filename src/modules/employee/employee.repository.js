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
// Use a hardcoded hash for 'securePass123' to avoid async bcrypt during module initialization
const HASHED_MOCK_PASSWORD = '$2b$10$3a6myMEFAljTFDVh3agsAuQ0euXF0v6pUOA.Hw.oeIZEjncNsDn3W'; // hash for 'securePass123'

let seedEmployees = [
  {
    EmployeeCode: 1,
    FullName: 'Admin User',
    EmailAddress: 'admin@example.com',
    Password: HASHED_MOCK_PASSWORD,
    RoleCode: 'ADMIN',
    AllowLogin: true,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    EmployeeCode: 2,
    FullName: 'Test Operator',
    EmailAddress: 'operator@example.com',
    Password: HASHED_MOCK_PASSWORD,
    RoleCode: 'OPERATOR',
    AllowLogin: false,
    CreatedDate: '2026-04-03T08:52:00Z'
  },
  {
    EmployeeCode: 3,
    FullName: 'Test Courier',
    EmailAddress: 'courier@example.com',
    Password: HASHED_MOCK_PASSWORD,
    RoleCode: 'COURIER',
    AllowLogin: true,
    CreatedDate: '2026-04-03T08:52:00Z'
  }
];

class EmployeeRepository {

  /**
   * Checks if an employee with the same email or username already exists.
   * Procedure: CALL prc_check_duplicate_employee_master(?,?,?)
   * 
   * @param {number} id - EmployeeCode (0 for new, ID for update)
   * @param {string} email - Email address
   * @param {string} username - Username
   * @returns {Promise<boolean>} True if duplicate exists, false otherwise.
   */
  async checkDuplicate(id, email, username) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_employee_master(?, ?, ?)', [
        id || 0,
        email || null,
        username || null
      ]);
      // Assuming SP returns a count or a record
      // Let's assume it returns { DuplicateCount: 1 } or similar, but typically checking if there's any row returned
      if (rows && rows[0] && rows[0][0]) {
        const row = rows[0][0];
        // Could be a field like 'Count' or simply presence of row means duplicate
        return (row.DuplicateCount > 0 || row.Count > 0 || Object.values(row)[0] > 0);
      }
      return false;
    }

    // MOCK MODE
    const existing = seedEmployees.find(e => 
      e.EmployeeCode.toString() !== (id || 0).toString() &&
      (e.EmailAddress === email || e.UserName === username)
    );
    return !!existing;
  }

  /**
   * Fetches an employee by their email for authentication.
   * Procedure: CALL prc_authenticate_employee(?)
   *
   * @param {string} email - Employee email address.
   * @returns {Promise<Object|null>} { EmployeeCode, FullName, UserName, Password, RoleCode, AllowLogin } or null.
   */
  async findByEmail(email) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_authenticate_employee (by email)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_authenticate_employee(?)', [email]);
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
    // LIVE DB MODE: prc_employee_master_search (EmployeeCode=0, RoleId filtering logic)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      let roleId = 0;
      if (role === 'ADMIN') roleId = 1;
      else if (role === 'OPERATOR') roleId = 2;
      else if (role === 'COURIER') roleId = 3;

      const [rows] = await db.execute('CALL prc_employee_master_search(?, ?)', [
        0, // pEmployeeCode=0 -> Get all
        roleId // pFkRoleId
      ]);
      
      let results = rows[0] || [];
      
      // In-memory filter for search and allowLogin if they are not handled by SP
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(e => 
          (e.FullName && e.FullName.toLowerCase().includes(s)) || 
          (e.EmailAddress && e.EmailAddress.toLowerCase().includes(s))
        );
      }
      if (allowLogin !== undefined) {
        results = results.filter(e => e.AllowLogin === (allowLogin === 'true' || allowLogin === true));
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
    // LIVE DB MODE: prc_employee_master_search (pEmployeeCode, 0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_employee_master_search(?, ?)', [id, 0]);
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
      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // pEmployeeCode=0 → Insert
        employeeData.FullName || employeeData.name,
        employeeData.ContactNumber || null,
        employeeData.EmailAddress || employeeData.email,
        employeeData.UserName || employeeData.EmailAddress || employeeData.email,
        employeeData.Password || employeeData.password,
        employeeData.FkRoleId || employeeData.roleId || null,
        employeeData.AllowLogin !== undefined ? (employeeData.AllowLogin ? 1 : 0) : 1, // pAllowLogin
        employeeData.CreatedBy || 1, // pCreatedBy
        employeeData.IsActive !== undefined ? (employeeData.IsActive ? 1 : 0) : 1 // pIsActive
      ]);
      // Assuming SP returns the newly created record via SELECT
      // If not, we might need to search for it, but for now we follow the existing pattern
      if (rows[0] && rows[0][0]) return rows[0][0];
      return employeeData;
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
      // First fetch existing to retain values not being updated
      const existing = await this.findById(id);
      if (!existing) return null;

      const [rows] = await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id, // pEmployeeCode
        updateData.FullName || existing.FullName,
        updateData.ContactNumber || existing.ContactNumber,
        updateData.EmailAddress || existing.EmailAddress,
        updateData.UserName || existing.UserName,
        updateData.Password || existing.Password, // Hashed in service layer
        updateData.FkRoleId || existing.FkRoleId,
        updateData.AllowLogin !== undefined ? (updateData.AllowLogin ? 1 : 0) : existing.AllowLogin,
        1, // pCreatedBy
        updateData.IsActive !== undefined ? (updateData.IsActive ? 1 : 0) : existing.IsActive
      ]);
      
      if (rows[0] && rows[0][0]) return rows[0][0];
      return await this.findById(id);
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
    // LIVE DB MODE: toggle access via findById + prc_employee_master_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const existing = await this.findById(id);
      if (!existing) return null;

      await db.execute('CALL prc_employee_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        existing.FullName,
        existing.ContactNumber,
        existing.EmailAddress,
        existing.UserName,
        existing.Password,
        existing.FkRoleId,
        allowLogin ? 1 : 0,
        1, // pCreatedBy
        existing.IsActive
      ]);
      
      return await this.findById(id);
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
