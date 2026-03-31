import bcrypt from 'bcryptjs';
import userRepository from './user.repository.js';
import generateToken from '../../shared/utils/generateToken.js';

class UserService {
  async loginUser(email, password) {
    const user = await userRepository.findByEmail(email);
    
    // Compare the raw password with the hashed password from the MySQL database
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id, // MySQL usually uses 'id' instead of Mongoose's '_id'
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      };
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
  }

  async registerUser(userData) {
    // 1. Check if user already exists
    const userExists = await userRepository.findByEmail(userData.email);
    if (userExists) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 3. Create the user via the Repository (Stored Procedure)
    const newUser = await userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    if (newUser) {
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser.id),
      };
    } else {
      const error = new Error('Invalid user data');
      error.statusCode = 400;
      throw error;
    }
  }
}

export default new UserService();
