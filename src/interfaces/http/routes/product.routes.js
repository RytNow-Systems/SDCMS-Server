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
  deleteProduct,
  getProductDropdown,
  addProductMatrix,
  getProductCategories,
  createProductCategory,
  getProductUnits,
  createProductUnit,
  getProductColors,
  createProductColor
} from '../controllers/product.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import {
  createProductSchema,
  updateProductSchema,
  productMatrixSchema,
  createCategorySchema,
  createColorSchema,
  createUnitSchema
} from '../validations/validation.schemas.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Products are accessible by ADMIN and OPERATOR
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

// Product metadata endpoints
router.route('/categories')
  .get(getProductCategories)
  .post(validate(createCategorySchema), createProductCategory);

router.route('/units')
  .get(getProductUnits)
  .post(validate(createUnitSchema), createProductUnit);

router.route('/colors')
  .get(getProductColors)
  .post(validate(createColorSchema), createProductColor);

router.route('/')
  .get(getProducts)
  .post(validate(createProductSchema), createProduct);

// Product + Category combined dropdown (Feature E)
router.get('/dropdown', getProductDropdown);

router.route('/:id')
  .get(getProductById)
  .put(validate(updateProductSchema), updateProduct)
  .delete(deleteProduct);

// Color/Size matrix variation for a specific product
router.post('/:id/matrix', validate(productMatrixSchema), addProductMatrix);

export default router;
