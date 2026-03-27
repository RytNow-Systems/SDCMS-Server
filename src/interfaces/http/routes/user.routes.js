import express from 'express';
import { login, register, getUserProfile } from '../controllers/user.controller.js';
import { protect } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

// Public Routes
router.post('/login', login);
router.post('/register', register);

// Protected Routes (Require Token)
// Notice how we put the 'protect' middleware before the controller function
router.get('/profile', protect, getUserProfile);

export default router;
