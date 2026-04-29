// ============================================================================
// File: src/modules/dashboard/dashboard.service.js
// Description: Service layer for Dashboard logic.
// Bridges the controller to the dashboard repository.
// ============================================================================

import dashboardRepository from './dashboard.repository.js';

class DashboardService {
  /**
   * Internal mapper to standardize database result set to the API contract.
   * Ensures the result contains totalOrders, pendingOrders, dispatchedOrders, and deliveredOrders.
   *
   * @param {object} rawMetrics - Raw metrics from repository
   * @returns {object} Standardized metrics object (camelCase only)
   */
  _mapToApi(rawMetrics) {
    if (!rawMetrics) return {};

    return {
      totalOrders: rawMetrics.TotalOrders ?? rawMetrics.totalOrders ?? 0,
      pendingOrders: rawMetrics.PendingOrders ?? rawMetrics.pendingOrders ?? 0,
      dispatchedOrders: rawMetrics.DispatchedOrders ?? rawMetrics.dispatchedOrders ?? 0,
      deliveredOrders: rawMetrics.DeliveredOrders ?? rawMetrics.deliveredOrders ?? 0
    };
  }

  /**
   * Retrieves dashboard metrics.
   *
   * @returns {Promise<Object>} Dashboard metrics.
   */
  async getMetrics() {
    const data = await dashboardRepository.getMetrics();
    return this._mapToApi(data);
  }
}

export default new DashboardService();
