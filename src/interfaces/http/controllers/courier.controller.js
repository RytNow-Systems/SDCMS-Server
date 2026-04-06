// ============================================================================
// File: src/interfaces/http/controllers/courier.controller.js
// Description: HTTP controllers mapping to Courier service block.
// ============================================================================

import courierService from '../../../modules/courier/courier.service.js';

// @desc    Get all courier partners
// @route   GET /api/v1/courier-partners
// @access  Private/Admin,Operator,Courier
export const getCouriers = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc    Get courier partner by ID
// @route   GET /api/v1/courier-partners/:id
// @access  Private/Admin,Operator,Courier
export const getCourierById = async (req, res, next) => {
  try {
    const courier = await courierService.getCourierById(req.params.id);
    
    res.status(200).json({
      success: true,
      data: courier
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new courier partner
// @route   POST /api/v1/courier-partners
// @access  Private/Admin,Operator
export const createCourier = async (req, res, next) => {
  try {
    const courier = await courierService.createCourier(req.body);
    
    res.status(201).json({
      success: true,
      data: courier
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update courier partner
// @route   PUT /api/v1/courier-partners/:id
// @access  Private/Admin,Operator
export const updateCourier = async (req, res, next) => {
  try {
    const courier = await courierService.updateCourier(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      data: courier
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete courier partner
// @route   DELETE /api/v1/courier-partners/:id
// @access  Private/Admin,Operator
export const deleteCourier = async (req, res, next) => {
  try {
    await courierService.deleteCourier(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Courier partner successfully removed'
    });
  } catch (error) {
    next(error);
  }
};
