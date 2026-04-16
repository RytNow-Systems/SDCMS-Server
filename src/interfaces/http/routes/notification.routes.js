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
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   POST /api/v1/parcels/:id/notify
 * @desc    Send dispatch notification to receiver
 */
router.post('/parcels/:id/notify', validate(sendNotificationSchema), send);

/**
 * @route   POST /api/v1/notifications/:id/resend
 * @desc    Resend a failed notification
 */
router.post('/notifications/:id/resend', validate(resendNotificationSchema), resend);

/**
 * @route   GET /api/v1/parcels/:id/notifications
 * @desc    Get notification history for a parcel
 */
router.get('/parcels/:id/notifications', validate(getHistorySchema), getHistory);

export default router;
