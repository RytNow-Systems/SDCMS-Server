// ============================================================================
// File: src/modules/auth/auth.service.js
// Description: Unifies authentication logic (Login) using the centralized 
// Employee Repository, removing the legacy duplicate User dependency.
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from '../employee/employee.repository.js';
import generateToken from '../../shared/utils/generateToken.js';

class AuthService {
  /**
   * Orchestrates the login flow by validating credentials and generating a JWT.
   * 
   * @param {string} email - User's login email.
   * @param {string} password - User's plain-text password.
   * @returns {Promise<Object>} Object containing profile data and token.
   */
  async loginUser(email, password) {
    const employee = await employeeRepository.findByEmail(email);
    
    // Compare the raw password with the hashed password.
    // Dual-case access: mock seed uses PascalCase (Password), live DB may use camelCase.
    const storedPassword = employee?.Password || employee?.password;

    if (employee && storedPassword && (await bcrypt.compare(password, storedPassword))) {
      
      // Enforce the Toggle-Access restriction
      const canLogin = employee.AllowLogin ?? employee.allowLogin;
      if (canLogin === false) {
        const error = new Error('Your account has been locked. Contact your Admin.');
        error.statusCode = 403;
        throw error;
      }

      const empCode = employee.EmployeeCode || employee.employeeCode;

      return {
        id: empCode,
        employeeCode: empCode,
        name: employee.FullName || employee.name,
        // prc_authenticate_employee returns 'UserName' as the email identifier.
        email: employee.UserName || employee.EmailAddress || employee.email,
        role: employee.RoleCode || employee.role,
        token: generateToken(empCode), // Using employeeCode as identifier in JWT
      };
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
  }

  /**
   * Internal mapper to standardize Profile queries to the camelCase API contract.
   * Leverages Employee schema properties.
   */
  _mapToApi(profile) {
    if (!profile) return null;
    return {
      employeeCode: profile.EmployeeCode || profile.employeeCode,
      firstName: profile.FullName || profile.name || profile.firstName,
      email: profile.EmailAddress || profile.email,
      phoneNo: profile.ContactNumber || profile.contactNumber || null,
      roleCode: profile.RoleCode || profile.role,
      allowLogin: profile.AllowLogin !== undefined ? profile.AllowLogin : profile.allowLogin,
      createdAt: profile.CreatedDate || profile.createdAt
    };
  }

  /**
   * Retrieves fresh profile data from the database.
   * Ensures the data is up-to-date even if the JWT is old.
   * 
   * @param {string} employeeCode - The unique identifier from the JWT.
   * @returns {Promise<Object>} The employee profile data.
   */
  async getProfile(employeeCode) {
    const profile = await employeeRepository.findById(employeeCode);
    
    if (!profile) {
      const error = new Error('Employee profile not found');
      error.statusCode = 404;
      throw error;
    }

    return this._mapToApi(profile);
  }
}

export default new AuthService();
