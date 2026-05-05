// ============================================================================
// File: src/modules/bulk-upload/bulk-upload.service.js
// Description: Business logic layer for Bulk Upload module.
// Orchestrates session logging and iteration over order creation.
// ============================================================================

import bulkUploadRepository from "./bulk-upload.repository.js";
import orderService from "../order/order.service.js";

class BulkUploadService {
  /**
   * Internal mapper for bulk upload session
   */
  _mapSession(session) {
    if (!session) return null;
    return {
      sessionId: session.PkBulkUploadId || session.id,
      fileName: session.FileName || session.fileName,
      totalRows: session.TotalRows || session.totalRows,
      successCount:
        session.SuccessCount !== undefined
          ? session.SuccessCount
          : session.successCount,
      errorCount:
        session.ErrorCount !== undefined
          ? session.ErrorCount
          : session.errorCount,
      status: session.Status || session.status,
      createdBy: session.CreatedBy || session.createdBy,
      createdAt:
        session.CreatedDate || session.createdDate || session.createdAt,
    };
  }

  /**
   * Internal mapper for bulk upload row detail
   */
  _mapDetail(detail) {
    if (!detail) return null;

    let responseJson = null;
    const rawJson = detail.ResponseJson || detail.responseJson;
    try {
      responseJson =
        typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
    } catch (e) {
      responseJson = rawJson;
    }

    return {
      bulkUploadDetailId: detail.PkDetailId || detail.id,
      bulkUploadId: detail.FkBulkUploadId || detail.bulkUploadId,
      rowNumber: detail.RowNumber || detail.rowNumber,
      status: detail.Status || detail.status,
      responseJson,
    };
  }

  /**
   * Process a list of orders from a bulk upload.
   *
   * @param {Array} rows - Array of order objects.
   * @param {object} user - Authenticated user.
   * @param {string} fileName - Optional filename if provided by client.
   * @returns {object} The created session ID and execution summary.
   */
  async processBulkUpload(rows, user, fileName = "bulk_upload.json") {
    const createdBy = user?.employeeCode || "SYSTEM";
    const totalRows = rows.length;

    // 1. Initialize Session
    const session = await bulkUploadRepository.createSession(
      0,
      fileName,
      totalRows,
      createdBy,
    );
    const sessionId = session.PkBulkUploadId || session.id;

    const results = {
      sessionId,
      total: totalRows,
      processed: 0,
      success: 0,
      errors: 0,
    };

    // 2. Iterate and Process Rows
    for (let i = 0; i < rows.length; i++) {
      const rowData = rows[i];
      const rowNumber = i + 1;
      let status = "SUCCESS";
      let responseJson = "";

      try {
        const orderResult = await orderService.createOrder(rowData, user);
        responseJson = JSON.stringify(orderResult);
        results.success++;
      } catch (error) {
        status = "ERROR";
        responseJson = JSON.stringify({
          error: error.message,
          data: error.data || null,
        });
        results.errors++;
      }

      // 3. Log row-level execution status
      await bulkUploadRepository.logRowDetail(
        0,
        sessionId,
        rowNumber,
        status,
        responseJson,
      );
      results.processed++;
    }

    return results;
  }

  /**
   * Get all bulk upload sessions.
   * @returns {Array}
   */
  async getSessions() {
    const sessions = await bulkUploadRepository.getSessions(0);
    return sessions.map((s) => this._mapSession(s));
  }

  /**
   * Get a specific session with its processed row details.
   * @param {number} id - Session ID.
   * @returns {object} { session, details }
   */
  async getSessionWithDetails(id) {
    const session = await bulkUploadRepository.getSessions(1, id);
    if (!session) {
      const error = new Error("Upload session not found");
      error.statusCode = 404;
      throw error;
    }

    const details = await bulkUploadRepository.getSessionDetails(0, id);

    return {
      session: this._mapSession(session),
      details: details.map((d) => this._mapDetail(d)),
    };
  }
}

export default new BulkUploadService();
