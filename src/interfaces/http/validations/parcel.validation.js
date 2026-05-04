// ============================================================================
// File: src/interfaces/http/validations/parcel.validation.js
// Description: Zod validation schemas for Parcel module endpoints.
// Enforces strict payload shapes before reaching the Service layer.
// ============================================================================

import { z } from 'zod';

// ----------------------------------------------------------------------------
// POST /parcels/scan — Atomic Scan + AWB link (API Contract §8.4)
// ----------------------------------------------------------------------------
export const scanParcelSchema = z.object({
  parcelId: z.string().min(1, 'Parcel ID (PCL-ORD-PCL) is required'),
  awbNumber: z.string().min(1, 'AWB number is required')
});

// ----------------------------------------------------------------------------
// POST /parcels/dispatch — Bulk dispatch (API Contract §8.5)
// ----------------------------------------------------------------------------
export const dispatchParcelsSchema = z.object({
  parcelDetailsIds: z
    .array(z.number().int().positive('Each parcel details ID must be a positive integer'))
    .min(1, 'At least one parcel details ID is required')
});
