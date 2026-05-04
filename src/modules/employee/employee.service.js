// ============================================================================
// File: src/modules/employee/employee.service.js
// Description: Business logic layer for Employee Management.
// Validates data and connects controllers to the repository.
//
// Dual-Mode Mapping: Handles both mock field names and DB column names.
//   - Mock:  { FullName, EmailAddress, RoleCode, AllowLogin, EmployeeCode }
//   - DB SP: { FullName, EmailAddress, RoleCode, AllowLogin, EmployeeCode }
//   - API:   { employeeName, email, roleCode, allowLogin, employeeCode }
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from './employee.repository.js';

class EmployeeService {

  /**
   * Internal mapper to format DB/mock results for the API layer.
   * Handles both DB column names and legacy mock field names gracefully.
   *
   * @param {object} employee - Raw employee record from repository.
   * @returns {object|null} API-formatted employee object.
   */
  _mapToApi(employee) {
    if (!employee) return null;
    return {
      employeeCode: employee.EmployeeCode || employee.employeeCode,
      name: employee.FullName || employee.name,
      email: employee.EmailAddress || employee.email,
      phoneNo: employee.ContactNumber || employee.contactNumber || null,
      role: employee.RoleCode || employee.role,
      allowLogin: employee.AllowLogin ?? employee.allowLogin,
      isActive: (employee.IsActive ?? employee.isActive) == true,
      createdAt: employee.CreatedDate || employee.createdAt
    };
  }

  /**
   * Internal mapper to format API payloads for the Repository layer.
   * Translates API field names to DB-native column names.
   *
   * @param {object} apiData - API payload.
   * @returns {object} Repository-formatted object.
   */
  _mapToInternal(apiData) {
    const internal = {};
    if (apiData.name) internal.FullName = apiData.name;
    if (apiData.email) internal.EmailAddress = apiData.email;
    if (apiData.password) internal.Password = apiData.password;
    if (apiData.role) internal.RoleCode = apiData.role;
    if (apiData.phoneNo) internal.ContactNumber = apiData.phoneNo;
    if (apiData.allowLogin !== undefined) internal.AllowLogin = apiData.allowLogin;
    if (apiData.isActive !== undefined) internal.IsActive = apiData.isActive;
    
    // Map role string to DB FkRoleId
    if (apiData.role) {
      const roleMap = { 'ADMIN': 1, 'OPERATOR': 2, 'COURIER': 3 };
      internal.FkRoleId = roleMap[apiData.role];
    }
    
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
    const isDuplicate = await employeeRepository.checkDuplicate(
      0, 
      internalData.EmailAddress || internalData.email, 
      internalData.UserName || internalData.EmailAddress || internalData.email
    );
    if (isDuplicate) {
      const error = new Error('An employee with this email or username already exists');
      error.statusCode = 409;
      throw error;
    }

    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(internalData.Password || internalData.password, salt);

    // 3. Save via repository
    const newEmployee = await employeeRepository.create({
      ...internalData,
      Password: hashedPassword
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

    // Check for duplicate email/username
    if (updates.EmailAddress || updates.UserName) {
      const isDuplicate = await employeeRepository.checkDuplicate(
        id, 
        updates.EmailAddress || existingEmployee.EmailAddress, 
        updates.UserName || existingEmployee.UserName
      );
      if (isDuplicate) {
        const error = new Error('An employee with this email or username already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    // If password is included in updates, hash it
    if (updates.Password) {
      const salt = await bcrypt.genSalt(10);
      updates.Password = await bcrypt.hash(updates.Password, salt);
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

  /**
   * Delete an employee (soft delete)
   */
  async deleteEmployee(adminId, employeeIdToDelete) {
    // Business Rule: Admins cannot delete their own account
    if (adminId.toString() === employeeIdToDelete.toString()) {
      const error = new Error('Cannot delete your own account');
      error.statusCode = 400;
      throw error;
    }

    const employee = await employeeRepository.delete(employeeIdToDelete);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }

    return this._mapToApi(employee);
  }
}

export default new EmployeeService();
