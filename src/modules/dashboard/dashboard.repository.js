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
  totalOrders: 42,
  totalParcels: 58,
  totalSenders: 15,
  totalReceivers: 53,
  parcelsByStatus: {
    PENDING: 8,
    LABEL_PRINTED: 12,
    AWB_LINKED: 5,
    DISPATCHED: 18,
    DELIVERED: 10,
    CANCELLED: 3,
    RETURNED: 2
  },
  recentActivity: [
    { action: 'ORDER_CREATED', count: 5, period: 'today' },
    { action: 'PARCEL_DISPATCHED', count: 3, period: 'today' },
    { action: 'PARCEL_DELIVERED', count: 2, period: 'today' }
  ]
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

      // Procedure returns metrics which might be an array or single row depending on SP logic
      return rows[0] || {};
    }

    // ------------------------------------------------------------------
    // MOCK MODE: Return static mock metrics
    // ------------------------------------------------------------------
    return mockMetrics;
  }
}

export default new DashboardRepository();
