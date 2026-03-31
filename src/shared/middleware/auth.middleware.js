import jwt from 'jsonwebtoken';
import userRepository from '../../modules/user/user.repository.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch user from MySQL via the Repository (excluding password)
      // Make sure your sp_get_user_by_id doesn't return the password!
      const user = await userRepository.findById(decoded.id);

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // 5. Attach user to the request object
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

// Flexible Role-Based Access Control (RBAC)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // Forbidden
      return next(new Error(`User role '${req.user ? req.user.role : 'GUEST'}' is not authorized for this route`));
    }
    next();
  };
};

