// ============================================================================
// File: src/modules/parcel/parcel.seed.js
// Description: In-memory seed data for mocking receiver_status_details
// (the append-only event log). Used by parcel module operations.
// Imports parcel/receiver/party data from the order seed module.
// ============================================================================

import {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
} from '../order/order.seed.js';

/**
 * Mock receiver_status_details entries (append-only event log).
 * Maps to: receiver_status_details table
 * (PkReceiverStatusDetailsId, FkParcelDetailsId, FkReceiverDetailsId,
 *  FkOrderStatusId, ActionType, AWBNumber, PreviousStatus, CreatedDate, CreatedBy)
 *
 * ⚠️ APPEND-ONLY: Never update or delete existing entries.
 */
const seedStatusLog = [
  {
    id: 1,
    fkParcelDetailsId: 1,
    fkReceiverDetailsId: 1,
    actionType: 'STATUS_UPDATE',
    awbNumber: null,
    previousStatus: null,
    newStatus: 'PENDING',
    createdBy: 'EMP001',
    createdDate: new Date('2026-03-30T10:00:00Z')
  },
  {
    id: 2,
    fkParcelDetailsId: 2,
    fkReceiverDetailsId: 2,
    actionType: 'STATUS_UPDATE',
    awbNumber: null,
    previousStatus: null,
    newStatus: 'PENDING',
    createdBy: 'EMP001',
    createdDate: new Date('2026-03-30T10:00:00Z')
  }
];

// Re-export order seeds for cross-module access
export {
  seedParcels,
  seedReceivers,
  seedParties,
  seedOrders,
  seedStatusLog
};
