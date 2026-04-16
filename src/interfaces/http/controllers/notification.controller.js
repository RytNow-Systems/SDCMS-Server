// ============================================================================
// File: src/interfaces/http/controllers/notification.controller.js
// Description: Controller layer for Notification module.
// Maps incoming requests to service methods and handles standardized responses.
// ============================================================================

import asyncHandler from 'express-async-handler';
import notificationService from '../../../modules/notification/notification.service.js';

/**
 * @desc    Send dispatch notification to receiver
 * @route   POST /api/v1/parcels/:id/notify
 * @access  Private (Admin, Operator)
 */
export const send = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await notificationService.sendNotification(id, req.user);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * @desc    Resend a failed notification
 * @route   POST /api/v1/notifications/:id/resend
 * @access  Private (Admin, Operator)
 */
export const resend = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await notificationService.resendNotification(id, req.user);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * @desc    Get notification history for a parcel
 * @route   GET /api/v1/parcels/:id/notifications
 * @access  Private (Admin, Operator)
 */
export const getHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const history = await notificationService.getParcelNotifications(id);

  res.status(200).json({
    success: true,
    data: history
  });
});

/**
 * @desc    Webhook callback for delivery status (Sent/Failed)
 * @route   POST /api/v1/notifications/webhook
 * @access  Public
 */
export const webhook = asyncHandler(async (req, res) => {
  const result = await notificationService.handleWebhook(req.body);

  res.status(200).json({
    success: true,
    data: result
  });
});
