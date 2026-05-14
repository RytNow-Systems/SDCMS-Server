// ============================================================================
// File: src/interfaces/http/controllers/product.controller.js
// Description: HTTP controllers mapping to Product service block.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from "express-async-handler";
import productService from "../../../modules/product/product.service.js";

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Private/Admin,Operator
export const getProducts = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    categoryId: parseInt(req.query.categoryId) || 0,
    unitId: parseInt(req.query.unitId) || 0,
    includeInactive: req.query.includeInactive === 'true',
  };

  const { data, total } = await productService.getProducts(filters);

  res.status(200).json({
    success: true,
    data,
    meta: {
      page: filters.page,
      limit: filters.limit,
      totalRows: total,
      totalPages: Math.ceil(total / filters.limit),
      categoryId: filters.categoryId,
      unitId: filters.unitId,
    },
  });
});

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Private/Admin,Operator
export const getProductById = asyncHandler(async (req, res) => {
  const options = { includeDeleted: req.query.includeInactive === 'true' };
  const product = await productService.getProductById(req.params.id, options);

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin,Operator
export const createProduct = asyncHandler(async (req, res) => {
  const { size, colorId, materialRate, isActive, ...rest } = req.body;

  const productData = {
    ...rest,
    ...(isActive !== undefined && { isActive }),
    variations: [{ size, colorId, materialRate }],
  };

  const product = await productService.createProduct(productData, req.user.id);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin,Operator
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Autosuggest product names by partial query (typeahead)
// @route   GET /api/v1/products/search?q=<partial>
// @access  Private/Admin,Operator
export const searchProducts = asyncHandler(async (req, res) => {
  const q = req.query.q?.trim() || "";
  const suggestions = await productService.searchProductsByName(q);

  res.status(200).json({
    success: true,
    data: suggestions,
  });
});

// @desc    Get products + categories combined dropdown (search-friendly)
// @route   GET /api/v1/products/dropdown
// @access  Private/Admin,Operator
export const getProductDropdown = asyncHandler(async (req, res) => {
  const search = req.query.search?.trim() || "";
  const items = await productService.getProductDropdown(search);

  res.status(200).json({
    success: true,
    data: items,
  });
});

// @desc    Toggle product active status (soft delete / reactivate)
// @route   PATCH /api/v1/products/:id/status
// @access  Private/Admin,Operator
export const updateProductStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  await productService.updateProductStatus(req.params.id, isActive, req.user.id);

  res.status(200).json({
    success: true,
    message: `Product successfully ${isActive ? 'activated' : 'deactivated'}`,
  });
});

// @desc    Add or update a product color/size matrix variation
// @route   POST /api/v1/products/:id/variations
// @access  Private/Admin,Operator
export const addProductVariation = asyncHandler(async (req, res) => {
  const variation = await productService.addOrUpdateColorMatrix(
    parseInt(req.params.id),
    req.body,
    req.user.id,
  );

  const status = req.body.variationId ? 200 : 201;
  res.status(status).json({
    success: true,
    data: variation,
  });
});

// @desc    Toggle product variation status
// @route   PATCH /api/v1/products/:id/variations/:variationId/status
// @access  Private/Admin,Operator
export const updateVariationStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  const productId = parseInt(req.params.id);
  const variationId = parseInt(req.params.variationId);

  // Fetch current variation to preserve data (including inactive ones for reactivation)
  const product = await productService.getProductById(productId, { includeDeleted: true });
  const variation = product.variations.find(v => v.variationId === variationId);

  if (!variation) {
    const error = new Error("Variation not found");
    error.statusCode = 404;
    throw error;
  }

  await productService.addOrUpdateColorMatrix(
    productId,
    {
      variationId,
      colorId: variation.colorId,
      materialRate: variation.materialRate,
      size: variation.size,
      isActive // This field is handled by setColorMatrix in repository
    },
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: `Variation successfully ${isActive ? 'activated' : 'deactivated'}`,
  });
});

// @desc    Get all product categories
// @route   GET /api/v1/products/categories
// @access  Private/Admin,Operator
export const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await productService.getCategories();
  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Get all product units
// @route   GET /api/v1/products/units
// @access  Private/Admin,Operator
export const getProductUnits = asyncHandler(async (req, res) => {
  const units = await productService.getUnits();
  res.status(200).json({
    success: true,
    data: units,
  });
});

// @desc    Create a new product category
// @route   POST /api/v1/products/categories
// @access  Private/Admin,Operator
export const createProductCategory = asyncHandler(async (req, res) => {
  const category = await productService.createCategory(
    req.body.categoryName,
    req.user.id,
  );
  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc    Get all product colors
// @route   GET /api/v1/products/colors
// @access  Private/Admin,Operator
export const getProductColors = asyncHandler(async (req, res) => {
  const colors = await productService.getColors();
  res.status(200).json({
    success: true,
    data: colors,
  });
});

// @desc    Create a new product color
// @route   POST /api/v1/products/colors
// @access  Private/Admin,Operator
export const createProductColor = asyncHandler(async (req, res) => {
  const color = await productService.createColor(
    req.body.colorName,
    req.body.colorCode || "",
    req.user.id,
  );
  res.status(201).json({
    success: true,
    data: color,
  });
});

// @desc    Create a new unit
// @route   POST /api/v1/products/units
// @access  Private/Admin,Operator
export const createProductUnit = asyncHandler(async (req, res) => {
  const unit = await productService.createUnit(
    req.body.unitTitle,
    req.body.unitCode,
  );
  res.status(201).json({
    success: true,
    data: unit,
  });
});
