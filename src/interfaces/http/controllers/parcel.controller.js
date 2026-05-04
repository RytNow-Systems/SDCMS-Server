// ============================================================================
// File: src/interfaces/http/controllers/parcel.controller.js
// Description: Express route handlers for the Parcel module (API Contract §8).
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// All responses use the standard envelope: { success, data?, error? }
//
// Covers Sprint 3 (retrieval, label data, timeline, log-print) and
// Sprint 4 (scan+AWB, dispatch, terminal states).
// ============================================================================

import asyncHandler from 'express-async-handler';
import parcelService from '../../../modules/parcel/parcel.service.js';

/**
 * GET /api/v1/parcels
 * Lists all parcels with pagination and optional filters.
 * Maps to: prc_parcel_details_get (pAction=0)
 */
export const getParcelList = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    search: req.query.search?.trim() || null,
    status: req.query.status?.trim() || null,
    sortBy: req.query.sortBy || 'created_at',
    sortOrder: req.query.sortOrder || 'desc'
  };

  const { data, total } = await parcelService.getParcelList(filters);

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
 * GET /api/v1/parcels/:id
 * Gets details of a specific parcel.
 * Maps to: prc_parcel_details_get (pAction=1)
 */
export const getParcelById = asyncHandler(async (req, res) => {
  const data = await parcelService.getParcelDetails(req.params.id);
  res.json({ success: true, data });
});

/**
 * GET /api/v1/parcels/:id/label-data
 * Gets stitched label data for frontend rendering.
 * Maps to: prc_parcel_details_get (pAction=2)
 * Backend does NOT generate QR images — frontend responsibility.
 */
export const getLabelData = asyncHandler(async (req, res) => {
  const data = await parcelService.getLabelData(req.params.id);
  res.json({ success: true, data });
});

/**
 * GET /api/v1/parcels/:id/timeline
 * Gets Amazon-style chronological event timeline for a parcel.
 * Maps to: prc_receiver_status_details_get (pAction=1)
 */
export const getTimeline = asyncHandler(async (req, res) => {
  const data = await parcelService.getTimeline(req.params.id);
  res.json({ success: true, data });
});

/**
 * POST /api/v1/parcels/:id/log-print
 * Logs a label print event and transitions parcel to LABEL_PRINTED.
 * Maps to: prc_parcel_details_set
 * Effects: increments LabelPrintCount, triggers prc_receiver_status_details_set.
 */
export const logPrint = asyncHandler(async (req, res) => {
  const data = await parcelService.logLabelPrint(req.params.id, req.user);
  res.json({ success: true, data });
});

/**
 * POST /api/v1/parcels/scan
 * Atomic two-scan operation: QR scan + AWB link.
 * Maps to: prc_parcel_details_set
 * Role-based: COURIER → auto-dispatch, OPERATOR/ADMIN → AWB_LINKED only.
 */
export const scanParcel = asyncHandler(async (req, res) => {
  const data = await parcelService.scanAndLinkAWB(req.body, req.user);
  res.json({ success: true, data });
});

/**
 * POST /api/v1/parcels/dispatch
 * Dispatches parcels in bulk (single or multiple).
 * Maps to: prc_parcel_details_set
 * Updates status to DISPATCHED, stamps DispatchDate.
 */
export const dispatchParcels = asyncHandler(async (req, res) => {
  const data = await parcelService.dispatchParcels(req.body.parcelDetailsIds, req.user);
  res.json({ success: true, data });
});

/**
 * PATCH /api/v1/parcels/:id/deliver
 * Marks parcel as DELIVERED (terminal state).
 * Maps to: prc_parcel_details_set
 * Business rule: parcel must be DISPATCHED.
 */
export const deliverParcel = asyncHandler(async (req, res) => {
  const data = await parcelService.deliverParcel(req.params.id, req.user);
  res.json({ success: true, data });
});

/**
 * PATCH /api/v1/parcels/:id/cancel
 * Marks parcel as CANCELLED.
 * Maps to: prc_parcel_details_set (trigger 5)
 * Business rule: only from PENDING, LABEL_PRINTED, or AWB_LINKED.
 */
export const cancelParcel = asyncHandler(async (req, res) => {
  const data = await parcelService.cancelParcel(req.params.id, req.user);
  res.json({ success: true, data });
});
