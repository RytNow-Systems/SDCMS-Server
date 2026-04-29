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
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createCourierSchema, updateCourierSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET routes are accessible by ADMIN only
router.route('/')
  .get(authorizeRoles('ADMIN'), getCouriers)
  // POST requires ADMIN
  .post(authorizeRoles('ADMIN'), validate(createCourierSchema), createCourier);

router.route('/:id')
  .get(authorizeRoles('ADMIN'), getCourierById)
  // PUT and DELETE require ADMIN
  .put(authorizeRoles('ADMIN'), validate(updateCourierSchema), updateCourier)
  .delete(authorizeRoles('ADMIN'), deleteCourier);

export default router;
