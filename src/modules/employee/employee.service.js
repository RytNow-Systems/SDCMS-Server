// ============================================================================
// File: src/modules/employee/employee.service.js
// Description: Business logic layer for Employee Management.
// Validates data and connects controllers to the repository.
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from './employee.repository.js';

class EmployeeService {
  
  /**
   * Get all employees (paginated + filtered)
   */
  async getEmployees(queryParams) {
    // Pass query rules (search, limits) to the repository
    return await employeeRepository.findAll(queryParams);
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
    return employee;
  }

  /**
   * Create a new employee
   * Business Rules: Email must be unique. Password must be hashed.
   */
  async createEmployee(employeeData) {
    // 1. Check if email already exists
    const existingEmployee = await employeeRepository.findByEmail(employeeData.email);
    if (existingEmployee) {
      const error = new Error('An employee with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employeeData.password, salt);

    // 3. Save via repository
    return await employeeRepository.create({
      ...employeeData,
      password: hashedPassword
    });
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

    const updates = { ...employeeData };

    // If password is included in updates, hash it
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    return await employeeRepository.update(id, updates);
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

    return employee;
  }
}

export default new EmployeeService();
