// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.repository.js
// Description: Data access layer for Bulk Upload module.
// Documents and executes `CALL prc_...` stored procedures.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention:
//   - prc_bulk_order_upload_log_set / prc_bulk_order_upload_log_get
//   - prc_bulk_order_upload_detail_set / prc_bulk_order_upload_detail_get
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// ============================================================================
let mockSessions = [
  {
    PkBulkUploadId: 1,
    FileName: 'sample_orders.xlsx',
    TotalRows: 5,
    SuccessCount: 4,
    ErrorCount: 1,
    Status: 'COMPLETED',
    CreatedBy: 'admin@example.com',
    CreatedDate: '2026-04-10T10:00:00Z'
  }
];

let mockDetails = [
  { PkDetailId: 1, FkBulkUploadId: 1, RowNumber: 1, Status: 'Success', ResponseJson: '{"orderId":1}' },
  { PkDetailId: 2, FkBulkUploadId: 1, RowNumber: 2, Status: 'Success', ResponseJson: '{"orderId":2}' },
  { PkDetailId: 3, FkBulkUploadId: 1, RowNumber: 3, Status: 'Error', ResponseJson: '{"error":"Invalid sender"}' }
];

class BulkUploadRepository {
  /**
   * Create a bulk upload session log.
   * Procedure: CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)
   * 
   * @param {number} pkId - 0 for insert.
   * @param {string} fileName - Name of the uploaded file.
   * @param {number} totalRows - Total orders in the file.
   * @param {string} createdBy - EmployeeCode of the uploader.
   * @returns {Promise<object>} The created log record.
   */
  async createSession(pkId, fileName, totalRows, createdBy) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_log_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_log_set(?, ?, ?, ?)', [
        pkId,
        fileName,
        totalRows,
        createdBy
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory session creation
    // ------------------------------------------------------------------
    const newId = mockSessions.length > 0 ? Math.max(...mockSessions.map(s => s.PkBulkUploadId)) + 1 : 1;
    const session = {
      PkBulkUploadId: newId,
      FileName: fileName,
      TotalRows: totalRows,
      SuccessCount: 0,
      ErrorCount: 0,
      Status: 'PROCESSING',
      CreatedBy: createdBy,
      CreatedDate: new Date().toISOString()
    };
    mockSessions.push(session);
    return session;
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
   * @returns {Promise<object>} The created detail record.
   */
  async logRowDetail(pkId, sessionId, rowNumber, status, responseJson) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_detail_set
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_set(?, ?, ?, ?, ?)', [
        pkId,
        sessionId,
        rowNumber,
        status,
        responseJson
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory detail logging
    // ------------------------------------------------------------------
    const newId = mockDetails.length > 0 ? Math.max(...mockDetails.map(d => d.PkDetailId)) + 1 : 1;
    const detail = {
      PkDetailId: newId,
      FkBulkUploadId: sessionId,
      RowNumber: rowNumber,
      Status: status,
      ResponseJson: responseJson
    };
    mockDetails.push(detail);
    return detail;
  }

  /**
   * Get bulk upload sessions.
   * Procedure: CALL prc_bulk_order_upload_log_get(?, ?)
   * 
   * @param {number} pAction - 0: Get all, 1: Get by ID.
   * @param {number|null} pId - Session ID if pAction=1.
   * @returns {Promise<Array|object>} List of sessions or a single session record.
   */
  async getSessions(pAction, pId = null) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_log_get
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_log_get(?, ?)', [
        pAction,
        pId
      ]);
      return pAction === 1 ? rows[0][0] : rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory session retrieval
    // ------------------------------------------------------------------
    if (pAction === 1) {
      return mockSessions.find(s => s.PkBulkUploadId === parseInt(pId)) || null;
    }
    return mockSessions;
  }

  /**
   * Get individual row details for a bulk upload session.
   * Procedure: CALL prc_bulk_order_upload_detail_get(?, ?)
   * 
   * @param {number} pAction - 0: Get by Session ID.
   * @param {number} sessionId - The session ID.
   * @returns {Promise<Array>} List of row details.
   */
  async getSessionDetails(pAction, sessionId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_bulk_order_upload_detail_get
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_bulk_order_upload_detail_get(?, ?)', [
        pAction,
        sessionId
      ]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory detail retrieval
    // ------------------------------------------------------------------
    return mockDetails.filter(d => d.FkBulkUploadId === parseInt(sessionId));
  }
}

export default new BulkUploadRepository();
