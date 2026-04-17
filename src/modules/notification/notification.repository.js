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
//   - prc_Notification_log_set (upsert)
//   - prc_Notification_log_get (pAction=1 by parcel, pAction=2 by ID)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// ============================================================================
let mockNotifications = [
  {
    PkNotificationId: 1,
    FkParcelDetailsId: 1,
    FkReceiverDetailsId: 1,
    NotificationType: 'SMS',
    SmsStatus: 'SENT',
    EmailStatus: 'PENDING',
    AppStatus: 'PENDING',
    NotificationLevel: 1,
    IsActive: 1,
    RequestedBy: 'SYSTEM',
    CreatedDate: '2026-04-10T10:00:00Z'
  }
];

class NotificationRepository {
  /**
   * Upsert a notification log entry.
   * Procedure: CALL prc_Notification_log_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   * 
   * @param {object} params - Notification parameters.
   * @returns {Promise<object>} The created or updated notification record.
   */
  async createOrUpdateNotification(params) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Notification_log_set
    // REPOSITORY INJECTION SITE:
    // This method is the single point of entry for mutation on Notification_log.
    // It maps the domain object to the flat parameter list for the SP.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Notification_log_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        params.notificationId || 0,
        params.parcelId,
        params.receiverId || null,
        params.notificationTypeId || 1,
        params.clientId || null,
        params.plantId || null,
        params.reasonId || null,
        params.reasonDetailsId || null,
        params.appStatusId || 0,
        params.smsStatusId || 0,
        params.emailStatusId || 0,
        params.notificationLevel || 1,
        params.isActive !== undefined ? params.isActive : 1,
        params.requestedBy || 'SYSTEM',
        params.isPaymentCheck || 0,
        params.lastNotificationTime || null
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory upsert
    // ------------------------------------------------------------------
    if (params.notificationId && params.notificationId > 0) {
      const index = mockNotifications.findIndex(n => n.PkNotificationId === params.notificationId);
      if (index !== -1) {
        mockNotifications[index] = { ...mockNotifications[index], ...params };
        return mockNotifications[index];
      }
    }

    const newId = mockNotifications.length > 0 ? Math.max(...mockNotifications.map(n => n.PkNotificationId)) + 1 : 1;
    const notification = {
      PkNotificationId: newId,
      FkParcelDetailsId: params.parcelId,
      FkReceiverDetailsId: params.receiverId || null,
      NotificationType: 'SMS',
      SmsStatus: 'PENDING',
      EmailStatus: 'PENDING',
      AppStatus: 'PENDING',
      NotificationLevel: params.notificationLevel || 1,
      IsActive: params.isActive !== undefined ? params.isActive : 1,
      RequestedBy: params.requestedBy || 'SYSTEM',
      CreatedDate: new Date().toISOString()
    };
    mockNotifications.push(notification);
    return notification;
  }

  /**
   * Retrieve notification history for a specific parcel.
   * Procedure: CALL prc_Notification_log_get(?, ?)
   * 
   * @param {number|string} parcelId - The ID of the parcel.
   * @returns {Promise<Array>} List of notification logs.
   */
  async getNotificationsByParcelId(parcelId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Notification_log_get (pAction=1)
    // REPOSITORY INJECTION SITE:
    // Fetches history using pAction=1 as per api_procedure_spec.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Notification_log_get(?, ?)', [
        1, // pAction = 1 (Get by ParcelId)
        parcelId
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
   * Procedure: CALL prc_Notification_log_get(?, ?)
   * 
   * @param {number|string} notificationId - The ID of the notification.
   * @returns {Promise<object>} The notification record.
   */
  async getNotificationById(notificationId) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_Notification_log_get (pAction=2)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_Notification_log_get(?, ?)', [
        2, // pAction = 2 (Get by ID)
        notificationId
      ]);
      return rows[0][0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by ID
    // ------------------------------------------------------------------
    return mockNotifications.find(n => n.PkNotificationId === parseInt(notificationId)) || null;
  }
}

export default new NotificationRepository();
