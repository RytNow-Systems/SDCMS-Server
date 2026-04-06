import authService from '../../../modules/auth/auth.service.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Pass the payload to the service
    const result = await authService.loginUser(email, password);

    // Return HTTP response wrapped in success envelope
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    // If the service throws an error (e.g., "Invalid credentials"), pass it to error middleware
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
      success: true,
      data: {
        id: req.user.id,
        employeeCode: req.user.employeeCode || `EMP00${req.user.id}`, // Mock or from DB
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      }
    });
  } catch (error) {
    next(error);
  }
};
