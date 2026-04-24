// ============================================================================
// File: src/modules/notification/notification.service.js
// Description: Business logic layer for the Notification module.
// Handles {AWB} template replacement and orchestrates notification sending.
// ============================================================================

import notificationRepository from './notification.repository.js';
import parcelRepository from '../parcel/parcel.repository.js';
import db from '../../infrastructure/database/db.js';

class NotificationService {
  /**
   * Internal mapper to standardize PascalCase DB columns to camelCase API structure.
   */
  _mapToApi(log) {
    if (!log) return null;
    return {
      notificationId: log.PkNotificationLogId || log.id || log.notificationId,
      parcelId: log.FkParcelDetailsId || log.parcelId,
      recipientPhone: log.RecipientPhone || log.recipientPhone,
      notificationChannel: log.NotificationChannel || log.notificationChannel,
      messageContent: log.MessageContent || log.messageContent,
      statusId: log.FkNotificationStatusId || log.statusId,
      requestedBy: log.RequestedBy || log.requestedBy,
      createdAt: log.CreatedDate || log.createdAt || log.createdDate
    };
  }

  /**
   * Send a notification for a specific parcel.
   * 
   * @param {number|string} parcelId - The parcel being notified.
   * @param {object} user - The authenticated user triggering the notification.
   * @returns {Promise<object>} Result of the notification attempt.
   */
  async sendNotification(parcelId, user) {
    // ------------------------------------------------------------------
    // SERVICE LOGIC: Template Replacement
    // 1. Fetch parcel and courier tracking template.
    // 2. Replace {AWB} in template.
    // 3. Log attempt to Notification_log via Repository.
    // ------------------------------------------------------------------

    // Fetch parcel details using the repository (supports mock mode)
    const parcel = await parcelRepository.findById(parcelId);

    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }

    const trackingNo = parcel.TrackingNo || parcel.trackingNo;
    if (!trackingNo) {
      const error = new Error('No AWB linked to this parcel. Cannot send notification.');
      error.statusCode = 400;
      throw error;
    }

    const courierId = parcel.FkCourierId || parcel.fkCourierId || parcel.courierId;
    const receiverPhone = parcel.ReceiverPhone || parcel.receiverPhone;

    if (!receiverPhone) {
      const error = new Error('No receiver phone number found for this parcel.');
      error.statusCode = 400;
      throw error;
    }

    // Fetch Courier Template
    // Note: If courier_partner_master is not yet in a repository, we use db.execute
    // but we should ideally have a courierRepository.
    let template = 'https://track.it/{AWB}';
    if (process.env.USE_MOCK_DB !== 'true') {
      const [courierRows] = await db.execute('SELECT TrackingUrlTemplate FROM courier_partner_master WHERE CourierId = ?', [courierId]);
      template = courierRows[0]?.[0]?.TrackingUrlTemplate || template;
    }

    // Perform replacement
    const trackingUrl = template.replace('{AWB}', trackingNo);
    const messageContent = `Your parcel is dispatched. Track here: ${trackingUrl}`;

    // Trigger external SMS/Email/WhatsApp gateway API calls here (Mocked)
    console.log(`[NOTIFICATION] Sending tracking link: ${trackingUrl} to ${receiverPhone}`);

    // Log the event
    const logEntry = await notificationRepository.logNotification({
      parcelId: parcel.PkParcelDetailsId || parcel.id,
      recipientPhone: receiverPhone,
      notificationChannel: 'SMS',
      messageContent: messageContent,
      statusId: 1 // Sent
    }, user?.employeeCode || 1);

    return {
      message: 'Notification sent successfully',
      trackingUrl,
      logEntry: this._mapToApi(logEntry)
    };
  }

  /**
   * Resend a specific notification.
   * 
   * @param {number|string} notificationId - The ID of the log entry.
   * @param {object} user - The authenticated user.
   */
  async resendNotification(notificationId, user) {
    const log = await notificationRepository.findById(notificationId);
    if (!log) {
      const error = new Error('Notification log entry not found');
      error.statusCode = 404;
      throw error;
    }

    // Re-trigger the logic using the same parcel
    const parcelId = log.FkParcelDetailsId || log.parcelId;
    return await this.sendNotification(parcelId, user);
  }

  /**
   * Get history for a parcel.
   * 
   * @param {number|string} parcelId 
   */
  async getParcelNotifications(parcelId) {
    const logs = await notificationRepository.getHistoryByParcelId(parcelId);
    return logs.map(log => this._mapToApi(log));
  }

  /**
   * Handle incoming webhook updates from delivery partners/sms gateways.
   * 
   * @param {object} payload 
   */
  async handleWebhook(payload) {
    const { notificationId, status } = payload;

    const statusMap = {
      'sent': 1,
      'delivered': 2,
      'failed': 3
    };

    const statusId = statusMap[(status || '').toLowerCase()] || 1;

    const updatedLog = await notificationRepository.updateWebhookStatus(notificationId, statusId);
    
    if (!updatedLog) {
      const error = new Error('Original notification not found');
      error.statusCode = 404;
      throw error;
    }

    return this._mapToApi(updatedLog);
  }
}

export default new NotificationService();
