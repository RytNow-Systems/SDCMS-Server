// ============================================================================
// File: src/interfaces/http/controllers/product.controller.js
// Description: HTTP controllers mapping to Product service block.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import productService from '../../../modules/product/product.service.js';

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Private/Admin,Operator
export const getProducts = asyncHandler(async (req, res) => {
  const categoryId = parseInt(req.query.categoryId) || 0;
  const unitId = parseInt(req.query.unitId) || 0;

  const products = await productService.getProducts(categoryId, unitId);
  
  res.status(200).json({
    success: true,
    data: products.data,
    meta: {
      total: products.total,
      categoryId,
      unitId
    }
  });
});

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Private/Admin,Operator
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin,Operator
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user.id);
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin,Operator
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.user.id);
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Get products + categories combined dropdown (search-friendly)
// @route   GET /api/v1/products/dropdown
// @access  Private/Admin,Operator
export const getProductDropdown = asyncHandler(async (req, res) => {
  const search = req.query.search || '';
  const items = await productService.getProductDropdown(search);

  res.status(200).json({
    success: true,
    data: items
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin,Operator
export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.user.id);
  
  res.status(200).json({
    success: true,
    message: 'Product successfully removed'
  });
});

// @desc    Add or update a product color/size matrix variation
// @route   POST /api/v1/products/:id/matrix
// @access  Private/Admin,Operator
export const addProductMatrix = asyncHandler(async (req, res) => {
  const variation = await productService.addOrUpdateColorMatrix(
    parseInt(req.params.id),
    req.body,
    req.user.id
  );

  const status = req.body.matrixId ? 200 : 201;
  res.status(status).json({
    success: true,
    data: variation
  });
});

// @desc    Get all product categories
// @route   GET /api/v1/products/categories
// @access  Private/Admin,Operator
export const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await productService.getCategories();
  res.status(200).json({
    success: true,
    data: categories
  });
});

// @desc    Get all product units
// @route   GET /api/v1/products/units
// @access  Private/Admin,Operator
export const getProductUnits = asyncHandler(async (req, res) => {
  const units = await productService.getUnits();
  res.status(200).json({
    success: true,
    data: units
  });
});
