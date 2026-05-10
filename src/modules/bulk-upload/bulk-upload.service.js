// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.service.js
// Description: Business logic layer for Bulk Upload module.
// Orchestrates session logging and iteration over order creation.
// ============================================================================

import bulkUploadRepository from "./bulk-upload.repository.js";
import orderService from "../order/order.service.js";

class BulkUploadService {
  // ============================================================================
  // INGESTION
  // ============================================================================

  /**
   * Core ingestion pipeline for a bulk upload batch.
   *
   * @param {string} sessionHash - Content hash; used to detect duplicate submissions.
   * @param {string} fileName    - Source filename for audit trail.
   * @param {Array}  rows        - Zod-validated array of order payloads.
   * @param {object} user        - Authenticated user from auth middleware.
   * @returns {Promise<object>} { sessionId, successfulOrders, failedRows }
   */
  async processBulkUpload(sessionHash, fileName, rows, user) {
    const uploadedByEmployeeId = user?.id ?? 0;

    // 1. Duplicate-batch guard
    const duplicateCount = await bulkUploadRepository.checkDuplicate(sessionHash);
    if (duplicateCount > 0) {
      const error = new Error(
        'Duplicate upload detected: a session with this sessionHash already exists.',
      );
      error.statusCode = 409;
      throw error;
    }

    // 2. Open session record (SuccessCount / FailedCount start at 0)
    const session = await bulkUploadRepository.createSession(
      sessionHash,
      fileName,
      rows.length,
      uploadedByEmployeeId,
    );
    const sessionId = session.PkBulkUploadId || session.id;

    let successfulOrders = 0;
    let failedRows = 0;

    // 3. Process each row independently — one failure must not abort the batch
    for (let i = 0; i < rows.length; i++) {
      const rowData = rows[i];
      const rowNumber = i + 1;

      try {
        const orderResult = await orderService.createOrder(rowData, user);
        const orderId =
          orderResult?.orderId ||
          orderResult?.data?.orderId ||
          orderResult?.id;

        // 4. Zero-touch junction: link OrderId → BulkUploadSession
        await bulkUploadRepository.mapOrder(sessionId, orderId);
        successfulOrders++;
      } catch (err) {
        // 5. Persist failed row verbatim for downstream review
        await bulkUploadRepository.logError(
          sessionId,
          rowNumber,
          err.message,
          JSON.stringify(rowData),
        );
        failedRows++;
      }
    }

    return { sessionId, successfulOrders, failedRows };
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * List all bulk upload sessions.
   * @returns {Promise<Array>}
   */
  async getSessions() {
    const sessions = await bulkUploadRepository.getSessions(0);
    return sessions.map((s) => this._mapSession(s));
  }

  /**
   * Get a specific session with its error detail rows.
   * @param {number|string} id - Session ID.
   * @returns {Promise<object>} { session, details }
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
      session: this._mapSession(session),
      details: details.map((d) => this._mapDetail(d)),
    };
  }

  // ============================================================================
  // ERROR RETRIEVAL
  // ============================================================================

  /**
   * Retrieve all error rows for a bulk upload session with RowData parsed into objects.
   *
   * @param {number} sessionId - The bulk upload session ID.
   * @returns {Promise<Array<{rowData: object, errorMessage: string}>>}
   */
  async getErrorsBySessionId(sessionId) {
    const errors = await bulkUploadRepository.getErrorsBySessionId(sessionId);
    return errors.map((e) => {
      const raw = e.RowData;
      let rowData;
      try {
        rowData = typeof raw === 'string' ? JSON.parse(raw) : raw;
      } catch {
        rowData = raw;
      }
      return {
        rowData,
        errorType: e.ErrorType,
        errorMessage: e.ErrorMessage,
      };
    });
  }

  // ============================================================================
  // MAPPERS
  // ============================================================================

  /** @private */
  _mapSession(session) {
    if (!session) return null;
    return {
      sessionId: session.PkBulkUploadId,
      sessionHash: session.SessionHash,
      fileName: session.FileName,
      totalRows: session.TotalRows,
      successfulOrders: session.SuccessfulOrders,
      failedRows: session.FailedRows,
      status: session.Status,
      uploadedByEmployeeId: session.FkUploadedByEmployeeCode,
      uploadedAt: session.UploadedAt,
    };
  }

  /** @private */
  _mapDetail(detail) {
    if (!detail) return null;
    let rowData = null;
    const raw = detail.RowData;
    try {
      rowData = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      rowData = raw;
    }
    return {
      errorId: detail.PkErrorId,
      bulkUploadId: detail.FkBulkUploadId,
      rowNumber: detail.RowNumber,
      errorType: detail.ErrorType,
      errorMessage: detail.ErrorMessage,
      rowData,
      createdAt: detail.CreatedAt,
    };
  }
}

export default new BulkUploadService();
