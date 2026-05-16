// ============================================================================
// File: tests/e2e/lifecycle.test.js
// Description: E2E lifecycle test for the full Order → Parcel execution flow.
//   Requires a running server at TEST_BASE_URL (default: http://localhost:5000).
//   Hits the real DB — no mocks.
//
// Coverage:
//   Happy Path  — 2 receivers × 2 products each → Print → Scan+AWB → Dispatch
//                 → Deliver → verify derived order status at each step + full timeline.
//   Cancel Path — Create order → Print → Cancel order → verify cascade.
//
// Usage:
//   npm run test:e2e -- --testPathPattern=lifecycle
// ============================================================================

import { describe, it, expect, beforeAll } from '@jest/globals';

const BASE = process.env.TEST_BASE_URL || 'http://localhost:5000/api/v1';

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

const headers = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

const get = async (path, token) => {
  const r = await fetch(`${BASE}${path}`, { headers: headers(token) });
  return { status: r.status, body: await r.json() };
};

const post = async (path, body, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(body),
  });
  return { status: r.status, body: await r.json() };
};

const patch = async (path, body, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method: 'PATCH',
    headers: headers(token),
    body: JSON.stringify(body),
  });
  return { status: r.status, body: await r.json() };
};

const del = async (path, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: headers(token),
  });
  return { status: r.status, body: await r.json() };
};

// ---------------------------------------------------------------------------
// Shared fixtures — resolved once for all lifecycle tests
// ---------------------------------------------------------------------------

let TOKEN;
let senderId, senderAddressId;
let receiver1Id, receiver1AddressId;
let receiver2Id, receiver2AddressId;
let variationId1, variationId2;
let variationId3, variationId4;
let courierId;

beforeAll(async () => {
  const { body: loginBody } = await post('/auth/login', {
    email: 'admin@test.com',
    password: 'admin',
  });
  TOKEN = loginBody?.data?.token;
  if (!TOKEN) throw new Error('Login failed — is the server running at ' + BASE + '?');

  // Sender + sender address
  const { body: senderBody } = await get('/senders?limit=1', TOKEN);
  senderId = senderBody.data?.[0]?.senderId ?? null;
  if (senderId) {
    const { body: senderAddrBody } = await get(`/senders/${senderId}/addresses`, TOKEN);
    senderAddressId = senderAddrBody.data?.[0]?.senderAddressId ?? null;
  }

  // Two distinct receivers + their default addresses
  const { body: receiverBody } = await get('/receivers?limit=5', TOKEN);
  const receivers = receiverBody.data || [];
  receiver1Id = receivers[0]?.receiverId ?? null;
  receiver2Id = receivers[1]?.receiverId ?? null;

  if (receiver1Id) {
    const { body: a1 } = await get(`/receivers/${receiver1Id}/addresses`, TOKEN);
    receiver1AddressId = a1.data?.[0]?.receiverAddressId ?? null;
  }
  if (receiver2Id) {
    const { body: a2 } = await get(`/receivers/${receiver2Id}/addresses`, TOKEN);
    receiver2AddressId = a2.data?.[0]?.receiverAddressId ?? null;
  }

  // Four active variations (2 per receiver)
  const { body: productBody } = await get('/products?limit=4', TOKEN);
  const products = productBody.data || [];
  variationId1 = products[0]?.variationId ?? null;
  variationId2 = products[1]?.variationId ?? null;
  variationId3 = products[2]?.variationId ?? null;
  variationId4 = products[3]?.variationId ?? null;

  // Courier for AWB scan step
  const { body: courierBody } = await get('/courier-partners', TOKEN);
  courierId = courierBody.data?.[0]?.courierId ?? null;
}, 30000);

// ---------------------------------------------------------------------------
// Happy Path: 2 receivers × 2 products → full lifecycle to Delivered
// ---------------------------------------------------------------------------

describe('Order Lifecycle — Happy Path', () => {
  let orderId;
  let parcel1Id, parcel2Id;       // PkParcelDetailsId (numbers for dispatch/deliver)
  let parcel1Code, parcel2Code;   // parcelCode strings (UC-x-y) for scan endpoint
  let awb1, awb2;

  const prereqs = () =>
    senderId && senderAddressId &&
    receiver1Id && receiver1AddressId &&
    receiver2Id && receiver2AddressId &&
    variationId1 && variationId2 &&
    variationId3 && variationId4;

  it('creates order with 2 receivers × 2 products each', async () => {
    if (!prereqs()) return;

    const { status, body } = await post(
      '/orders',
      {
        senderId,
        senderAddressId,
        receivers: [
          {
            receiverId: receiver1Id,
            receiverAddressId: receiver1AddressId,
            products: [
              { variationId: variationId1, quantity: 2 },
              { variationId: variationId2, quantity: 1 },
            ],
          },
          {
            receiverId: receiver2Id,
            receiverAddressId: receiver2AddressId,
            products: [
              { variationId: variationId3, quantity: 3 },
              { variationId: variationId4, quantity: 1 },
            ],
          },
        ],
      },
      TOKEN,
    );

    expect(status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.orderId).toBeDefined();
    orderId = body.data.orderId;
  });

  it('GET /orders/:id — initial derived status is Pending with 2 parcels', async () => {
    if (!orderId) return;

    const { status, body } = await get(`/orders/${orderId}`, TOKEN);
    expect(status).toBe(200);
    expect(body.data.derivedStatus).toBe('Pending');
    expect(body.data.receivers).toHaveLength(2);

    parcel1Id   = body.data.receivers[0]?.parcel?.parcelId;
    parcel2Id   = body.data.receivers[1]?.parcel?.parcelId;
    parcel1Code = body.data.receivers[0]?.parcel?.parcelCode;
    parcel2Code = body.data.receivers[1]?.parcel?.parcelCode;

    expect(parcel1Id).toBeDefined();
    expect(parcel2Id).toBeDefined();
    expect(parcel1Code).toMatch(/^UC-\d+-\d+$/);
    expect(parcel2Code).toMatch(/^UC-\d+-\d+$/);
    expect(body.data.receivers[0].parcel.status).toBe('Pending');
    expect(body.data.receivers[1].parcel.status).toBe('Pending');
  });

  it('log print label — parcel 1 → Label Printed', async () => {
    if (!parcel1Id) return;
    const { status, body } = await post(`/parcels/${parcel1Id}/log-print`, {}, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('Label Printed');
    expect(body.data.labelPrintCount).toBeGreaterThanOrEqual(1);
  });

  it('derived status → Partially Printed (parcel 1 printed, parcel 2 still Pending)', async () => {
    if (!orderId) return;
    const { body } = await get(`/orders/${orderId}`, TOKEN);
    expect(body.data.derivedStatus).toBe('Partially Printed');
  });

  it('log print label — parcel 2 → Label Printed', async () => {
    if (!parcel2Id) return;
    const { status, body } = await post(`/parcels/${parcel2Id}/log-print`, {}, TOKEN);
    expect(status).toBe(200);
    expect(body.data.status).toBe('Label Printed');
  });

  it('derived status → Label Printed after both parcels printed', async () => {
    if (!orderId) return;
    const { body } = await get(`/orders/${orderId}`, TOKEN);
    expect(body.data.derivedStatus).toBe('Label Printed');
  });

  it('scan + AWB link — parcel 1 → AWB Linked', async () => {
    if (!parcel1Code) return;
    awb1 = `LC_AWB1_${Date.now()}`;
    const { status, body } = await post('/parcels/scan', { parcelId: parcel1Code, awbNumber: awb1 }, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('AWB Linked');
    expect(body.data.trackingNo).toBe(awb1);
  });

  it('scan + AWB link — parcel 2 → AWB Linked', async () => {
    if (!parcel2Code) return;
    awb2 = `LC_AWB2_${Date.now()}`;
    const { status, body } = await post('/parcels/scan', { parcelId: parcel2Code, awbNumber: awb2 }, TOKEN);
    expect(status).toBe(200);
    expect(body.data.status).toBe('AWB Linked');
    expect(body.data.trackingNo).toBe(awb2);
  });

  it('dispatch both parcels — returns dispatched count = 2', async () => {
    if (!parcel1Id || !parcel2Id) return;
    const { status, body } = await post(
      '/parcels/dispatch',
      { parcelDetailsIds: [parcel1Id, parcel2Id] },
      TOKEN,
    );
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.dispatched).toBe(2);
  });

  it('derived status → Dispatched after both parcels dispatched', async () => {
    if (!orderId) return;
    const { body } = await get(`/orders/${orderId}`, TOKEN);
    expect(body.data.derivedStatus).toBe('Dispatched');
    expect(body.data.receivers[0].parcel.status).toBe('Dispatched');
    expect(body.data.receivers[1].parcel.status).toBe('Dispatched');
  });

  it('deliver parcel 1 — derived status → Partially Dispatched (parcel 2 still en route)', async () => {
    if (!parcel1Id) return;
    const { status, body } = await patch(`/parcels/${parcel1Id}/deliver`, {}, TOKEN);
    expect(status).toBe(200);
    expect(body.data.status).toBe('Delivered');

    const { body: orderBody } = await get(`/orders/${orderId}`, TOKEN);
    expect(orderBody.data.derivedStatus).toBe('Partially Dispatched');
  });

  it('deliver parcel 2 — derived status → Delivered (all parcels delivered)', async () => {
    if (!parcel2Id) return;
    const { status, body } = await patch(`/parcels/${parcel2Id}/deliver`, {}, TOKEN);
    expect(status).toBe(200);
    expect(body.data.status).toBe('Delivered');

    const { body: orderBody } = await get(`/orders/${orderId}`, TOKEN);
    expect(orderBody.data.derivedStatus).toBe('Delivered');
  });

  it('parcel 1 timeline — 4 events (PRINT_LABEL→AWB_LINK→DISPATCH→DELIVERED) with previousStatus', async () => {
    if (!parcel1Id) return;
    const { status, body } = await get(`/parcels/${parcel1Id}/timeline`, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThanOrEqual(4);

    const actionTypes = body.data.map((e) => e.actionType);
    expect(actionTypes).toContain('PRINT_LABEL');
    expect(actionTypes).toContain('AWB_LINK');
    expect(actionTypes).toContain('DISPATCH');
    expect(actionTypes).toContain('DELIVERED');

    // Every event after the first must have a previousStatus
    const withPrev = body.data.filter((e) => e.previousStatus !== null);
    expect(withPrev.length).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Cancel Path: 2 receivers → Print both → Cancel order → verify full cascade
// ---------------------------------------------------------------------------

describe('Order Lifecycle — Cancel Path', () => {
  let orderId;
  let parcel1Id, parcel2Id;

  const prereqs = () =>
    senderId && senderAddressId &&
    receiver1Id && receiver1AddressId &&
    receiver2Id && receiver2AddressId &&
    variationId1 && variationId2;

  it('creates order with 2 receivers for cancel path', async () => {
    if (!prereqs()) return;

    const { status, body } = await post(
      '/orders',
      {
        senderId,
        senderAddressId,
        receivers: [
          {
            receiverId: receiver1Id,
            receiverAddressId: receiver1AddressId,
            products: [
              { variationId: variationId1, quantity: 1 },
              { variationId: variationId2, quantity: 1 },
            ],
          },
          {
            receiverId: receiver2Id,
            receiverAddressId: receiver2AddressId,
            products: [
              { variationId: variationId3, quantity: 1 },
            ],
          },
        ],
      },
      TOKEN,
    );

    expect(status).toBe(201);
    expect(body.success).toBe(true);
    orderId = body.data.orderId;
  });

  it('resolves both parcel IDs and prints labels', async () => {
    if (!orderId) return;

    const { body: orderBody } = await get(`/orders/${orderId}`, TOKEN);
    parcel1Id = orderBody.data.receivers[0]?.parcel?.parcelId;
    parcel2Id = orderBody.data.receivers[1]?.parcel?.parcelId;
    expect(parcel1Id).toBeDefined();
    expect(parcel2Id).toBeDefined();

    const [r1, r2] = await Promise.all([
      post(`/parcels/${parcel1Id}/log-print`, {}, TOKEN),
      post(`/parcels/${parcel2Id}/log-print`, {}, TOKEN),
    ]);
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
  });

  it('cancel order cascades to all parcels — returns success', async () => {
    if (!orderId) return;
    const { status, body } = await del(`/orders/${orderId}/cancel`, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
  });

  it('GET /orders/:id — derived status → Cancelled, both parcels Cancelled', async () => {
    if (!orderId) return;
    const { body } = await get(`/orders/${orderId}`, TOKEN);
    expect(body.data.derivedStatus).toBe('Cancelled');
    expect(body.data.receivers[0].parcel.status).toBe('Cancelled');
    expect(body.data.receivers[1].parcel.status).toBe('Cancelled');
  });

  it('cancelled parcel 1 rejects further state transitions', async () => {
    if (!parcel1Id) return;
    const { status, body } = await post(`/parcels/${parcel1Id}/log-print`, {}, TOKEN);
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// State Guards: invalid transitions must be rejected with 400
// ---------------------------------------------------------------------------

describe('Order Lifecycle — State Guards', () => {
  let guardParcelId;
  let guardParcelCode;

  beforeAll(async () => {
    if (!senderId || !senderAddressId || !receiver1Id || !receiver1AddressId || !variationId1) return;

    const { body: createBody } = await post(
      '/orders',
      {
        senderId,
        senderAddressId,
        receivers: [
          {
            receiverId: receiver1Id,
            receiverAddressId: receiver1AddressId,
            products: [{ variationId: variationId1, quantity: 1 }],
          },
        ],
      },
      TOKEN,
    );

    const guardOrderId = createBody.data?.orderId;
    if (!guardOrderId) return;

    const { body: orderBody } = await get(`/orders/${guardOrderId}`, TOKEN);
    guardParcelId   = orderBody.data.receivers[0]?.parcel?.parcelId;
    guardParcelCode = orderBody.data.receivers[0]?.parcel?.parcelCode;
  }, 15000);

  // --- Parcel is Pending ---

  it('scan Pending parcel → 400 (must be Label Printed first)', async () => {
    if (!guardParcelCode) return;
    const { status, body } = await post(
      '/parcels/scan',
      { parcelId: guardParcelCode, awbNumber: `GUARD_AWB_${Date.now()}` },
      TOKEN,
    );
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  it('dispatch Pending parcel → 400 (must be AWB Linked first)', async () => {
    if (!guardParcelId) return;
    const { status, body } = await post(
      '/parcels/dispatch',
      { parcelDetailsIds: [guardParcelId] },
      TOKEN,
    );
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  it('deliver Pending parcel → 400 (must be Dispatched first)', async () => {
    if (!guardParcelId) return;
    const { status, body } = await patch(`/parcels/${guardParcelId}/deliver`, {}, TOKEN);
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  // Advance to Label Printed for next group

  it('log print → advance guard parcel to Label Printed', async () => {
    if (!guardParcelId) return;
    const { status, body } = await post(`/parcels/${guardParcelId}/log-print`, {}, TOKEN);
    expect(status).toBe(200);
    expect(body.data.status).toBe('Label Printed');
  });

  // --- Parcel is Label Printed ---

  it('dispatch Label Printed parcel (no AWB) → 400', async () => {
    if (!guardParcelId) return;
    const { status, body } = await post(
      '/parcels/dispatch',
      { parcelDetailsIds: [guardParcelId] },
      TOKEN,
    );
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  it('deliver Label Printed parcel → 400 (must be Dispatched first)', async () => {
    if (!guardParcelId) return;
    const { status, body } = await patch(`/parcels/${guardParcelId}/deliver`, {}, TOKEN);
    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });
});
