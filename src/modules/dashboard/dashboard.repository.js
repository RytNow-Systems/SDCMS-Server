// ============================================================================
// File: src/modules/dashboard/dashboard.repository.js
// Description: Data access layer for Dashboard analytics.
// Uses prc_dashboard_metrics_get for obtaining system-wide metrics.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SPs: prc_dashboard_metrics_get (pAction, pFromDate, pToDate)
//      prc_dashboard_graph_get   (pAction, pYear)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Realistic dashboard metrics for frontend development without a live database.
// ============================================================================
const mockMetrics = {
  TotalOrders: 150,
  PendingParcels: 45,
  DispatchedParcels: 80,
  DeliveredParcels: 25
};

const mockGraphData = [
  { MonthNo: 1, TotalOrders: 10 },
  { MonthNo: 2, TotalOrders: 18 },
  { MonthNo: 3, TotalOrders: 14 },
  { MonthNo: 4, TotalOrders: 22 },
  { MonthNo: 5, TotalOrders: 30 }
];

class DashboardRepository {
  /**
   * Fetches dashboard metrics for a given time period.
   * Calls prc_dashboard_metrics_get(pAction, pFromDate, pToDate).
   *
   * @param {number} pAction - 0=Overall, 1=Daily, 2=Weekly, 3=Monthly, 4=Custom range
   * @param {string|null} fromDate - ISO date string; required when pAction=4
   * @param {string|null} toDate - ISO date string; required when pAction=4
   * @returns {Promise<Object>} Raw metrics row from DB.
   */
  async getMetrics(pAction = 0, fromDate = null, toDate = null) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_dashboard_metrics_get (pAction, pFromDate, pToDate)
    // Injection Site: Procedure call for period-based analytics
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_dashboard_metrics_get(?, ?, ?)',
        [pAction, fromDate, toDate]
      );

      const result = Array.isArray(rows) ? rows[0] : null;
      const metrics = Array.isArray(result) ? result[0] : result;

      return metrics || {};
    }

    // ------------------------------------------------------------------
    // MOCK MODE: Return static mock metrics
    // ------------------------------------------------------------------
    return mockMetrics;
  }

  /**
   * Fetches monthly order counts for the orders-over-time graph.
   * Calls prc_dashboard_graph_get(pAction, pYear).
   *
   * @param {number|null} year - Specific 4-digit year; null = current year.
   * @returns {Promise<Array>} Array of { MonthNo, TotalOrders } rows.
   */
  async getGraph(year = null) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_dashboard_graph_get (pAction, pYear)
    // Injection Site: Procedure call for orders-over-time graph
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const pAction = year ? 1 : 0;
      const [rows] = await db.execute(
        'CALL prc_dashboard_graph_get(?, ?)',
        [pAction, year ?? null]
      );

      const result = Array.isArray(rows) ? rows[0] : [];
      return Array.isArray(result) ? result : [];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: Return static mock graph data
    // ------------------------------------------------------------------
    return mockGraphData;
  }
}

export default new DashboardRepository();
