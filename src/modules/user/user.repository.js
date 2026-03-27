import db from '../../infrastructure/database/db.js';

// class UserRepository {
  
//   async findByEmail(email) {
//     // Assuming you read from a View or Stored Procedure
//     // Example using a View: 'SELECT * FROM vw_active_users WHERE email = ?'
//     // Example using a Procedure:
//     const [rows] = await db.execute('CALL sp_get_user_by_email(?)', [email]);
    
//     // Procedures usually return an array of arrays: [ [ { id: 1, email: '...' } ], { fieldPackets } ]
//     const user = rows[0][0]; 
//     return user || null;
//   }

//   async findById(id) {
//     const [rows] = await db.execute('CALL sp_get_user_by_id(?)', [id]);
//     const user = rows[0][0];
//     return user || null;
//   }

//   async create(userData) {
//     // We pass the hashed password, name, and email to the procedure
//     // Let's assume the procedure returns the newly created user's ID
//     const [rows] = await db.execute(
//       'CALL sp_register_user(?, ?, ?)', 
//       [userData.name, userData.email, userData.password]
//     );
    
//     // Extract the newly created user data based on what your procedure returns
//     const newUser = rows[0][0]; 
//     return newUser;
//   }
// }



// export default new UserRepository();

// src/modules/user/user.repository.js
import bcrypt from 'bcryptjs';

// 1. Create our in-memory "Database"
let seedUsers = [];

// 2. A quick helper to initialize our seed data when the server starts
const initializeSeedData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt); // Password for both test users is "123456"

  seedUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      is_admin: true,
    },
    {
      id: 2,
      name: 'Test Dispatcher',
      email: 'dispatcher@example.com',
      password: hashedPassword,
      is_admin: false,
    }
  ];
};

// Initialize the data immediately
initializeSeedData();

class InMemoryUserRepository {

  async findByEmail(email) {
    // Search our local array instead of making a SQL query
    const user = seedUsers.find((u) => u.email === email);
    return user || null;
  }

  async findById(id) {
    // Make sure we compare the right types (id from JWT might be a string)
    const user = seedUsers.find((u) => u.id.toString() === id.toString());
    return user || null;
  }

  async create(userData) {
    // Generate a fake ID by finding the highest current ID and adding 1
    const newId = seedUsers.length > 0 ? Math.max(...seedUsers.map(u => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      password: userData.password, // This is already hashed by your user.service.js!
      is_admin: false,
    };

    // "Insert" into our "database"
    seedUsers.push(newUser);

    return newUser;
  }
}

// Export the in-memory version. Your service won't know the difference!
export default new InMemoryUserRepository();