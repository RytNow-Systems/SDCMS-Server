// ============================================================================
// File: src/interfaces/http/validations/notification.validation.js
// Description: Zod schema definitions for Notification request payloads.
// Note: validate.middleware.js parses req.body against these schemas.
// ============================================================================

import { z } from 'zod';

/**
 * Validation for sending a notification.
 * (Params only, no body required)
 * Uses z.any() to allow undefined/empty body from Supertest/Clients.
 */
export const sendNotificationSchema = z.any();

/**
 * Validation for resending a notification.
 * (Params only, no body required)
 */
export const resendNotificationSchema = z.any();

/**
 * Validation for external webhooks.
 * This schema matches the structure of req.body directly.
 */
export const webhookSchema = z.object({
  notificationId: z.number().int().positive('Notification ID must be a positive integer'),
  status: z.enum(['sent', 'delivered', 'failed'], {
    errorMap: () => ({ message: "Status must be 'sent', 'delivered', or 'failed'" })
  }),
  externalId: z.string().optional()
});
