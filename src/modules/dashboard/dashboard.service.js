// ============================================================================
// File: src/modules/dashboard/dashboard.service.js
// Description: Service layer for Dashboard logic.
// Bridges the controller to the dashboard repository.
// ============================================================================

import dashboardRepository from './dashboard.repository.js';

class DashboardService {
  /**
   * Retrieves dashboard metrics.
   * Currently a direct pass-through, but reserved for future transformations.
   * 
   * @returns {Promise<Object>} Dashboard metrics.
   */
  async getMetrics() {
    return await dashboardRepository.getMetrics();
  }
}

export default new DashboardService();
