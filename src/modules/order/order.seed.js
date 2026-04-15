// ============================================================================
// File: src/modules/order/order.seed.js
// Description: In-memory seed data for mocking DB operations in Order module.
// Field names align with db_schema_v1: Party_master, order_master,
// receiver_details, order_items, parcel_details.
// ============================================================================

/**
 * Mock Party_master entries (unified senders/receivers).
 * Maps to: Party_master table (PkPartyId, CustomerName, PhoneNo, AddressLine1, City, State, Pincode)
 */
export const seedParties = [
  {
    id: 1,
    customerName: 'Ramesh Textiles',
    phoneNo: '9876543210',
    addressLine1: '14, Gandhi Nagar',
    addressLine2: 'Near Railway Station',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395002',
    isActive: true
  },
  {
    id: 2,
    customerName: 'Delhi Fabrics Ltd.',
    phoneNo: '9123456780',
    addressLine1: '45, Karol Bagh',
    addressLine2: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110005',
    isActive: true
  }
];

/**
 * Mock order_master entries.
 * Maps to: order_master (PkOrderId, OrderCode, FkSenderId, SenderName, SenderMobile, TotalAmount)
 * ⚠️ NO status column — order status is DERIVED from parcel states.
 */
export const seedOrders = [
  {
    id: 1,
    orderCode: 'ORD-20260330-001',
    fkSenderId: 1,
    senderName: 'Ramesh Textiles',
    senderMobile: '9876543210',
    senderAddress: '14, Gandhi Nagar, Near Railway Station, Surat, Gujarat 395002',
    fkCourierId: 1,
    totalAmount: 3650.00,
    createdBy: 'EMP001',
    createdAt: new Date('2026-03-30T10:00:00Z'),
    isActive: true
  }
];

/**
 * Mock receiver_details entries.
 * Maps to: receiver_details (PkReceiverDetailsId, FkOrderId, ReceiverName, ReceiverPhone, AddressLine1, ...)
 */
export const seedReceivers = [
  {
    id: 1,
    fkOrderId: 1,
    receiverName: 'Delhi Fabrics Ltd.',
    receiverPhone: '9123456780',
    addressLine1: '45, Karol Bagh',
    addressLine2: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110005',
    country: 'India',
    isActive: true
  },
  {
    id: 2,
    fkOrderId: 1,
    receiverName: 'Mumbai Silk House',
    receiverPhone: '9988776655',
    addressLine1: '22, Linking Road',
    addressLine2: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    country: 'India',
    isActive: true
  }
];

/**
 * Mock order_items entries.
 * Maps to: order_items (PkOrderItemId, FkReceiverDetailsId, FkProductId, OutwardQty, UnitPrice)
 */
export const seedOrderItems = [
  { id: 1, fkReceiverDetailsId: 1, fkProductId: 1, outwardQty: 5, unitPrice: 420.00 },
  { id: 2, fkReceiverDetailsId: 1, fkProductId: 3, outwardQty: 2, unitPrice: 1100.00 },
  { id: 3, fkReceiverDetailsId: 2, fkProductId: 1, outwardQty: 3, unitPrice: 450.00 }
];

/**
 * Mock parcel_details entries.
 * Maps to: parcel_details (PkParcelDetailsId, FkReceiverDetailsId, FkCourierId, TrackingNo, QRCode, FkParcelStatusId, LabelPrintCount)
 * ✅ 1 receiver = 1 parcel
 */
export const seedParcels = [
  {
    id: 1,
    fkReceiverDetailsId: 1,
    fkCourierId: 1,
    parcel_id: 'PDS-A1B2C3',
    trackingNo: null,
    fkParcelStatusId: null,    // Will resolve to lu_details.LuDetailsId for "PENDING"
    parcelStatusCode: 'PENDING',
    labelPrintCount: 0,
    dispatchDate: null,
    createdBy: 'EMP001',
    createdAt: new Date('2026-03-30T10:00:00Z')
  },
  {
    id: 2,
    fkReceiverDetailsId: 2,
    fkCourierId: 1,
    parcel_id: 'PDS-D4E5F6',
    trackingNo: null,
    fkParcelStatusId: null,
    parcelStatusCode: 'PENDING',
    labelPrintCount: 0,
    dispatchDate: null,
    createdBy: 'EMP001',
    createdAt: new Date('2026-03-30T10:00:00Z')
  }
];
