// ============================================================================
// File: src/interfaces/http/routes/notification.routes.js
// Description: Route definitions for Notification module.
// Applies authentication, RBAC, and Zod validation.
// ============================================================================

import express from 'express';
import {
  send,
  resend,
  getHistory,
  webhook
} from '../controllers/notification.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import {
  sendNotificationSchema,
  resendNotificationSchema,
  getHistorySchema,
  webhookSchema
} from '../validations/notification.validation.js';

const router = express.Router();

// --- Public Routes ---
/**
 * @route   POST /api/v1/notifications/webhook
 * @desc    Webhook callback for delivery status
 */
router.post('/notifications/webhook', validate(webhookSchema), webhook);

// --- Protected Routes (Admin, Operator) ---
// ⚠️ We apply protect + authorizeRoles per-route (not blanket router.use)
//    to prevent this router from intercepting unmatched /api/v1/* paths
//    and blocking the notFound middleware from returning 404.

/**
 * @route   POST /api/v1/parcels/:id/notify
 * @desc    Send dispatch notification to receiver
 */
router.post('/parcels/:id/notify', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(sendNotificationSchema), send);

/**
 * @route   POST /api/v1/notifications/:id/resend
 * @desc    Resend a failed notification
 */
router.post('/notifications/:id/resend', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(resendNotificationSchema), resend);

/**
 * @route   GET /api/v1/parcels/:id/notifications
 * @desc    Get notification history for a parcel
 */
router.get('/parcels/:id/notifications', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(getHistorySchema), getHistory);

export default router;
