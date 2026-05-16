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

    // Close session — persist final counts and resolve Status in DB
    await bulkUploadRepository.closeSession(
      sessionId, sessionHash, fileName, rows.length,
      successfulOrders, failedRows, uploadedByEmployeeId,
    );

    return { sessionId, successfulOrders, failedRows };
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * List bulk upload sessions with pagination and optional filters.
   *
   * @param {object} query
   * @param {number} query.page
   * @param {number} query.limit
   * @param {string|undefined} query.startDate
   * @param {string|undefined} query.endDate
   * @param {string|undefined} query.status
   * @returns {Promise<{ sessions: Array, totalCount: number }>}
   */
  async getSessions({ page, limit, startDate, endDate, status } = {}) {
    const { sessions, totalCount } = await bulkUploadRepository.getSessions({
      page, limit,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      status: status ?? null,
    });
    return { sessions: sessions.map((s) => this._mapSession(s)), totalCount };
  }

  /**
   * Get a specific session with its linked created order IDs.
   *
   * @param {number|string} id - Session ID.
   * @returns {Promise<{ sessionDetails: object, createdOrderIds: number[] }>}
   */
  async getSessionWithDetails(id) {
    const { session, orderIds } = await bulkUploadRepository.getSessionById(id);
    if (!session) {
      const error = new Error('Upload session not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      sessionDetails: this._mapSession(session),
      createdOrderIds: orderIds,
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

}

export default new BulkUploadService();
