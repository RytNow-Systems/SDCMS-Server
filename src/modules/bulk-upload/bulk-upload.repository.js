// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.repository.js
// Description: Data access layer for Bulk Upload module.
// Documents and executes `CALL prc_...` stored procedures.
// ============================================================================

import db from '../../infrastructure/database/db.js';

class BulkUploadRepository {
  /**
   * Create a bulk upload session log.
   * Procedure: CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)
   * 
   * @param {number} pkId - 0 for insert.
   * @param {string} fileName - Name of the uploaded file.
   * @param {number} totalRows - Total orders in the file.
   * @param {string} createdBy - EmployeeCode of the uploader.
   * @returns {object} The created log record.
   */
  async createSession(pkId, fileName, totalRows, createdBy) {
    const [rows] = await db.execute('CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)', [
      pkId,
      fileName,
      totalRows,
      createdBy
    ]);
    return rows[0][0];
  }

  /**
   * Log the status of an individual row (order) in a bulk upload session.
   * Procedure: CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)
   * 
   * @param {number} pkId - 0 for insert.
   * @param {number} sessionId - FK to bulk_order_upload_log.
   * @param {number} rowNumber - Excel row number.
   * @param {string} status - Result (Success/Error).
   * @param {string} responseJson - JSON string of the order create response or error.
   * @returns {object} The created detail record.
   */
  async logRowDetail(pkId, sessionId, rowNumber, status, responseJson) {
    const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)', [
      pkId,
      sessionId,
      rowNumber,
      status,
      responseJson
    ]);
    return rows[0][0];
  }

  /**
   * Get bulk upload sessions.
   * Procedure: CALL prc_bulk_order_upload_log_get(?, ?)
   * 
   * @param {number} pAction - 0: Get all, 1: Get by ID.
   * @param {number|null} pId - Session ID if pAction=1.
   * @returns {Array|object} List of sessions or a single session record.
   */
  async getSessions(pAction, pId = null) {
    const [rows] = await db.execute('CALL prc_bulk_order_upload_log_get(?, ?)', [
      pAction,
      pId
    ]);
    return pAction === 1 ? rows[0][0] : rows[0];
  }

  /**
   * Get individual row details for a bulk upload session.
   * Procedure: CALL prc_bulk_order_upload_detail_get(?, ?)
   * 
   * @param {number} pAction - 0: Get by Session ID.
   * @param {number} sessionId - The session ID.
   * @returns {Array} List of row details.
   */
  async getSessionDetails(pAction, sessionId) {
    const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_get(?, ?)', [
      pAction,
      sessionId
    ]);
    return rows[0];
  }
}

export default new BulkUploadRepository();
