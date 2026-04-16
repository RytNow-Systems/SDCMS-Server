// ============================================================================
// File: src/modules/employee/employee.service.js
// Description: Business logic layer for Employee Management.
// Validates data and connects controllers to the repository.
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from './employee.repository.js';

class EmployeeService {
  
  /**
   * Internal mapper to format DB results for the API layer
   */
  _mapToApi(employee) {
    if (!employee) return null;
    const { name, role, ...rest } = employee;
    return {
      ...rest,
      employeeName: name,
      roleCode: role
    };
  }

  /**
   * Internal mapper to format API payloads for the Repository layer
   */
  _mapToInternal(apiData) {
    const { employeeName, roleCode, ...rest } = apiData;
    const internal = { ...rest };
    if (employeeName) internal.name = employeeName;
    if (roleCode) internal.role = roleCode;
    return internal;
  }

  /**
   * Get all employees (paginated + filtered)
   */
  async getEmployees(queryParams) {
    // Pass query rules (search, limits) to the repository
    const result = await employeeRepository.findAll(queryParams);
    return {
      ...result,
      data: result.data.map(e => this._mapToApi(e))
    };
  }

  /**
   * Get an employee by ID
   */
  async getEmployeeById(id) {
    const employee = await employeeRepository.findById(id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(employee);
  }

  /**
   * Create a new employee
   * Business Rules: Email must be unique. Password must be hashed.
   */
  async createEmployee(employeeData) {
    const internalData = this._mapToInternal(employeeData);

    // 1. Check if email already exists
    const existingEmployee = await employeeRepository.findByEmail(internalData.email);
    if (existingEmployee) {
      const error = new Error('An employee with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(internalData.password, salt);

    // 3. Save via repository
    const newEmployee = await employeeRepository.create({
      ...internalData,
      password: hashedPassword
    });

    return this._mapToApi(newEmployee);
  }

  /**
   * Update an existing employee
   */
  async updateEmployee(id, employeeData) {
    const existingEmployee = await employeeRepository.findById(id);
    if (!existingEmployee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }

    const updates = this._mapToInternal(employeeData);

    // If password is included in updates, hash it
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedEmployee = await employeeRepository.update(id, updates);
    return this._mapToApi(updatedEmployee);
  }

  /**
   * Enable or disable an employee's login access
   */
  async toggleAccess(adminId, employeeIdToToggle, allowLogin) {
    // Business Rule: Admins cannot disable their own account
    if (adminId.toString() === employeeIdToToggle.toString() && allowLogin === false) {
      const error = new Error('Cannot disable your own account');
      error.statusCode = 400;
      throw error;
    }

    const employee = await employeeRepository.patchAccess(employeeIdToToggle, allowLogin);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }

    return this._mapToApi(employee);
  }
}

export default new EmployeeService();
