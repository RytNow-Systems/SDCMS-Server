// ============================================================================
// File: src/interfaces/http/routes/dashboard.routes.js
// Description: Defines routes for the Dashboard module.
// Applies authentication and authorization (ADMIN only).
// ============================================================================

import express from 'express';
import { getMetrics, getGraph } from '../controllers/dashboard.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/v1/dashboard/metrics
 * @access  Private/Admin
 */
router.get('/metrics', protect, authorizeRoles('ADMIN'), getMetrics);
router.get('/graph', protect, authorizeRoles('ADMIN'), getGraph);

export default router;
