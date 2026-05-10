// ============================================================================
// File: src/interfaces/http/validations/bulk-upload.validation.js
// Description: Zod validation schemas for bulk upload payload.
// ============================================================================

import { z } from 'zod';

const bulkUploadRowProductSchema = z.object({
  variationId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

const bulkUploadRowReceiverSchema = z.object({
  receiverId: z.number().int().positive(),
  receiverAddressId: z.number().int().positive(),
  receiverPhone: z.string().min(10, 'Receiver phone number must be at least 10 digits'),
  products: z.array(bulkUploadRowProductSchema).min(1, 'Each receiver must have at least one product'),
});

const bulkUploadRowSchema = z.object({
  senderId: z.number().int().positive(),
  senderAddressId: z.number().int().positive(),
  courierId: z.number().int().positive().optional(),
  receivers: z.array(bulkUploadRowReceiverSchema).min(1, 'Each row must have at least one receiver'),
});

export const sessionIdParamSchema = z.object({
  sessionId: z.coerce.number().int().positive('sessionId must be a positive integer'),
});

export const bulkUploadSchema = z.object({
  sessionHash: z.string().min(1, 'Session hash is required to prevent duplicate uploads'),
  fileName: z.string().optional().default('bulk_upload.json'),
  rows: z.array(bulkUploadRowSchema).min(1, 'At least one order row is required'),
});
