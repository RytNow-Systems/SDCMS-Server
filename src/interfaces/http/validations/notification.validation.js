// ============================================================================
// File: src/interfaces/http/validations/notification.validation.js
// Description: Zod schema definitions for Notification request payloads.
// ============================================================================

import { z } from 'zod';

/**
 * Validation for sending a notification.
 */
export const sendNotificationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Parcel ID must be numeric')
  })
});

/**
 * Validation for resending a notification.
 */
export const resendNotificationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Notification ID must be numeric')
  })
});

/**
 * Validation for fetching notification history.
 */
export const getHistorySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Parcel ID must be numeric')
  })
});

/**
 * Validation for external webhooks.
 */
export const webhookSchema = z.object({
  body: z.object({
    notificationId: z.number().int().positive(),
    status: z.enum(['sent', 'delivered', 'failed']),
    externalId: z.string().optional()
  })
});
