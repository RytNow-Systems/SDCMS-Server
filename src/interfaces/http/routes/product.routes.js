// ============================================================================
// File: src/interfaces/http/routes/product.routes.js
// Description: Routing and RBAC mapping for Product endpoints.
// ============================================================================

import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createProductSchema, updateProductSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Products are accessible by ADMIN and OPERATOR
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

router.route('/')
  .get(getProducts)
  .post(validate(createProductSchema), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(validate(updateProductSchema), updateProduct)
  .delete(deleteProduct);

export default router;
