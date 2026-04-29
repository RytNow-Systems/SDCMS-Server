// ============================================================================
// File: src/interfaces/http/controllers/dashboard.controller.js
// Description: Handles HTTP requests for the Dashboard module.
// Envelops data in the standard { success, data } format.
// ============================================================================

import asyncHandler from 'express-async-handler';
import dashboardService from '../../../modules/dashboard/dashboard.service.js';

/**
 * @desc    Get dashboard metrics
 * @route   GET /api/v1/dashboard/metrics
 * @access  Private/Admin
 */
export const getMetrics = asyncHandler(async (req, res) => {
  const metrics = await dashboardService.getMetrics();

  res.json({
    success: true,
    data: metrics
  });
});
