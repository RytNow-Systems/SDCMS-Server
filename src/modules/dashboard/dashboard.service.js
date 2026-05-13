// ============================================================================
// File: src/modules/dashboard/dashboard.service.js
// Description: Service layer for Dashboard logic.
// Bridges the controller to the dashboard repository.
// ============================================================================

import dashboardRepository from './dashboard.repository.js';

class DashboardService {
  /**
   * Maps period string from query param to the pAction integer the SP expects.
   *
   * @param {string} period - 'overall'|'daily'|'weekly'|'monthly'|'custom'
   * @returns {number} pAction value (0–4)
   */
  _periodToAction(period) {
    const map = { overall: 0, daily: 1, weekly: 2, monthly: 3, custom: 4 };
    return map[period] ?? 0;
  }

  /**
   * Standardizes raw DB metrics row to camelCase API contract.
   * SP returns PendingParcels/DispatchedParcels/DeliveredParcels.
   *
   * @param {object} raw - Raw metrics row from repository
   * @returns {object} Camelcase metrics object
   */
  _mapMetricsToApi(raw) {
    if (!raw) return {};

    return {
      totalOrders: raw.TotalOrders ?? 0,
      pendingParcels: raw.PendingParcels ?? 0,
      dispatchedParcels: raw.DispatchedParcels ?? 0,
      deliveredParcels: raw.DeliveredParcels ?? 0
    };
  }

  /**
   * Standardizes raw graph rows to camelCase API contract.
   *
   * @param {Array} rows - Array of { MonthNo, TotalOrders } from repository
   * @returns {Array} Array of { month, totalOrders }
   */
  _mapGraphToApi(rows) {
    const indexed = Object.fromEntries(rows.map(r => [r.MonthNo, r.TotalOrders ?? 0]));
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalOrders: indexed[i + 1] ?? 0
    }));
  }

  /**
   * Retrieves dashboard metrics for the requested time period.
   *
   * @param {string} period - 'overall'|'daily'|'weekly'|'monthly'|'custom'
   * @param {string|null} fromDate - Required when period='custom'
   * @param {string|null} toDate - Required when period='custom'
   * @returns {Promise<Object>} Standardized metrics object.
   */
  async getMetrics(period = 'overall', fromDate = null, toDate = null) {
    const pAction = this._periodToAction(period);
    const raw = await dashboardRepository.getMetrics(pAction, fromDate, toDate);
    return this._mapMetricsToApi(raw);
  }

  /**
   * Retrieves monthly order counts for the graph.
   *
   * @param {number|null} year - Specific year; null = current year.
   * @returns {Promise<Array>} Array of { month, totalOrders }.
   */
  async getGraph(year = null) {
    const rows = await dashboardRepository.getGraph(year);
    return this._mapGraphToApi(rows);
  }
}

export default new DashboardService();
