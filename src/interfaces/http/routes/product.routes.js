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
  updateProductStatus,
  updateVariationStatus,
  getProductDropdown,
  searchProducts,
  addProductVariation,
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
  productVariationSchema,
  createCategorySchema,
  createColorSchema,
  createUnitSchema,
  statusToggleSchema
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

// Product name autosuggest for typeahead (returns deduplicated names)
router.get('/search', searchProducts);

// Product + Category combined dropdown (Feature E)
router.get('/dropdown', getProductDropdown);

router.route('/:id')
  .get(getProductById)
  .put(validate(updateProductSchema), updateProduct);

router.patch('/:id/status', validate(statusToggleSchema), updateProductStatus);

// Color/Size matrix variation for a specific product
router.post('/:id/variations', validate(productVariationSchema), addProductVariation);

// Toggle specific variation status
router.patch('/:id/variations/:variationId/status', validate(statusToggleSchema), updateVariationStatus);

export default router;
