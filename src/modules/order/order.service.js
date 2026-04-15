// ============================================================================
// File: src/modules/order/order.service.js
// Description: Business logic layer for the Order module.
// Orchestrates repository calls and enforces business rules.
// All business logic lives in stored procedures — this layer validates
// and translates API payloads into procedure parameters.
// ============================================================================

import orderRepository from './order.repository.js';
// TODO: Import logger once infrastructure/logger module is implemented
// import logger from '../../infrastructure/logger/logger.js';

class OrderService {
  /**
   * Process a new complex order creation.
   * Maps API Contract §7.2 payload → prc_CreateComplexOrder flow.
   *
   * Flow: find-or-create sender → create order → add receivers → add items → generate parcels.
   * In production, this entire flow is handled atomically by prc_CreateComplexOrder.
   *
   * @param {object} payload - Validated order payload from Zod schema.
   * @param {object} user - Authenticated user from JWT (req.user).
   * @returns {object} Created order with nested receivers and parcels.
   */
  async createOrder(payload, user) {
    const { senderName, senderMobile, senderAddress, courierId, products, receivers } = payload;
    const createdBy = user?.employeeCode || null;

    // Step 1: Find-or-create the sender in Party_master
    const sender = await orderRepository.findOrCreateParty({
      senderName,
      senderMobile,
      createdBy
    });

    // Step 2: Create the order header
    const order = await orderRepository.createOrder({
      senderId: sender.id,
      senderName,
      senderMobile,
      senderAddress,
      courierId,
      createdBy
    });

    // Step 3: Build receiver list
    // If no receivers provided, default to sender-as-receiver (Mode A / Mode C)
    let receiversList = receivers;
    if (!receiversList || receiversList.length === 0) {
      if (!products || products.length === 0) {
        const error = new Error('An order must contain products at the root level if no explicit receivers are assigned.');
        error.statusCode = 400;
        throw error;
      }

      receiversList = [{
        receiverName: senderName,
        receiverPhone: senderMobile,
        addressLine1: senderAddress,
        products
      }];
    }

    // Step 4: Process each receiver → items → parcel
    const aggregatedReceivers = [];
    let totalAmount = 0;

    for (const rec of receiversList) {
      const receiverRecord = await orderRepository.createReceiver(order.id, {
        receiverName: rec.receiverName,
        receiverPhone: rec.receiverPhone || null,
        addressLine1: rec.addressLine1 || null,
        addressLine2: rec.addressLine2 || null,
        city: rec.city || null,
        state: rec.state || null,
        pincode: rec.pincode || null,
        country: rec.country || 'India'
      });

      const savedItems = [];

      for (const prod of rec.products || []) {
        const item = await orderRepository.createOrderItem(
          receiverRecord.id,
          prod.productId,
          prod.quantity,
          prod.unitPrice || null
        );
        savedItems.push(item);

        // Accumulate total
        totalAmount += (prod.unitPrice || 0) * (prod.quantity || 0);
      }

      // 1 receiver = 1 parcel (Systemflow Part 3, Step 5)
      const parcel = await orderRepository.createParcel(receiverRecord.id, courierId);

      aggregatedReceivers.push({
        ...receiverRecord,
        items: savedItems,
        parcel
      });
    }

    return {
      orderId: order.id,
      orderCode: order.orderCode,
      totalAmount,
      senderName: order.senderName,
      receivers: aggregatedReceivers
    };
  }

  /**
   * Get paginated order summary list with derived statuses.
   * Maps to prc_GetAllOrdersSummary.
   *
   * @param {object} filters - { page, limit, search, sortBy, sortOrder }
   * @returns {object} { data: [...], total: number }
   */
  async getOrderSummaryList(filters) {
    return await orderRepository.findAllOrders(filters);
  }

  /**
   * Get full order aggregate by ID (nested JSON).
   * Maps to prc_GetOrderAggregate.
   *
   * @param {number|string} orderId
   * @returns {object} Full nested order aggregate.
   * @throws {Error} 404 if order not found.
   */
  async getOrderDetails(orderId) {
    const data = await orderRepository.findById(orderId);
    if (!data) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return data;
  }

  /**
   * Update an existing order.
   * Maps to prc_UpdateComplexOrder.
   *
   * ❗ Business rule: Must fail if any parcel status ≥ AWB_LINKED.
   * This is enforced in both the repository mock and the stored procedure.
   *
   * @param {number|string} orderId
   * @param {object} payload - Updated order data.
   * @returns {object} Updated order record.
   * @throws {Error} 404 if order not found, 400 if update blocked.
   */
  async updateOrder(orderId, payload) {
    const result = await orderRepository.updateOrder(orderId, payload);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return result;
  }

  /**
   * Cancel an order and cascade to all parcels.
   * Maps to prc_CancelOrder.
   *
   * ❌ Cannot cancel if any parcel is DISPATCHED or DELIVERED.
   * ✔ Cascades cancellation to all parcels.
   * ✔ Logs each status change to receiver_status_details.
   *
   * @param {number|string} orderId
   * @param {object} user - Authenticated user from JWT (req.user).
   * @returns {object} Cancellation result.
   * @throws {Error} 404 if order not found, 400 if cancellation blocked.
   */
  async cancelOrder(orderId, user) {
    const cancelledBy = user?.employeeCode || 'SYSTEM';
    const result = await orderRepository.cancelOrder(orderId, cancelledBy);
    if (!result) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return result;
  }
}

export default new OrderService();
