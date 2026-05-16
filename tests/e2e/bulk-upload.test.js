// ============================================================================
// File: tests/e2e/bulk-upload.test.js
// Description: E2E tests for the Bulk Upload module.
//   Requires a running server at TEST_BASE_URL (default: http://localhost:5000).
//   Hits the real DB — no mocks.
//
// Coverage:
//   POST /bulk-uploads — valid batch, duplicate hash, bad payload, partial failure
//   GET  /bulk-uploads — session list shape
//   GET  /bulk-uploads/:id — session + details
//   GET  /bulk-uploads/:id/errors — error row retrieval + RowData parsing
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

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

let TOKEN;
let senderId, senderAddressId;
let receiver1Id, receiver1AddressId, receiver1Phone;
let variationId1, variationId2;

beforeAll(async () => {
  const { body: loginBody } = await post('/auth/login', {
    email: 'admin@test.com',
    password: 'admin',
  });
  TOKEN = loginBody?.data?.token;
  if (!TOKEN) throw new Error('Login failed — is the server running at ' + BASE + '?');

  // Sender
  const { body: senderBody } = await get('/senders?limit=1', TOKEN);
  const sender = senderBody.data?.[0];
  senderId = sender?.senderId ?? null;
  receiver1Phone = sender?.phoneNo ?? '9000000000';

  if (senderId) {
    const { body: addrBody } = await get(`/senders/${senderId}/addresses`, TOKEN);
    senderAddressId = addrBody.data?.[0]?.senderAddressId ?? null;
  }

  // Receiver
  const { body: receiverBody } = await get('/receivers?limit=1', TOKEN);
  const receiver = receiverBody.data?.[0];
  receiver1Id = receiver?.receiverId ?? null;
  receiver1Phone = receiver?.phoneNo ?? receiver1Phone;

  if (receiver1Id) {
    const { body: addrBody } = await get(`/receivers/${receiver1Id}/addresses`, TOKEN);
    receiver1AddressId = addrBody.data?.[0]?.receiverAddressId ?? null;
  }

  // Products
  const { body: productBody } = await get('/products?limit=2', TOKEN);
  variationId1 = productBody.data?.[0]?.variationId ?? null;
  variationId2 = productBody.data?.[1]?.variationId ?? null;
}, 20000);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const validRow = () => ({
  senderId,
  senderAddressId,
  receivers: [
    {
      receiverId: receiver1Id,
      receiverAddressId: receiver1AddressId,
      receiverPhone: receiver1Phone,
      products: [
        { variationId: variationId1, quantity: 1 },
        { variationId: variationId2, quantity: 2 },
      ],
    },
  ],
});

// ---------------------------------------------------------------------------
// POST /bulk-uploads
// ---------------------------------------------------------------------------

describe('Bulk Upload — POST', () => {
  let sessionHash;
  let sessionId;

  it('valid batch (2 rows) returns 201 with successfulOrders=2, failedRows=0', async () => {
    if (!senderId || !senderAddressId || !receiver1Id || !receiver1AddressId || !variationId1) return;

    sessionHash = `TEST_${Date.now()}`;
    const { status, body } = await post(
      '/bulk-uploads',
      {
        sessionHash,
        fileName: 'e2e_test_batch.json',
        rows: [validRow(), validRow()],
      },
      TOKEN,
    );

    expect(status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.sessionId).toBeDefined();
    expect(body.data.successfulOrders).toBe(2);
    expect(body.data.failedRows).toBe(0);
    sessionId = body.data.sessionId;
  });

  it('duplicate sessionHash → 409', async () => {
    if (!sessionHash) return;

    const { status, body } = await post(
      '/bulk-uploads',
      {
        sessionHash,
        fileName: 'e2e_test_batch.json',
        rows: [validRow()],
      },
      TOKEN,
    );

    expect(status).toBe(409);
    expect(body.success).toBe(false);
  });

  it('missing sessionHash → 400 (Zod validation)', async () => {
    const { status, body } = await post(
      '/bulk-uploads',
      {
        fileName: 'no_hash.json',
        rows: [validRow()],
      },
      TOKEN,
    );

    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  it('empty rows array → 400 (Zod validation)', async () => {
    const { status, body } = await post(
      '/bulk-uploads',
      { sessionHash: `EMPTY_${Date.now()}`, rows: [] },
      TOKEN,
    );

    expect(status).toBe(400);
    expect(body.success).toBe(false);
  });

  it('missing auth → 401', async () => {
    const { status } = await post('/bulk-uploads', {
      sessionHash: `NOAUTH_${Date.now()}`,
      rows: [validRow()],
    });
    expect(status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// POST /bulk-uploads — partial failure
// ---------------------------------------------------------------------------

describe('Bulk Upload — Partial Failure', () => {
  let partialSessionId;

  it('1 valid + 1 bad-variationId row → successfulOrders=1, failedRows=1', async () => {
    if (!senderId || !senderAddressId || !receiver1Id || !receiver1AddressId || !variationId1) return;

    const badRow = {
      senderId,
      senderAddressId,
      receivers: [
        {
          receiverId: receiver1Id,
          receiverAddressId: receiver1AddressId,
          receiverPhone: receiver1Phone,
          products: [{ variationId: 999999, quantity: 1 }],
        },
      ],
    };

    const { status, body } = await post(
      '/bulk-uploads',
      {
        sessionHash: `PARTIAL_${Date.now()}`,
        fileName: 'e2e_partial.json',
        rows: [validRow(), badRow],
      },
      TOKEN,
    );

    expect(status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.successfulOrders).toBe(1);
    expect(body.data.failedRows).toBe(1);
    partialSessionId = body.data.sessionId;
  });

  it('GET /:id/errors — failed row logged with parsed rowData', async () => {
    if (!partialSessionId) return;

    const { status, body } = await get(
      `/bulk-uploads/${partialSessionId}/errors`,
      TOKEN,
    );

    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThanOrEqual(1);

    const err = body.data[0];
    expect(err.errorMessage).toBeDefined();
    expect(err.rowData).toBeDefined();
    expect(typeof err.rowData).toBe('object');
  });
});

// ---------------------------------------------------------------------------
// GET /bulk-uploads
// ---------------------------------------------------------------------------

describe('Bulk Upload — GET sessions', () => {
  it('GET list returns sessions with expected shape', async () => {
    const { status, body } = await get('/bulk-uploads', TOKEN);

    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data.sessions)).toBe(true);
    expect(body.data.totalCount).toBeGreaterThan(0);

    const s = body.data.sessions[0];
    expect(s.sessionId).toBeDefined();
    expect(s.sessionHash).toBeDefined();
    expect(s.totalRows).toBeDefined();
    expect(s.uploadedAt).toBeDefined();
  });

  it('GET /:id returns sessionDetails + createdOrderIds for known session', async () => {
    const { body: listBody } = await get('/bulk-uploads', TOKEN);
    const firstId = listBody.data?.sessions?.[0]?.sessionId;
    if (!firstId) return;

    const { status, body } = await get(`/bulk-uploads/${firstId}`, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.sessionDetails).toBeDefined();
    expect(body.data.sessionDetails.sessionId).toBe(firstId);
    expect(Array.isArray(body.data.createdOrderIds)).toBe(true);
  });

  it('GET /:id returns 404 for nonexistent session', async () => {
    const { status, body } = await get('/bulk-uploads/999999', TOKEN);
    expect(status).toBe(404);
    expect(body.success).toBe(false);
  });
});
