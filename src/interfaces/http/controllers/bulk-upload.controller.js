// ============================================================================
// File: src/interfaces/http/controllers/bulk-upload.controller.js
// Description: Express route handlers for Bulk Upload module.
// Uses express-async-handler for automatic error propagation.
// ============================================================================

import asyncHandler from 'express-async-handler';
import bulkUploadService from '../../../modules/bulk-upload/bulk-upload.service.js';

/**
 * POST /api/v1/bulk-uploads
 * Submits bulk order data (JSON).
 */
export const handleBulkUpload = asyncHandler(async (req, res) => {
  const { sessionHash, fileName, rows } = req.body;
  const result = await bulkUploadService.processBulkUpload(sessionHash, fileName, rows, req.user);
  res.status(201).json({ success: true, data: result });
});

/**
 * GET /api/v1/bulk-uploads
 * Lists all upload sessions.
 */
export const handleGetSessions = asyncHandler(async (req, res) => {
  const sessions = await bulkUploadService.getSessions();
  res.json({ success: true, data: sessions });
});

/**
 * GET /api/v1/bulk-uploads/:id
 * Gets specific upload session result with row details.
 */
export const handleGetSessionById = asyncHandler(async (req, res) => {
  const result = await bulkUploadService.getSessionWithDetails(req.params.id);
  res.json({ success: true, data: result });
});

/**
 * GET /api/v1/bulk-uploads/:sessionId/errors
 * Returns all failed rows for a specific upload session, with RowData parsed.
 */
export const handleGetSessionErrors = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const errors = await bulkUploadService.getErrorsBySessionId(sessionId);
  res.json({ success: true, data: errors });
});
