// ============================================================================
// File: src/interfaces/http/controllers/dashboard.controller.js
// Description: Handles HTTP requests for the Dashboard module.
// Envelops data in the standard { success, data } format.
// ============================================================================

import asyncHandler from 'express-async-handler';
import dashboardService from '../../../modules/dashboard/dashboard.service.js';

/**
 * @desc    Get dashboard metrics for a time period
 * @route   GET /api/v1/dashboard/metrics?period=monthly
 * @access  Private/Admin
 */
export const getMetrics = asyncHandler(async (req, res) => {
  const { period = 'overall', from = null, to = null } = req.query;
  const metrics = await dashboardService.getMetrics(period, from, to);

  res.json({
    success: true,
    data: metrics
  });
});

/**
 * @desc    Get monthly order counts for the orders-over-time graph
 * @route   GET /api/v1/dashboard/graph?year=2025
 * @access  Private/Admin
 */
export const getGraph = asyncHandler(async (req, res) => {
  const year = req.query.year ? parseInt(req.query.year, 10) : null;
  const data = await dashboardService.getGraph(year);

  res.json({
    success: true,
    data
  });
});
