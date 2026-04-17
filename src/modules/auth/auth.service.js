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
   * Orchestrates the login flow.
   */
  async loginUser(email, password) {
    const employee = await employeeRepository.findByEmail(email);
    
    // Compare the raw password with the hashed password
    if (employee && (await bcrypt.compare(password, employee.password))) {
      
      // Enforce the Toggle-Access restriction
      if (employee.allowLogin === false) {
        const error = new Error('Your account has been locked. Contact your Admin.');
        error.statusCode = 403;
        throw error;
      }

      return {
        id: employee.id,
        employeeCode: employee.employeeCode,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        token: generateToken(employee.employeeCode), // Using employeeCode as identifier in JWT
      };
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
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

    return profile;
  }
}

export default new AuthService();
