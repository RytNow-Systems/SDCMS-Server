// ============================================================================
// File: src/modules/dashboard/dashboard.repository.js
// Description: Data access layer for Dashboard analytics.
// Uses prc_dashboard_metrics_get for obtaining system-wide metrics.
// ============================================================================

import db from '../../infrastructure/database/db.js';

class DashboardRepository {
  /**
   * Fetches high-level metrics for the admin dashboard.
   * Calls prc_dashboard_metrics_get with pAction=0.
   * 
   * @returns {Promise<Object>} The dashboard metrics data.
   */
  async getMetrics() {
    // ------------------------------------------------------------------
    // Injection Site: Procedure call for analytics
    // ------------------------------------------------------------------
    const [rows] = await db.execute('CALL prc_dashboard_metrics_get(?)', [0]);
    
    // Procedure returns metrics which might be an array or single row depending on SP logic
    return rows[0] || {};
  }
}

export default new DashboardRepository();
