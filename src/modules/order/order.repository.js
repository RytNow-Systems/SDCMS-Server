import { v4 as uuidv4 } from "uuid";

import {
  seedCustomers,
  seedOrderItems,
  seedOrders,
  seedParcels,
  seedReceivers,
} from "./order.seed.js";

class OrderRepository {
  async findOrCreateCustomer(name, mobile) {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const [rows] = await db.execute('CALL sp_find_or_create_customer(?, ?)', [name, mobile]);
    // return rows[0];

    let customer = seedCustomers.find((c) => c.mobile === mobile);
    if (!customer) {
      customer = { id: seedCustomers.length + 1, name, mobile };
      seedCustomers.push(customer);
    }
    return customer;
  }

  async createOrder(customerId, courierService) {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const [rows] = await db.execute('CALL sp_create_order(?, ?)', [customerId, courierService || 'Default']);
    // return rows[0];

    const order = {
      id: seedOrders.length + 1,
      order_number: `ORD-${Date.now()}`,
      customer_id: customerId,
      courier_service: courierService || "Default",
      status: "CREATED",
      created_at: new Date(),
    };
    seedOrders.push(order);
    return order;
  }

  async createReceiver(orderId, name, address) {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const [rows] = await db.execute('CALL sp_create_receiver(?, ?, ?)', [orderId, name, address]);
    // return rows[0];

    const receiver = {
      id: seedReceivers.length + 1,
      order_id: orderId,
      name,
      address,
    };
    seedReceivers.push(receiver);
    return receiver;
  }

  async createOrderItem(receiverId, productId, quantity) {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const [rows] = await db.execute('CALL sp_create_order_item(?, ?, ?)', [receiverId, productId, quantity]);
    // return rows[0];

    const item = {
      id: seedOrderItems.length + 1,
      receiver_id: receiverId, // Linking to receiver directly for this MVP flexibility
      product_id: productId,
      quantity,
    };
    seedOrderItems.push(item);
    return item;
  }

  async createParcel(orderId, receiverId) {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const qrCode = `PDS-${uuidv4().split('-')[0].toUpperCase()}`;
    // const [rows] = await db.execute('CALL sp_create_parcel(?, ?, ?)', [orderId, receiverId, qrCode]);
    // return rows[0];

    const parcel = {
      id: seedParcels.length + 1,
      order_id: orderId,
      receiver_id: receiverId,
      qr_code: `PDS-${uuidv4().split("-")[0].toUpperCase()}`, // Unique string for Frontend to render
      awb_number: null,
      courier_name: null,
      status: "CREATED",
    };
    seedParcels.push(parcel);
    return parcel;
  }

  async findAllOrders() {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const [rows] = await db.execute('CALL sp_get_all_orders_summary()');
    // return rows;

    // Quick mock joining Orders -> Customers -> Receivers -> Parcels
    return seedOrders.map((order) => {
      const customer = seedCustomers.find((c) => c.id === order.customer_id);
      const receivers = seedReceivers.filter((r) => r.order_id === order.id);
      const parcels = seedParcels.filter((p) => p.order_id === order.id);

      return {
        ...order,
        customer_name: customer ? customer.name : "Unknown",
        total_receivers: receivers.length,
        total_parcels: parcels.length,
      };
    });
  }

  /**
   * Complex Aggregate Fetch: Simulates O(N) nested JSON parsing from flat SQL JOINs
   * Maps Customer -> Order -> Receiver -> Products/Parcels
   */
  async findById(orderId) {
    // FUTURE SQL PROCEDURE INTEGRATION:
    // const [rawFlatRows] = await db.execute('CALL sp_get_order_aggregate(?)', [orderId]);
    // // The rawFlatRows would then be mapped below using the O(N) hash map optimization.

    const order = seedOrders.find((o) => o.id === parseInt(orderId));
    if (!order) return null;

    const customer = seedCustomers.find((c) => c.id === order.customer_id);

    // Filter relevant raw flat rows
    const receiversRaw = seedReceivers.filter((r) => r.order_id === order.id);
    const orderItemsRaw = seedOrderItems.filter((i) =>
      receiversRaw.some((r) => r.id === i.receiver_id),
    );
    const parcelsRaw = seedParcels.filter((p) => p.order_id === order.id);

    // O(N) Hash Map Optimization to map Products & Parcels instantly to their specific exact Receivers
    const receiverMap = new Map();

    receiversRaw.forEach((r) => {
      receiverMap.set(r.id, {
        ...r,
        products: [],
        parcels: [],
      });
    });

    orderItemsRaw.forEach((item) => {
      if (receiverMap.has(item.receiver_id)) {
        receiverMap.get(item.receiver_id).products.push(item);
      }
    });

    parcelsRaw.forEach((parcel) => {
      if (receiverMap.has(parcel.receiver_id)) {
        receiverMap.get(parcel.receiver_id).parcels.push(parcel);
      }
    });

    return {
      order,
      customer,
      receivers: Array.from(receiverMap.values()),
    };
  }

  /*
   * ============================================================================
   * FUTURE BULK SQL PROCEDURE INTEGRATION (TRANSACTIONAL)
   * ============================================================================
   * To avoid multiple round-trips for multi-receiver/multi-product orders:
   *
   * async createFullOrder(orderPayload) {
   *   // Pass the deeply nested object directly to MySQL as JSON
   *   // Inside the SP: START TRANSACTION, JSON_EXTRACT, INSERTs, COMMIT
   *   const [result] = await db.execute('CALL sp_create_complex_order(?)', [
   *     JSON.stringify(orderPayload)
   *   ]);
   *   return result[0];
   * }
   */
}

export default new OrderRepository();
