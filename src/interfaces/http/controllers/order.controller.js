// ============================================================================
// File: src/interfaces/http/controllers/order.controller.js
// Description: Express route handlers for Order module endpoints.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// All responses use the standard envelope: { success, data?, error? }
// ============================================================================

import asyncHandler from 'express-async-handler';
import orderService from '../../../modules/order/order.service.js';

/**
 * POST /api/v1/orders
 * Creates a complex order (sender → order → receivers → items → parcels).
 */
export const createOrder = asyncHandler(async (req, res) => {
  const result = await orderService.createOrder(req.body, req.user);
  res.status(201).json({ success: true, data: result });
});

/**
 * GET /api/v1/orders
 * Lists all orders with derived statuses, paginated.
 * Maps to: prc_GetAllOrdersSummary
 */
export const getOrderList = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    search: req.query.search || null,
    sortBy: req.query.sortBy || 'created_at',
    sortOrder: req.query.sortOrder || 'desc'
  };

  const { data, total } = await orderService.getOrderSummaryList(filters);

  res.json({
    success: true,
    data,
    meta: {
      page: filters.page,
      limit: filters.limit,
      totalRows: total,
      totalPages: Math.ceil(total / filters.limit)
    }
  });
});

/**
 * GET /api/v1/orders/:id
 * Gets full order aggregate (nested JSON: Order → Receivers → [Items, Parcel]).
 * Maps to: prc_GetOrderAggregate
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const orderDetails = await orderService.getOrderDetails(req.params.id);
  res.json({ success: true, data: orderDetails });
});

/**
 * PUT /api/v1/orders/:id
 * Updates an existing order (before dispatch threshold).
 * Maps to: prc_UpdateComplexOrder
 * ❗ Fails if any parcel status ≥ AWB_LINKED
 */
export const updateOrder = asyncHandler(async (req, res) => {
  const result = await orderService.updateOrder(req.params.id, req.body, req.user);
  res.json({ success: true, data: result });
});

/**
 * PATCH /api/v1/orders/:id/cancel
 * Cancels entire order and cascades to all parcels.
 * Maps to: prc_CancelOrder
 * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED
 */
export const cancelOrder = asyncHandler(async (req, res) => {
  const result = await orderService.cancelOrder(req.params.id, req.user);
  res.json({ success: true, data: result });
});
