// ============================================================================
// File: src/modules/employee/employee.repository.js
// Description: Data access layer for Employee Management.
// Handles interactions with the 'employee_master' table.
// ============================================================================

import db from '../../infrastructure/database/db.js';
import bcrypt from 'bcryptjs';

// In-Memory Seed Data Fallback per stakeholder request
let seedEmployees = [];

const initializeSeedData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('securePass123', salt);

  seedEmployees = [
    {
      id: 1,
      employeeCode: 'EMP001',
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      allowLogin: true,
      createdAt: '2026-04-03T08:52:00Z'
    },
    {
      id: 2,
      employeeCode: 'EMP002',
      name: 'Test Operator',
      email: 'operator@example.com',
      password: hashedPassword,
      role: 'OPERATOR',
      allowLogin: false,
      createdAt: '2026-04-03T08:52:00Z'
    }
  ];
};

initializeSeedData();

class EmployeeRepository {
  
  /**
   * Fetches an employee by their email to check for duplicates
   */
  async findByEmail(email) {
    // ------------------------------------------------------------------
    // Future Implementation (Procedure Integration)
    // const [rows] = await db.execute('CALL sp_get_employee_by_email(?)', [email]);
    // return rows[0][0] || null;
    // ------------------------------------------------------------------
    
    console.log(`[Employee Repository Mock] Finding employee by email: ${email}`);
    const emp = seedEmployees.find((e) => e.email === email);
    return emp || null;
  }

  /**
   * Fetches a paginated list of employees with optional filtering
   */
  async findAll({ page = 1, limit = 20, search, role, allowLogin }) {
    // ------------------------------------------------------------------
    // Future Implementation (Procedure Integration)
    // const [rows] = await db.execute('CALL sp_get_all_employees(?, ?, ?, ?, ?)', [page, limit, search, role, allowLogin]);
    // // Procedure should return a resultset with data, and optionally an OUT param or separate result for total counts.
    // return { data: rows[0], meta: rows[1][0] };
    // ------------------------------------------------------------------
    
    let results = [...seedEmployees];

    if (role) results = results.filter(e => e.role === role);
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(s) || e.email.toLowerCase().includes(s));
    }
    if (allowLogin !== undefined) {
      results = results.filter(e => e.allowLogin === (allowLogin === 'true' || allowLogin === true));
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
   * Fetches an employee by their ID
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // Future Implementation (Procedure Integration)
    // const [rows] = await db.execute('CALL sp_get_employee_by_id(?)', [id]);
    // return rows[0][0] || null;
    // ------------------------------------------------------------------

    const emp = seedEmployees.find((e) => e.id.toString() === id.toString());
    return emp || null;
  }

  /**
   * Creates a new employee record
   */
  async create(employeeData) {
    // ------------------------------------------------------------------
    // Future Implementation (Procedure Integration)
    // const [rows] = await db.execute('CALL sp_create_employee(?, ?, ?, ?)', 
    //   [employeeData.name, employeeData.email, employeeData.password, employeeData.role]
    // );
    // return rows[0][0]; // Returns the newly created employee
    // ------------------------------------------------------------------

    const newId = seedEmployees.length > 0 ? Math.max(...seedEmployees.map(e => e.id)) + 1 : 1;
    const employeeCode = `EMP00${newId}`;
    
    const newEmployee = {
      id: newId,
      employeeCode,
      name: employeeData.name,
      email: employeeData.email,
      password: employeeData.password, // This is already hashed by the service
      role: employeeData.role,
      allowLogin: true,
      createdAt: new Date().toISOString()
    };

    seedEmployees.push(newEmployee);
    return newEmployee;
  }

  /**
   * Updates an employee record entirely
   */
  async update(id, updateData) {
    // ------------------------------------------------------------------
    // Future Implementation (Procedure Integration)
    // const [rows] = await db.execute('CALL sp_update_employee(?, ?, ?, ?, ?)', 
    //   [id, updateData.name, updateData.email, updateData.password, updateData.role]
    // );
    // return rows[0][0];
    // ------------------------------------------------------------------

    const index = seedEmployees.findIndex((e) => e.id.toString() === id.toString());
    if (index === -1) return null;

    seedEmployees[index] = { ...seedEmployees[index], ...updateData };
    return seedEmployees[index];
  }

  /**
   * Toggles login access for an employee
   */
  async patchAccess(id, allowLogin) {
    // ------------------------------------------------------------------
    // Future Implementation (Procedure Integration)
    // const [rows] = await db.execute('CALL sp_toggle_employee_access(?, ?)', [id, allowLogin]);
    // return rows[0][0];
    // ------------------------------------------------------------------

    const index = seedEmployees.findIndex((e) => e.id.toString() === id.toString());
    if (index === -1) return null;

    seedEmployees[index].allowLogin = allowLogin;
    return seedEmployees[index];
  }
}

export default new EmployeeRepository();
