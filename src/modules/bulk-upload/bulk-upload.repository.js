// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.repository.js
// Description: Data access layer for Bulk Upload module.
// All write operations MUST go through CALL statements — no raw INSERT/SELECT.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   USE_MOCK_DB=true  → In-memory mock data
//   USE_MOCK_DB=false → Live MySQL stored procedures
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// ============================================================================
let mockSessions = [
  {
    PkBulkUploadId: 1,
    SessionHash: 'abc123seed',
    FileName: 'sample_orders.xlsx',
    TotalRows: 5,
    SuccessfulOrders: 4,
    FailedRows: 1,
    FkUploadedByEmployeeCode: 1,
    Status: 'PARTIAL_SUCCESS',
    UploadedAt: '2026-04-10T10:00:00Z',
  },
];

let mockErrors = [];
let mockMappings = [];

class BulkUploadRepository {
  // ============================================================================
  // DUPLICATE CHECK
  // ============================================================================

  /**
   * Check if a session with the given hash already exists.
   * Procedure: CALL prc_checkduplicate_BulkUploadSessions(pSessionHash)
   *
   * @param {string} sessionHash - MD5/SHA hash of the upload content.
   * @returns {Promise<number>} DuplicateCount (0 = unique, >0 = duplicate).
   */
  async checkDuplicate(sessionHash) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_checkduplicate_BulkUploadSessions(?)',
        [sessionHash],
      );
      return rows[0]?.[0]?.DuplicateCount ?? 0;
    }
    return mockSessions.filter((s) => s.SessionHash === sessionHash).length;
  }

  // ============================================================================
  // SESSION OPERATIONS
  // ============================================================================

  /**
   * Create a new bulk upload session record.
   * Procedure: CALL prc_BulkUploadSessions_set(0, pSessionHash, pFileName, pTotalRows, 0, 0, pFkUploadedByEmployeeCode)
   *
   * @param {string} sessionHash           - Unique content hash for deduplication.
   * @param {string} fileName              - Name of the uploaded file.
   * @param {number} totalRows             - Total order rows submitted.
   * @param {number} uploadedByEmployeeId  - PK of the uploading employee.
   * @returns {Promise<object>} { PkBulkUploadId }
   */
  async createSession(sessionHash, fileName, totalRows, uploadedByEmployeeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_BulkUploadSessions_set(?, ?, ?, ?, ?, ?, ?)',
        [0, sessionHash, fileName, totalRows, 0, 0, uploadedByEmployeeId],
      );
      return rows[0][0];
    }
    const newId =
      mockSessions.length > 0
        ? Math.max(...mockSessions.map((s) => s.PkBulkUploadId)) + 1
        : 1;
    const session = {
      PkBulkUploadId: newId,
      SessionHash: sessionHash,
      FileName: fileName,
      TotalRows: totalRows,
      SuccessfulOrders: 0,
      FailedRows: 0,
      FkUploadedByEmployeeCode: uploadedByEmployeeId,
      Status: 'VALIDATING',
      UploadedAt: new Date().toISOString(),
    };
    mockSessions.push(session);
    return session;
  }

  /**
   * Get bulk upload sessions.
   * Procedure: CALL prc_bulk_order_upload_log_get(pAction, pId)
   *
   * @param {number} pAction - 0: all, 1: by ID.
   * @param {number|null} pId - Session ID when pAction=1.
   * @returns {Promise<Array|object>}
   */
  async getSessions(pAction, pId = null) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_bulk_order_upload_log_get(?, ?)',
        [pAction, pId],
      );
      return pAction === 1 ? rows[0][0] : rows[0];
    }
    if (pAction === 1) {
      return (
        mockSessions.find((s) => s.PkBulkUploadId === parseInt(pId)) || null
      );
    }
    return mockSessions;
  }

  // ============================================================================
  // ERROR LOGGING
  // ============================================================================

  /**
   * Log a failed row's data as a stringified JSON blob.
   * Procedure: CALL prc_BulkUploadErrors_set(0, pFkBulkUploadId, pRowNumber, pErrorMessage, pRowData)
   *
   * @param {number} sessionId     - FK to bulk_upload_sessions.
   * @param {number} rowNumber     - 1-based row index in the upload.
   * @param {string} errorMessage  - Human-readable error description.
   * @param {string} rowData       - JSON.stringify() of the original row payload.
   * @returns {Promise<object>}
   */
  async logError(sessionId, rowNumber, errorMessage, rowData) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_BulkUploadErrors_set(?, ?, ?, ?, ?)',
        [0, sessionId, rowNumber, errorMessage, rowData],
      );
      return rows[0][0];
    }
    const newId =
      mockErrors.length > 0
        ? Math.max(...mockErrors.map((e) => e.PkBulkUploadErrorId)) + 1
        : 1;
    const entry = {
      PkErrorId: newId,
      FkBulkUploadId: sessionId,
      RowNumber: rowNumber,
      ErrorType: 'VALIDATION',
      ErrorMessage: errorMessage,
      RowData: rowData,
      CreatedAt: new Date().toISOString(),
    };
    mockErrors.push(entry);
    return entry;
  }

  // ============================================================================
  // ERROR RETRIEVAL (READ)
  // ============================================================================

  /**
   * Get all error rows logged for a specific bulk upload session.
   * Procedure: CALL prc_BulkUploadErrors_get(0, pFkBulkUploadId)
   *
   * @param {number} sessionId - FK to bulk_upload_sessions.
   * @returns {Promise<Array>} Raw error rows containing stringified RowData.
   */
  async getErrorsBySessionId(sessionId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_BulkUploadErrors_get(?, ?)',
        [0, sessionId],
      );
      return rows[0];
    }
    return mockErrors.filter(
      (e) => e.FkBulkUploadId === parseInt(sessionId),
    );
  }

  // ============================================================================
  // ORDER MAPPING
  // ============================================================================

  /**
   * Map a successfully created OrderId to this bulk upload session (junction table).
   * Procedure: CALL prc_BulkUploadOrderMapping_set(0, pFkBulkUploadId, pFkOrderId)
   *
   * @param {number} sessionId - FK to bulk_upload_sessions.
   * @param {number} orderId   - FK to order_master.
   * @returns {Promise<object>}
   */
  async mapOrder(sessionId, orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_BulkUploadOrderMapping_set(?, ?, ?)',
        [0, sessionId, orderId],
      );
      return rows[0][0];
    }
    const newId =
      mockMappings.length > 0
        ? Math.max(...mockMappings.map((m) => m.PkMappingId)) + 1
        : 1;
    const mapping = {
      PkMappingId: newId,
      FkBulkUploadId: sessionId,
      FkOrderId: orderId,
      CreatedDate: new Date().toISOString(),
    };
    mockMappings.push(mapping);
    return mapping;
  }

  // ============================================================================
  // DETAIL RETRIEVAL (READ)
  // ============================================================================

  /**
   * Get individual row details for a bulk upload session.
   * Procedure: CALL prc_bulk_order_upload_detail_get(pAction, pSessionId)
   *
   * @param {number} pAction    - 0: by Session ID.
   * @param {number} sessionId  - The session ID.
   * @returns {Promise<Array>}
   */
  async getSessionDetails(pAction, sessionId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_bulk_order_upload_detail_get(?, ?)',
        [pAction, sessionId],
      );
      return rows[0];
    }
    return mockErrors.filter(
      (e) => e.FkBulkUploadId === parseInt(sessionId),
    );
  }
}

export default new BulkUploadRepository();
