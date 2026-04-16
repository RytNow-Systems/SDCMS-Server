import express from 'express';
import { browseEvents, exportCSV } from '../controllers/parcel-events.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

// ============================================================================
// Parcel Events & Audit Export Routes — API Contract §11
// Reads from receiver_status_details (unified event log).
// Access: ADMIN, OPERATOR only
// ============================================================================

// GET /api/v1/parcel-events/export → CSV download (must be before /:id-style routes)
router.get('/export', protect, authorizeRoles('ADMIN', 'OPERATOR'), exportCSV);

// GET /api/v1/parcel-events       → Browse system-wide events (paginated, filtered)
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR'), browseEvents);

export default router;
