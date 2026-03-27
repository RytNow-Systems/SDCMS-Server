import userService from '../../../modules/user/user.service.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Pass the payload to the service
    const result = await userService.loginUser(email, password);
    
    // Return HTTP response
    res.json(result);
  } catch (error) {
    // If the service throws an error (e.g., "Invalid credentials"), pass it to error middleware
    next(error); 
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Example of a Protected Route Controller
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    // req.user is set by your auth.middleware.js!
    // Simply return it.
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      is_admin: req.user.is_admin,
    });
  } catch (error) {
    next(error);
  }
};
