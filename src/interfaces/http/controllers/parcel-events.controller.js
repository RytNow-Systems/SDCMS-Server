// ============================================================================
// File: src/interfaces/http/controllers/parcel-events.controller.js
// Description: Express route handlers for the Parcel Events & Audit Export
// module (API Contract §11). Reads from receiver_status_details.
// Uses express-async-handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import parcelService from '../../../modules/parcel/parcel.service.js';

/**
 * GET /api/v1/parcel-events
 * Browse system-wide events from receiver_status_details (paginated, filtered).
 * Maps to: prc_receiver_status_details_get (pAction=0)
 *
 * Filters: dateFrom, dateTo, actionType, scannedBy
 */
export const browseEvents = asyncHandler(async (req, res) => {
  const filters = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 50,
    dateFrom: req.query.dateFrom || null,
    dateTo: req.query.dateTo || null,
    actionType: req.query.actionType?.trim() || null,
    scannedBy: req.query.scannedBy?.trim() || null
  };

  const { data, total } = await parcelService.browseEvents(filters);

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
 * GET /api/v1/parcel-events/export
 * Download events as CSV file for end-of-day auditing.
 * Columns: EventID, ParcelID, OrderCode, ActionType, AWBNumber,
 *          PreviousStatus, NewStatus, ScannedBy, Timestamp
 */
export const exportCSV = asyncHandler(async (req, res) => {
  const filters = {
    dateFrom: req.query.dateFrom || null,
    dateTo: req.query.dateTo || null,
    actionType: req.query.actionType?.trim() || null,
    scannedBy: req.query.scannedBy?.trim() || null
  };

  const { data } = await parcelService.browseEvents(filters);

  // CSV header row
  const csvHeader = 'EventID,ParcelID,OrderCode,ActionType,AWBNumber,PreviousStatus,NewStatus,ScannedBy,Timestamp';

  // CSV data rows — escape commas in values
  const csvRows = data.map((row) => {
    return [
      row.id,
      row.parcelId || '',
      row.orderCode || '',
      row.actionType || '',
      row.awbNumber || '',
      row.previousStatus || '',
      row.newStatus || '',
      row.scannedBy || '',
      row.timestamp ? new Date(row.timestamp).toISOString() : ''
    ].join(',');
  });

  const csvContent = [csvHeader, ...csvRows].join('\n');

  // Set headers for CSV download
  const timestamp = new Date().toISOString().split('T')[0];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="parcel-events-${timestamp}.csv"`);
  res.send(csvContent);
});
