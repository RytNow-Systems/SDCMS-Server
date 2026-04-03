// ============================================================================
// File: src/modules/auth/auth.service.js
// Description: Unifies authentication logic (Login) using the centralized 
// Employee Repository, removing the legacy duplicate User dependency.
// ============================================================================

import bcrypt from 'bcryptjs';
import employeeRepository from '../employee/employee.repository.js';
import generateToken from '../../shared/utils/generateToken.js';

class AuthService {
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
        token: generateToken(employee.id),
      };
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
  }

  // Registration logic has been entirely removed from Auth per Sprint 1 rules.
  // Admins must create users via the POST /employees endpoint.
}

export default new AuthService();
