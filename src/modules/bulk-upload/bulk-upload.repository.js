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
   * Procedure: CALL prc_checkduplicate_bulk_upload_sessions(pSessionHash)
   *
   * @param {string} sessionHash - MD5/SHA hash of the upload content.
   * @returns {Promise<number>} DuplicateCount (0 = unique, >0 = duplicate).
   */
  async checkDuplicate(sessionHash) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_checkduplicate_bulk_upload_sessions(?)',
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
   * Procedure: CALL prc_bulk_upload_sessions_set(0, pSessionHash, pFileName, pTotalRows, 0, 0, pFkUploadedByEmployeeCode)
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
        'CALL prc_bulk_upload_sessions_set(?, ?, ?, ?, ?, ?, ?)',
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
   * Get a paginated, filtered list of bulk upload sessions.
   * Procedure: CALL prc_bulk_upload_sessions_get(0, pPage, pLimit, pStartDate, pEndDate, pStatus, NULL)
   *
   * @param {object} opts
   * @param {number} opts.page        - 1-based page number.
   * @param {number} opts.limit       - Rows per page.
   * @param {string|null} opts.startDate - ISO date string filter (inclusive).
   * @param {string|null} opts.endDate   - ISO date string filter (inclusive).
   * @param {string|null} opts.status    - Status enum filter.
   * @returns {Promise<{ sessions: Array, totalCount: number }>}
   */
  async getSessions({ page = 1, limit = 10, startDate = null, endDate = null, status = null } = {}) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_bulk_upload_sessions_get(?, ?, ?, ?, ?, ?, ?)',
        [0, page, limit, startDate ?? null, endDate ?? null, status ?? null, null],
      );
      return { totalCount: rows[0]?.[0]?.totalCount ?? 0, sessions: rows[1] ?? [] };
    }
    let filtered = [...mockSessions];
    if (startDate) filtered = filtered.filter((s) => s.UploadedAt >= startDate);
    if (endDate)   filtered = filtered.filter((s) => s.UploadedAt <= endDate);
    if (status)    filtered = filtered.filter((s) => s.Status === status);
    const totalCount = filtered.length;
    const offset = (page - 1) * limit;
    return { totalCount, sessions: filtered.slice(offset, offset + limit) };
  }

  /**
   * Get a single bulk upload session and its linked order IDs.
   * Procedure: CALL prc_bulk_upload_sessions_get(1, NULL, NULL, NULL, NULL, NULL, pSessionId)
   *
   * @param {number} sessionId - PK of the bulk upload session.
   * @returns {Promise<{ session: object|null, orderIds: number[] }>}
   */
  async getSessionById(sessionId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_bulk_upload_sessions_get(?, ?, ?, ?, ?, ?, ?)',
        [1, null, null, null, null, null, sessionId],
      );
      const session = rows[0]?.[0] ?? null;
      const orderIds = (rows[1] ?? []).map((r) => r.orderId);
      return { session, orderIds };
    }
    const session = mockSessions.find((s) => s.PkBulkUploadId === parseInt(sessionId)) || null;
    return { session, orderIds: [] };
  }

  /**
   * Update session with final success/fail counts and resolve Status.
   * Procedure: CALL prc_bulk_upload_sessions_set(pPkBulkUploadId, ..., pSuccessfulOrders, pFailedRows, ...)
   *
   * @param {number} sessionId
   * @param {string} sessionHash
   * @param {string} fileName
   * @param {number} totalRows
   * @param {number} successfulOrders
   * @param {number} failedRows
   * @param {number} uploadedByEmployeeId
   */
  async closeSession(sessionId, sessionHash, fileName, totalRows, successfulOrders, failedRows, uploadedByEmployeeId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      await db.execute(
        'CALL prc_bulk_upload_sessions_set(?, ?, ?, ?, ?, ?, ?)',
        [sessionId, sessionHash, fileName, totalRows, successfulOrders, failedRows, uploadedByEmployeeId],
      );
      return;
    }
    const s = mockSessions.find((x) => x.PkBulkUploadId === sessionId);
    if (s) {
      s.SuccessfulOrders = successfulOrders;
      s.FailedRows = failedRows;
      s.Status = failedRows === 0 ? 'COMPLETED' : successfulOrders === 0 ? 'FAILED' : 'PARTIAL_SUCCESS';
    }
  }

  // ============================================================================
  // ERROR LOGGING
  // ============================================================================

  /**
   * Log a failed row's data as a stringified JSON blob.
   * Procedure: CALL prc_bulk_upload_errors_set(0, pFkBulkUploadId, pRowNumber, pErrorMessage, pRowData)
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
        'CALL prc_bulk_upload_errors_set(?, ?, ?, ?, ?)',
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
   * Procedure: CALL prc_bulk_upload_errors_get(0, pFkBulkUploadId)
   *
   * @param {number} sessionId - FK to bulk_upload_sessions.
   * @returns {Promise<Array>} Raw error rows containing stringified RowData.
   */
  async getErrorsBySessionId(sessionId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_bulk_upload_errors_get(?, ?)',
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
   * Procedure: CALL prc_bulk_upload_order_mapping_set(0, pFkBulkUploadId, pFkOrderId)
   *
   * @param {number} sessionId - FK to bulk_upload_sessions.
   * @param {number} orderId   - FK to order_master.
   * @returns {Promise<object>}
   */
  async mapOrder(sessionId, orderId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute(
        'CALL prc_bulk_upload_order_mapping_set(?, ?, ?)',
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

}


export default new BulkUploadRepository();
