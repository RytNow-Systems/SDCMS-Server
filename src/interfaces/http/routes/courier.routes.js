// ============================================================================
// File: src/interfaces/http/routes/courier.routes.js
// Description: Routing and RBAC mapping for Courier Partner endpoints.
// ============================================================================

import express from 'express';
import {
  getCouriers,
  getCourierById,
  createCourier,
  updateCourier,
  deleteCourier
} from '../controllers/courier.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET routes are accessible by ADMIN, OPERATOR, AND COURIER
router.route('/')
  .get(authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getCouriers)
  // POST requires ADMIN or OPERATOR
  .post(authorizeRoles('ADMIN', 'OPERATOR'), createCourier);

router.route('/:id')
  .get(authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getCourierById)
  // PUT and DELETE require ADMIN or OPERATOR
  .put(authorizeRoles('ADMIN', 'OPERATOR'), updateCourier)
  .delete(authorizeRoles('ADMIN', 'OPERATOR'), deleteCourier);

export default router;
