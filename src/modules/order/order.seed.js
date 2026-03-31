// Seed Data for Mocking DB operations in Order Repository

export const seedCustomers = [
  { id: 1, name: 'Jane Doe', mobile: '+1234567890' },
  { id: 2, name: 'Company Inc.', mobile: '+1987654321' }
];

export const seedOrders = [
  { 
    id: 1, 
    order_number: 'ORD-1711894000', 
    customer_id: 1, 
    courier_service: 'FedEx', 
    status: 'SHIPPED', 
    created_at: new Date('2026-03-30T10:00:00Z') 
  }
];

export const seedReceivers = [
  { 
    id: 1, 
    order_id: 1, 
    name: 'Jane Doe', 
    address: '123 Main St, Springfield' 
  },
  { 
    id: 2, 
    order_id: 1, 
    name: 'John Smith', 
    address: '456 Market St, Springfield' 
  }
];

export const seedOrderItems = [
  { id: 1, receiver_id: 1, product_id: 101, quantity: 1 },
  { id: 2, receiver_id: 2, product_id: 102, quantity: 2 }
];

export const seedParcels = [
  { 
    id: 1, 
    order_id: 1, 
    receiver_id: 1, 
    qr_code: 'PDS-A1B2C3', 
    awb_number: 'AWB00001', 
    courier_name: 'FedEx', 
    status: 'DELIVERED' 
  },
  { 
    id: 2, 
    order_id: 1, 
    receiver_id: 2, 
    qr_code: 'PDS-D4E5F6', 
    awb_number: 'AWB00002', 
    courier_name: 'FedEx', 
    status: 'IN_TRANSIT' 
  },
  { 
    id: 3, 
    order_id: 1, 
    receiver_id: 2, 
    qr_code: 'PDS-G7H8I9', 
    awb_number: 'AWB00003', 
    courier_name: 'FedEx', 
    status: 'IN_TRANSIT' 
  }
];
