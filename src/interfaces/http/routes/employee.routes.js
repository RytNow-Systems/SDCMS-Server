// ============================================================================
// File: src/interfaces/http/routes/employee.routes.js
// Description: Express routes for Employee Management.
// Maps endpoints to controllers and enforces role-based access.
// ============================================================================

import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  toggleAccess
} from '../controllers/employee.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createEmployeeSchema, updateEmployeeSchema, toggleAccessSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// ALL endpoints in the Employee Management module require ADMIN access
// See API Contract: "3. Employee Management > Access: ADMIN only for all endpoints"
router.use(protect);
router.use(authorizeRoles('ADMIN'));

router.route('/')
  .get(getEmployees)
  .post(validate(createEmployeeSchema), createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(validate(updateEmployeeSchema), updateEmployee);

router.patch('/:id/toggle-access', validate(toggleAccessSchema), toggleAccess);

export default router;
