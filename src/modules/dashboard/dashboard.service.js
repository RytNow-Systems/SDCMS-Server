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
  _mapToApi(rawMetrics) {
    if (!rawMetrics) return {};

    // Standardize input (handle both PascalCase from DB and potential camelCase)
    const totalCount = rawMetrics.TotalOrders ?? rawMetrics.totalOrders ?? 0;
    const pendingCount = rawMetrics.PendingOrders ?? rawMetrics.pendingOrders ?? 0;
    const dispatchedCount = rawMetrics.DispatchedOrders ?? rawMetrics.dispatchedOrders ?? 0;
    const deliveredCount = rawMetrics.DeliveredOrders ?? rawMetrics.deliveredOrders ?? 0;

    return {
      // --- NEW CONTRACT (PascalCase) ---
      TotalOrders: totalCount,
      PendingOrders: pendingCount,
      DispatchedOrders: dispatchedCount,
      DeliveredOrders: deliveredCount,

      // --- LEGACY CONTRACT (camelCase) ---
      /** @deprecated Use TotalOrders */
      totalOrders: totalCount,
      /** @deprecated Use PendingOrders */
      pendingOrders: pendingCount,
      /** @deprecated Use DispatchedOrders */
      dispatchedOrders: dispatchedCount,
      /** @deprecated Use DeliveredOrders */
      deliveredOrders: deliveredCount,

      // --- LEGACY NESTED STRUCTURE ---
      /** @deprecated Use top-level fields */
      parcelsByStatus: {
        PENDING: pendingCount,
        DISPATCHED: dispatchedCount,
        DELIVERED: deliveredCount
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
