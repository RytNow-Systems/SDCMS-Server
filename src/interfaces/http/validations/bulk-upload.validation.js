// ============================================================================
// File: src/interfaces/http/validations/bulk-upload.validation.js
// Description: Zod validation schemas for bulk upload payload.
// ============================================================================

import { z } from 'zod';
import { createOrderSchema } from './validation.schemas.js';

/**
 * Validates the bulk upload request body.
 * Expects an array of orders matching the standard createOrderSchema.
 */
export const bulkUploadSchema = z.object({
  fileName: z.string().optional(),
  rows: z.array(createOrderSchema).min(1, 'At least one order is required for bulk upload')
});
