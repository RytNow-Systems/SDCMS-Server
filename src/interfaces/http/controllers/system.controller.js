import pool from '../../../infrastructure/database/db.js';

/**
 * @desc    Check application health and database connectivity
 * @route   GET /api/v1/system/health
 * @access  Public
 */
export const checkHealth = async (req, res, next) => {
  try {
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
          latency: dbLatency,
          host: process.env.DB_HOST // Helpful for debugging config
        },
        uptime: `${Math.floor(process.uptime())}s`
      }
    });
  } catch (error) {
    // If DB fails, we still return a 500 with success: false
    res.status(500).json({
      success: false,
      error: 'Database connection failed',
      data: {
        status: 'DOWN',
        database: {
          status: 'DISCONNECTED',
          error: error.message
        }
      }
    });
  }
};
