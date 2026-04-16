import express from 'express';
import {
  getParcelList,
  getParcelById,
  getLabelData,
  getTimeline,
  logPrint,
  scanParcel,
  dispatchParcels,
  deliverParcel,
  cancelParcel,
  returnParcel,
} from '../controllers/parcel.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { scanParcelSchema, dispatchParcelsSchema } from '../validations/parcel.validation.js';

const router = express.Router();

// ============================================================================
// Parcel Execution Routes — API Contract §8
// "Order = planning, Parcel = execution."
// ============================================================================

// --- STATIC WRITE ROUTES (must come before /:id to prevent Express param capture) ---

// POST   /api/v1/parcels/scan           → QR scan + AWB link (ALL roles)
router.post('/scan', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), validate(scanParcelSchema), scanParcel);

// POST   /api/v1/parcels/dispatch       → Dispatch parcels in bulk (ADMIN, OPERATOR)
router.post('/dispatch', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(dispatchParcelsSchema), dispatchParcels);

// --- READ OPERATIONS ---

// GET    /api/v1/parcels                → List parcels (ALL roles)
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getParcelList);

// GET    /api/v1/parcels/:id            → Get parcel details (ALL roles)
router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getParcelById);

// GET    /api/v1/parcels/:id/label-data → Get label data for rendering (ADMIN, OPERATOR)
router.get('/:id/label-data', protect, authorizeRoles('ADMIN', 'OPERATOR'), getLabelData);

// GET    /api/v1/parcels/:id/timeline   → Get Amazon-style event timeline (ALL roles)
router.get('/:id/timeline', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getTimeline);

// --- PARAMETERIZED WRITE OPERATIONS ---

// POST   /api/v1/parcels/:id/log-print  → Log label print event (ADMIN, OPERATOR)
router.post('/:id/log-print', protect, authorizeRoles('ADMIN', 'OPERATOR'), logPrint);

// --- TERMINAL STATE TRANSITIONS ---

// PATCH  /api/v1/parcels/:id/deliver    → Mark as delivered (ADMIN, OPERATOR)
router.patch('/:id/deliver', protect, authorizeRoles('ADMIN', 'OPERATOR'), deliverParcel);

// PATCH  /api/v1/parcels/:id/cancel     → Cancel parcel (ADMIN, OPERATOR)
router.patch('/:id/cancel', protect, authorizeRoles('ADMIN', 'OPERATOR'), cancelParcel);

// PATCH  /api/v1/parcels/:id/return     → Mark as returned (ADMIN, OPERATOR)
router.patch('/:id/return', protect, authorizeRoles('ADMIN', 'OPERATOR'), returnParcel);

export default router;
