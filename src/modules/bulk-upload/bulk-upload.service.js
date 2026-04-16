// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.service.js
// Description: Business logic layer for Bulk Upload module.
// Orchestrates session logging and iteration over order creation.
// ============================================================================

import bulkUploadRepository from './bulk-upload.repository.js';
import orderService from '../order/order.service.js';

class BulkUploadService {
  /**
   * Process a list of orders from a bulk upload.
   * 
   * @param {Array} rows - Array of order objects.
   * @param {object} user - Authenticated user.
   * @param {string} fileName - Optional filename if provided by client.
   * @returns {object} The created session ID and execution summary.
   */
  async processBulkUpload(rows, user, fileName = 'bulk_upload.json') {
    const createdBy = user?.employeeCode || 'SYSTEM';
    const totalRows = rows.length;

    // 1. Initialize Session
    const session = await bulkUploadRepository.createSession(0, fileName, totalRows, createdBy);
    const sessionId = session.PkBulkOrderUploadLogId || session.id; // Support both naming styles

    const results = {
      sessionId,
      total: totalRows,
      processed: 0,
      success: 0,
      errors: 0
    };

    // 2. Iterate and Process Rows
    for (let i = 0; i < rows.length; i++) {
      const rowData = rows[i];
      const rowNumber = i + 1;
      let status = 'SUCCESS';
      let responseJson = '';

      try {
        const orderResult = await orderService.createOrder(rowData, user);
        responseJson = JSON.stringify(orderResult);
        results.success++;
      } catch (error) {
        status = 'ERROR';
        responseJson = JSON.stringify({
          error: error.message,
          data: error.data || null
        });
        results.errors++;
      }

      // 3. Log row-level execution status
      await bulkUploadRepository.logRowDetail(0, sessionId, rowNumber, status, responseJson);
      results.processed++;
    }

    return results;
  }

  /**
   * Get all bulk upload sessions.
   * @returns {Array}
   */
  async getSessions() {
    return await bulkUploadRepository.getSessions(0);
  }

  /**
   * Get a specific session with its processed row details.
   * @param {number} id - Session ID.
   * @returns {object} { session, details }
   */
  async getSessionWithDetails(id) {
    const session = await bulkUploadRepository.getSessions(1, id);
    if (!session) {
      const error = new Error('Upload session not found');
      error.statusCode = 404;
      throw error;
    }

    const details = await bulkUploadRepository.getSessionDetails(0, id);
    
    return {
      session,
      details
    };
  }
}

export default new BulkUploadService();
