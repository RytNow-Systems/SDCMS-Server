// ============================================================================
// File: src/modules/notification/notification.service.js
// Description: Business logic layer for the Notification module.
// Handles {AWB} template replacement and orchestrates notification sending.
// ============================================================================

import notificationRepository from "./notification.repository.js";
import parcelRepository from "../parcel/parcel.repository.js";
import db from "../../infrastructure/database/db.js";

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
      createdAt: log.CreatedDate || log.createdAt || log.createdDate,
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
    // SERVICE LOGIC: Orchestration
    // ------------------------------------------------------------------
    const parcel = await this._getAndValidateParcel(parcelId);
    const trackingUrl = await this._generateTrackingUrl(parcel);
    const messageContent = `Your parcel is dispatched. Track here: ${trackingUrl}`;

    // Trigger external SMS/Email gateway API calls (Mocked)
    console.log(
      `[NOTIFICATION] Sending tracking link: ${trackingUrl} to ${parcel.receiverPhone}`,
    );

    const logEntry = await notificationRepository.logNotification(
      {
        parcelId: parcel.parcelId,
        recipientPhone: parcel.receiverPhone,
        notificationChannel: "SMS",
        messageContent: messageContent,
        statusId: 1, // Sent
      },
      user?.employeeCode || 1,
    );

    return {
      message: "Notification sent successfully",
      trackingUrl,
      logEntry: this._mapToApi(logEntry),
    };
  }

  /**
   * Internal helper to fetch and validate parcel for notification.
   * @private
   */
  async _getAndValidateParcel(parcelId) {
    const parcel = await parcelRepository.findById(parcelId);
    if (!parcel) throw this._error("Parcel not found", 404);

    const trackingNo = parcel.TrackingNo || parcel.trackingNo;
    if (!trackingNo) throw this._error("No AWB linked to this parcel", 400);

    const receiverPhone = parcel.ReceiverPhone || parcel.receiverPhone;
    if (!receiverPhone)
      throw this._error("No receiver phone number found", 400);

    return {
      parcelId: parcel.PkParcelDetailsId || parcel.id,
      trackingNo,
      receiverPhone,
      courierId: parcel.FkCourierId || parcel.fkCourierId || parcel.courierId,
    };
  }

  /**
   * Internal helper to generate the tracking URL from template.
   * @private
   */
  async _generateTrackingUrl(parcel) {
    let template = "https://track.it/{AWB}";

    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "SELECT TrackingUrlTemplate FROM courier_partner_master WHERE CourierId = ?",
        [parcel.courierId],
      );
      template = rows[0]?.[0]?.TrackingUrlTemplate || template;
    }

    return template.replace("{AWB}", parcel.trackingNo);
  }

  /**
   * Resend a specific notification.
   *
   * @param {number|string} notificationId - The ID of the log entry.
   * @param {object} user - The authenticated user.
   */
  async resendNotification(notificationId, user) {
    const log = await notificationRepository.findById(notificationId);
    if (!log) throw this._error("Notification log entry not found", 404);

    return await this.sendNotification(
      log.FkParcelDetailsId || log.parcelId,
      user,
    );
  }

  /**
   * Get history for a parcel.
   * @param {number|string} parcelId
   */
  async getParcelNotifications(parcelId) {
    const logs = await notificationRepository.getHistoryByParcelId(parcelId);
    return logs.map((log) => this._mapToApi(log));
  }

  /**
   * Handle incoming webhook updates.
   * @param {object} payload
   */
  async handleWebhook(payload) {
    const { notificationId, status } = payload;
    const statusMap = { sent: 1, delivered: 2, failed: 3 };
    const statusId = statusMap[(status || "").toLowerCase()] || 1;

    const updatedLog = await notificationRepository.updateWebhookStatus(
      notificationId,
      statusId,
    );
    if (!updatedLog) throw this._error("Original notification not found", 404);

    return this._mapToApi(updatedLog);
  }

  /**
   * Internal helper to create structured errors.
   * @private
   */
  _error(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}

export default new NotificationService();
