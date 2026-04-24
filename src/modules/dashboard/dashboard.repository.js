// ============================================================================
// File: src/modules/dashboard/dashboard.repository.js
// Description: Data access layer for Dashboard analytics.
// Uses prc_dashboard_metrics_get for obtaining system-wide metrics.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention: prc_dashboard_metrics_get (pAction=0)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Realistic dashboard metrics for frontend development without a live database.
// ============================================================================
const mockMetrics = {
  TotalOrders: 150,
  PendingOrders: 45,
  DispatchedOrders: 80,
  DeliveredOrders: 25
};

class DashboardRepository {
  /**
   * Fetches high-level metrics for the admin dashboard.
   * Calls prc_dashboard_metrics_get with pAction=0.
   *
   * @returns {Promise<Object>} The dashboard metrics data.
   */
  async getMetrics() {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_dashboard_metrics_get (pAction=0)
    // Injection Site: Procedure call for analytics
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_dashboard_metrics_get(?)', [0]);

      // Procedure returns a result set containing TotalOrders, PendingOrders, etc.
      return (Array.isArray(rows) && rows[0]) ? (Array.isArray(rows[0]) ? rows[0][0] : rows[0]) : {};
    }

    // ------------------------------------------------------------------
    // MOCK MODE: Return static mock metrics
    // ------------------------------------------------------------------
    return mockMetrics;
  }
}

export default new DashboardRepository();
