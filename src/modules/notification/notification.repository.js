// ============================================================================
// File: src/modules/notification/notification.repository.js
// Description: Data access layer for the Notification module.
// This repository handles all interactions with the `Notification_log` table
// exclusively via defined stored procedures.
// ============================================================================

import db from '../../infrastructure/database/db.js';

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
    // REPOSITORY INJECTION SITE:
    // This method is the single point of entry for mutation on Notification_log.
    // It maps the domain object to the flat parameter list for the SP.
    // ------------------------------------------------------------------
    const [rows] = await db.execute('CALL prc_Notification_log_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      params.notificationId || 0,
      params.parcelId,
      params.receiverId || null,
      params.notificationTypeId || 1, // Default type
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

    // Return the first row of the first result set (the upserted record)
    return rows[0][0];
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
    // REPOSITORY INJECTION SITE:
    // Fetches history using pAction=1 as per api_procedure_spec.
    // ------------------------------------------------------------------
    const [rows] = await db.execute('CALL prc_Notification_log_get(?, ?)', [
      1, // pAction = 1 (Get by ParcelId)
      parcelId
    ]);

    return rows[0];
  }

  /**
   * Retrieve a specific notification by its ID.
   * Procedure: CALL prc_Notification_log_get(?, ?)
   * 
   * @param {number|string} notificationId - The ID of the notification.
   * @returns {Promise<object>} The notification record.
   */
  async getNotificationById(notificationId) {
    const [rows] = await db.execute('CALL prc_Notification_log_get(?, ?)', [
      2, // pAction = 2 (Assuming Get by ID)
      notificationId
    ]);

    return rows[0][0];
  }
}

export default new NotificationRepository();
