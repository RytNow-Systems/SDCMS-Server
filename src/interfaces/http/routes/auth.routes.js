import express from 'express';
import { login, getUserProfile } from '../controllers/auth.controller.js';
import { protect } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { loginSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// Public Routes
router.post('/login', validate(loginSchema), login);

// Protected Routes (Require Token)
// Notice how we put the 'protect' middleware before the controller function
router.get('/profile', protect, getUserProfile);

export default router;
