import asyncHandler from 'express-async-handler';
import authService from '../../../modules/auth/auth.service.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Pass the payload to the service
  const result = await authService.loginUser(email, password);

  // Return HTTP response wrapped in success envelope
  res.json({
    success: true,
    data: result
  });
});


// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by auth.middleware.js. 
  // We extract the identifier (EmployeeCode) which was stored in the token.
  const employeeCode = req.user.EmployeeCode || req.user.employeeCode || req.user.id;

  const profile = await authService.getProfile(employeeCode);

  res.json({
    success: true,
    data: profile
  });
});
