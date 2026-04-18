// ============================================================================
// File: src/modules/dashboard/dashboard.service.js
// Description: Service layer for Dashboard logic.
// Bridges the controller to the dashboard repository.
// ============================================================================

import dashboardRepository from './dashboard.repository.js';

class DashboardService {
  /**
   * Internal mapper to standardize database PascalCase to API camelCase.
   * Handles SP array wrapping and raw object formatting.
   * 
   * @param {object|Array} data - Raw data from repository
   * @returns {object} Standardized camelCase metric object
   */
  _mapToApi(data) {
    if (!data) return {};
    
    // Unpack array row if live DB returned array
    const metrics = Array.isArray(data) ? data[0] : data;
    if (!metrics) return {};

    return {
      totalOrders: metrics.TotalOrders !== undefined ? metrics.TotalOrders : metrics.totalOrders,
      totalParcels: metrics.TotalParcels !== undefined ? metrics.TotalParcels : metrics.totalParcels,
      totalSenders: metrics.TotalSenders !== undefined ? metrics.TotalSenders : metrics.totalSenders,
      totalReceivers: metrics.TotalReceivers !== undefined ? metrics.TotalReceivers : metrics.totalReceivers,
      parcelsByStatus: metrics.ParcelsByStatus || metrics.parcelsByStatus || {},
      recentActivity: metrics.RecentActivity || metrics.recentActivity || []
    };
  }

  /**
   * Retrieves dashboard metrics.
   * Currently a direct pass-through, but reserved for future transformations.
   * 
   * @returns {Promise<Object>} Dashboard metrics.
   */
  async getMetrics() {
    const data = await dashboardRepository.getMetrics();
    return this._mapToApi(data);
  }
}

export default new DashboardService();
