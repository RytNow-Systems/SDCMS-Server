// ============================================================================
// File: src/modules/dashboard/dashboard.service.js
// Description: Service layer for Dashboard logic.
// Bridges the controller to the dashboard repository.
// ============================================================================

import dashboardRepository from './dashboard.repository.js';

class DashboardService {
  /**
   * Internal mapper to standardize database result set to the API contract.
   * Ensures the result contains TotalOrders, PendingOrders, DispatchedOrders, and DeliveredOrders.
   *
   * @param {object} metrics - Raw metrics from repository
   * @returns {object} Standardized metrics object
   */
  _mapToApi(metrics) {
    if (!metrics) return {};

    const TotalOrders = metrics.TotalOrders !== undefined ? metrics.TotalOrders : (metrics.totalOrders || 0);
    const PendingOrders = metrics.PendingOrders !== undefined ? metrics.PendingOrders : (metrics.pendingOrders || 0);
    const DispatchedOrders = metrics.DispatchedOrders !== undefined ? metrics.DispatchedOrders : (metrics.dispatchedOrders || 0);
    const DeliveredOrders = metrics.DeliveredOrders !== undefined ? metrics.DeliveredOrders : (metrics.deliveredOrders || 0);

    return {
      // New PascalCase structure (as requested)
      TotalOrders,
      PendingOrders,
      DispatchedOrders,
      DeliveredOrders,

      /** @deprecated Use TotalOrders instead */
      totalOrders: TotalOrders,
      /** @deprecated Use PendingOrders instead */
      pendingOrders: PendingOrders,
      /** @deprecated Use DispatchedOrders instead */
      dispatchedOrders: DispatchedOrders,
      /** @deprecated Use DeliveredOrders instead */
      deliveredOrders: DeliveredOrders,

      /** @deprecated Use top-level status fields instead */
      parcelsByStatus: {
        PENDING: PendingOrders,
        DISPATCHED: DispatchedOrders,
        DELIVERED: DeliveredOrders
      }
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
