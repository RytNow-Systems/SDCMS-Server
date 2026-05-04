// ============================================================================
// File: src/interfaces/http/routes/bulk-upload.routes.js
// Description: Route definitions for Bulk Upload module.
// Applies authentication, RBAC, and Zod validation.
// ============================================================================

import express from 'express';
import {
  handleBulkUpload,
  handleGetSessions,
  handleGetSessionById
} from '../controllers/bulk-upload.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { bulkUploadSchema } from '../validations/bulk-upload.validation.js';

const router = express.Router();

// All bulk upload routes are restricted to ADMIN and OPERATOR
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   POST /api/v1/bulk-uploads
 * @desc    Submit bulk order data
 */
router.post('/', validate(bulkUploadSchema), handleBulkUpload);

/**
 * @route   GET /api/v1/bulk-uploads
 * @desc    List all upload sessions
 */
router.get('/', handleGetSessions);

/**
 * @route   GET /api/v1/bulk-uploads/:id
 * @desc    Get session result with row details
 */
router.get('/:id', handleGetSessionById);

export default router;
