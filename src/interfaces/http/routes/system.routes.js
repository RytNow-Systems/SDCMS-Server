import express from 'express';
import { checkHealth } from '../controllers/system.controller.js';

const router = express.Router();

/**
 * @route   GET /api/v1/system/health
 * @desc    Check application health
 */
router.get('/health', checkHealth);

export default router;
