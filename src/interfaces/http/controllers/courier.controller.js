// ============================================================================
// File: src/interfaces/http/controllers/courier.controller.js
// Description: HTTP controllers mapping to Courier service block.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import courierService from '../../../modules/courier/courier.service.js';

// @desc    Get all courier partners
// @route   GET /api/v1/courier-partners
// @access  Private/Admin,Operator,Courier
export const getCouriers = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 20);
  const search = req.query.search || '';

  const couriers = await courierService.getCouriers(page, limit, search);
  
  res.status(200).json({
    success: true,
    data: couriers.data,
    meta: {
      total: couriers.total,
      page,
      limit
    }
  });
});

// @desc    Get courier partner by ID
// @route   GET /api/v1/courier-partners/:id
// @access  Private/Admin,Operator,Courier
export const getCourierById = asyncHandler(async (req, res) => {
  const courier = await courierService.getCourierById(req.params.id);
  
  res.status(200).json({
    success: true,
    data: courier
  });
});

// @desc    Create new courier partner
// @route   POST /api/v1/courier-partners
// @access  Private/Admin,Operator
export const createCourier = asyncHandler(async (req, res) => {
  const courier = await courierService.createCourier(req.body);
  
  res.status(201).json({
    success: true,
    data: courier
  });
});

// @desc    Update courier partner
// @route   PUT /api/v1/courier-partners/:id
// @access  Private/Admin,Operator
export const updateCourier = asyncHandler(async (req, res) => {
  const courier = await courierService.updateCourier(req.params.id, req.body);
  
  res.status(200).json({
    success: true,
    data: courier
  });
});

// @desc    Delete courier partner
// @route   DELETE /api/v1/courier-partners/:id
// @access  Private/Admin,Operator
export const deleteCourier = asyncHandler(async (req, res) => {
  await courierService.deleteCourier(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Courier partner successfully removed'
  });
});
