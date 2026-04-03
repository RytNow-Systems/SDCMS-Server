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

const router = express.Router();

// ALL endpoints in the Employee Management module require ADMIN access
// See API Contract: "3. Employee Management > Access: ADMIN only for all endpoints"
router.use(protect);
router.use(authorizeRoles('ADMIN'));

router.route('/')
  .get(getEmployees)
  .post(createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee);

router.patch('/:id/toggle-access', toggleAccess);

export default router;
