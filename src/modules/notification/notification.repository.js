// ============================================================================
// File: src/modules/notification/notification.repository.js
// Description: Data access layer for the Notification module.
// This repository handles all interactions with the `Notification_log` table
// exclusively via defined stored procedures.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory mock data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention:
//   - prc_parcel_notification_log_set (append-only log)
//   - prc_parcel_notification_log_search (search by ID or ParcelId)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// ============================================================================
let mockNotifications = [
  {
    PkNotificationLogId: 1,
    FkParcelDetailsId: 1,
    RecipientPhone: '9876543210',
    NotificationChannel: 'SMS',
    MessageContent: 'Your parcel is dispatched. Track here: https://track.it/AWB123',
    FkNotificationStatusId: 1, // Sent
    RequestedBy: 1,
    CreatedDate: '2026-04-10T10:00:00Z'
  }
];

class NotificationRepository {
  /**
   * Retrieve notification history for a specific parcel.
   * Procedure: CALL prc_parcel_notification_log_search(0, parcelId, 0)
   * 
   * @param {number|string} parcelId - The ID of the parcel.
   * @returns {Promise<Array>} List of notification logs.
   */
  async getHistoryByParcelId(parcelId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_notification_log_search
    // REPOSITORY INJECTION SITE:
    // Fetches history using pPkNotificationLogId=0 and pFkParcelId.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_notification_log_search(?, ?, ?)', [
        0, // pPkNotificationLogId
        parcelId, // pFkParcelId
        0  // pFkNotificationStatusId
      ]);
      return rows[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by parcel
    // ------------------------------------------------------------------
    return mockNotifications.filter(n => n.FkParcelDetailsId === parseInt(parcelId));
  }

  /**
   * Retrieve a specific notification by its ID.
   * Procedure: CALL prc_parcel_notification_log_search(notificationId, 0, 0)
   * 
   * @param {number|string} notificationId - The ID of the notification.
   * @returns {Promise<object>} The notification record.
   */
  async findById(notificationId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_notification_log_search
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_notification_log_search(?, ?, ?)', [
        notificationId, // pPkNotificationLogId
        0, // pFkParcelId
        0  // pFkNotificationStatusId
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by ID
    // ------------------------------------------------------------------
    return mockNotifications.find(n => n.PkNotificationLogId === parseInt(notificationId)) || null;
  }

  /**
   * Log a notification entry.
   * Procedure: CALL prc_parcel_notification_log_set(?, ?, ?, ?, ?, ?)
   * 
   * @param {object} data - Notification parameters.
   * @param {number} adminId - The employee ID who requested the notification.
   * @returns {Promise<object>} The created notification record.
   */
  async logNotification(data, adminId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_parcel_notification_log_set
    // REPOSITORY INJECTION SITE:
    // This procedure acts as an append-only log for notifications.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_parcel_notification_log_set(?, ?, ?, ?, ?, ?)', [
        data.parcelId,
        data.recipientPhone,
        data.notificationChannel || 'SMS',
        data.messageContent,
        data.statusId || 1, // Default to 1 (Sent)
        adminId
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory append
    // ------------------------------------------------------------------
    const newId = mockNotifications.length > 0 ? Math.max(...mockNotifications.map(n => n.PkNotificationLogId)) + 1 : 1;
    const notification = {
      PkNotificationLogId: newId,
      FkParcelDetailsId: data.parcelId,
      RecipientPhone: data.recipientPhone,
      NotificationChannel: data.notificationChannel || 'SMS',
      MessageContent: data.messageContent,
      FkNotificationStatusId: data.statusId || 1,
      RequestedBy: adminId,
      CreatedDate: new Date().toISOString()
    };
    mockNotifications.push(notification);
    return notification;
  }

  /**
   * Update notification status via webhook (Append-only log).
   * 
   * @param {number} notificationId 
   * @param {number} statusId 
   */
  async updateWebhookStatus(notificationId, statusId) {
    const existing = await this.findById(notificationId);
    if (!existing) return null;

    const data = {
      parcelId: existing.FkParcelDetailsId || existing.parcelId,
      recipientPhone: existing.RecipientPhone || existing.recipientPhone,
      notificationChannel: existing.NotificationChannel || existing.notificationChannel,
      messageContent: existing.MessageContent || existing.messageContent,
      statusId: statusId
    };

    return await this.logNotification(data, existing.RequestedBy || existing.requestedBy || 1);
  }
}

export default new NotificationRepository();
