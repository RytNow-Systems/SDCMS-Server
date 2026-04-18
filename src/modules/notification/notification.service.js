// ============================================================================
// File: src/modules/notification/notification.service.js
// Description: Business logic layer for the Notification module.
// Handles {AWB} template replacement and orchestrates notification sending.
// ============================================================================

import notificationRepository from './notification.repository.js';
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
      receiverId: log.FkReceiverDetailsId || log.receiverId,
      notificationTypeId: log.FkNotificationTypeId || log.notificationTypeId,
      appStatusId: log.AppStatusId || log.appStatusId,
      smsStatusId: log.SmsStatusId || log.smsStatusId,
      emailStatusId: log.EmailStatusId || log.emailStatusId,
      requestedBy: log.RequestedBy || log.requestedBy,
      lastNotificationTime: log.LastNotificationTime || log.lastNotificationTime,
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

    // Fetch parcel details (using mapped SP)
    const [parcelRows] = await db.execute('CALL prc_parcel_details_get(?, ?)', [1, parcelId]);
    const parcel = parcelRows[0]?.[0];

    if (!parcel) {
      const error = new Error('Parcel not found');
      error.statusCode = 404;
      throw error;
    }

    if (!parcel.TrackingNo && !parcel.trackingNo) {
      const error = new Error('No AWB linked to this parcel. Cannot send notification.');
      error.statusCode = 400;
      throw error;
    }

    const trackingNo = parcel.TrackingNo || parcel.trackingNo;
    const courierId = parcel.FkCourierId || parcel.fkCourierId;
    const receiverPhone = parcel.ReceiverPhone || parcel.receiverPhone;

    // Fetch Courier Template (directly from DB since repo might be mocked)
    const [courierRows] = await db.execute('SELECT TrackingUrlTemplate FROM courier_partner_master WHERE CourierId = ?', [courierId]);
    const template = courierRows[0]?.[0]?.TrackingUrlTemplate || 'https://track.it/{AWB}';

    // Perform replacement
    const trackingUrl = template.replace('{AWB}', trackingNo);

    // Mock sending logic (e.g., calling an SMS/Email provider)
    console.log(`[NOTIFICATION] Sending tracking link: ${trackingUrl} to ${receiverPhone || 'unknown'}`);

    // Log the event
    const logEntry = await notificationRepository.createOrUpdateNotification({
      parcelId: parcel.PkParcelDetailsId || parcel.id,
      receiverId: parcel.FkReceiverDetailsId || parcel.receiverId || 1,
      notificationTypeId: 1, // Dispatch Notification
      appStatusId: 1, // Sent
      smsStatusId: 1, // Sent
      requestedBy: user?.employeeCode || 'SYSTEM',
      lastNotificationTime: new Date()
    });

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
    const log = await notificationRepository.getNotificationById(notificationId);
    if (!log) {
      const error = new Error('Notification log entry not found');
      error.statusCode = 404;
      throw error;
    }

    // Re-trigger the logic
    const parcelId = log.FkParcelDetailsId || log.parcelId;
    return await this.sendNotification(parcelId, user);
  }

  /**
   * Get history for a parcel.
   * 
   * @param {number|string} parcelId 
   */
  async getParcelNotifications(parcelId) {
    const logs = await notificationRepository.getNotificationsByParcelId(parcelId);
    return logs.map(log => this._mapToApi(log));
  }

  /**
   * Handle incoming webhook updates from delivery partners/sms gateways.
   * 
   * @param {object} payload 
   */
  async handleWebhook(payload) {
    // Example payload: { externalId: 'SMS_123', status: 'delivered', notificationId: 45 }
    const { notificationId, status } = payload;

    const statusMap = {
      'delivered': 2,
      'failed': 3,
      'sent': 1
    };

    const dbStatus = statusMap[(status || '').toLowerCase()] || 0;

    const updatedLog = await notificationRepository.createOrUpdateNotification({
      notificationId,
      appStatusId: dbStatus,
      smsStatusId: dbStatus,
      emailStatusId: dbStatus
    });

    return this._mapToApi(updatedLog);
  }
}

export default new NotificationService();
