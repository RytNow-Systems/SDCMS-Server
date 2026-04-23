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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || '';

  const products = await productService.getProducts(page, limit, search);
  
  res.status(200).json({
    success: true,
    data: products.data,
    meta: {
      total: products.total,
      page,
      limit
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
  const product = await productService.createProduct(req.body);
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin,Operator
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  
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
  await productService.deleteProduct(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Product successfully removed'
  });
});
