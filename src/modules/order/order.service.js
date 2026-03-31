import orderRepository from './order.repository.js';

class OrderService {
  async processNewOrder(payload) {
    const { senderName, senderMobile, senderAddress, courierService, products, receivers } = payload;

    // 1. Customer
    const customer = await orderRepository.findOrCreateCustomer(senderName, senderMobile);

    // 2. Order
    const order = await orderRepository.createOrder(customer.id, courierService);

    let receiversList = receivers;
    // Default to sender if no receivers provided
    if (!receiversList || receiversList.length === 0) {
      if (!products || products.length === 0) {
        const error = new Error('An order must contain products at the root level if no explicit receivers are assigned.');
        error.statusCode = 400;
        throw error;
      }

      receiversList = [{
        receiverName: senderName,
        deliveryAddress: senderAddress,
        products: products
      }];
    }

    const aggregatedReceivers = [];

    // 3. Receivers, Products & Parcels Generation
    for (const rec of receiversList) {
      const receiverRecord = await orderRepository.createReceiver(order.id, rec.receiverName, rec.deliveryAddress);

      const savedProducts = [];
      const generatedParcels = [];

      for (const prod of rec.products || []) {
        // Save items
        const item = await orderRepository.createOrderItem(receiverRecord.id, prod.productId, prod.quantity);
        savedProducts.push(item);

        // Simple Rule: 1 Physical Parcel per Product Quantity in MVP
        // If they order 2 Apples and 1 Banana, we generate 3 Parcels (3 QR labels)
        for (let i = 0; i < prod.quantity; i++) {
          const parcel = await orderRepository.createParcel(order.id, receiverRecord.id);
          generatedParcels.push(parcel);
        }
      }

      aggregatedReceivers.push({
        ...receiverRecord,
        products: savedProducts,
        parcels: generatedParcels
      });
    }

    return {
      order,
      customer,
      receivers: aggregatedReceivers
    };
  }

  async getOrderSummaryList() {
    return await orderRepository.findAllOrders();
  }

  async getOrderDetails(orderId) {
    const data = await orderRepository.findById(orderId);
    if (!data) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
}

export default new OrderService();
