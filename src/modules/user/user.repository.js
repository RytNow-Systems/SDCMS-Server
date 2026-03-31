import db from '../../infrastructure/database/db.js';

import bcrypt from 'bcryptjs';

// In-Memory Seed Data Fallback per stakeholder request
let seedUsers = [];

const initializeSeedData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);

  seedUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Test Operator',
      email: 'operator@example.com',
      password: hashedPassword,
      role: 'OPERATOR',
    },
    {
      id: 3,
      name: 'Courier Staff',
      email: 'courier@example.com',
      password: hashedPassword,
      role: 'COURIER',
    }
  ];
};

initializeSeedData();

class UserRepository {
  
  async findByEmail(email) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_get_user_by_email(?)', [email]);
    // const user = rows[0][0]; return user || null;
    // ------------------------------------------------------------------
    
    console.log(`[Repository Mock] Finding user by email: ${email}`);
    const user = seedUsers.find((u) => u.email === email);
    return user || null;
  }

  async findById(id) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_get_user_by_id(?)', [id]);
    // const user = rows[0][0]; return user || null;
    // ------------------------------------------------------------------

    const user = seedUsers.find((u) => u.id.toString() === id.toString());
    return user || null;
  }

  async create(userData) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_register_user(?, ?, ?)', [userData.name, userData.email, userData.password]);
    // const newUser = rows[0][0]; return newUser;
    // ------------------------------------------------------------------

    const newId = seedUsers.length > 0 ? Math.max(...seedUsers.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'CUSTOMER', // Default role for open registrations
    };

    seedUsers.push(newUser);
    return newUser;
  }
}

export default new UserRepository();