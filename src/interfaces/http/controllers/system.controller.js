import asyncHandler from 'express-async-handler';
import pool from '../../../infrastructure/database/db.js';

/**
 * @desc    Check application health and database connectivity
 * @route   GET /api/v1/system/health
 * @access  Public
 */
export const checkHealth = asyncHandler(async (req, res) => {
  // 1. Perform a simple database ping
  const startTime = Date.now();
  await pool.query('SELECT 1');
  const dbLatency = `${Date.now() - startTime}ms`;

  // 2. Construct health response
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'CONNECTED',
        latency: dbLatency
      },
      uptime: `${Math.floor(process.uptime())}s`
    }
  });
});
