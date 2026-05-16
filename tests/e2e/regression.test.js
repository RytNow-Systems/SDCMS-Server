// ============================================================================
// File: tests/e2e/regression.test.js
// Description: E2E regression suite for SDCMS Backend.
//   Requires a running server at TEST_BASE_URL (default: http://localhost:5000).
//   Hits the real DB — no mocks. Run after DB migrations or SP changes.
//
// Usage:
//   npm run test:e2e
//
// Notes:
//   - All IDs resolved dynamically in beforeAll — no hardcoded row IDs.
//   - Variation toggle tests reset state — safe to re-run.
//   - Courier POST creates a test record each run — acceptable test noise.
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

// ---------------------------------------------------------------------------
// Dynamic context — resolved once before all tests
// ---------------------------------------------------------------------------

let TOKEN;
let parcelWithHistoryId;       // parcel that has timeline events with previousStatus
let dispatchedParcelId;        // dispatched parcel with trackingNo set
let productId;                 // any active product
let variationId;               // any active variation on that product

beforeAll(async () => {
  // 1. Login
  const { body: loginBody } = await post('/auth/login', {
    email: 'admin@test.com',
    password: 'admin',
  });
  TOKEN = loginBody?.data?.token;
  if (!TOKEN) throw new Error('Login failed — is the server running at ' + BASE + '?');

  // 2. Resolve parcel IDs from live data
  const { body: parcelBody } = await get('/parcels?limit=50', TOKEN);
  const parcels = parcelBody.data || [];

  // Parcel with history: has been printed (labelPrintCount > 0), not cancelled
  const candidate = parcels.find(
    (p) => p.labelPrintCount > 0 && p.status !== 'Cancelled',
  );
  parcelWithHistoryId = candidate?.parcelId ?? null;

  // Dispatched parcel with a real trackingNo
  const dispatched = parcels.find(
    (p) => p.status === 'Dispatched' && p.trackingNo,
  );
  dispatchedParcelId = dispatched?.parcelId ?? null;

  // 3. Resolve product + variation IDs from live data
  const { body: productBody } = await get('/products?limit=1', TOKEN);
  const firstVariation = productBody.data?.[0];
  productId   = firstVariation?.productId   ?? null;
  variationId = firstVariation?.variationId ?? null;
});

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

describe('Auth', () => {
  it('valid credentials return token + ADMIN role', async () => {
    const { status, body } = await post('/auth/login', {
      email: 'admin@test.com',
      password: 'admin',
    });
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.token).toBeDefined();
    expect(body.data.role).toBe('ADMIN');
  });

  it('wrong password returns 401', async () => {
    const { status, body } = await post('/auth/login', {
      email: 'admin@test.com',
      password: 'wrongpassword',
    });
    expect(status).toBe(401);
    expect(body.success).toBe(false);
  });

  it('missing auth header on protected route returns 401', async () => {
    const { status } = await get('/parcels');
    expect(status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// Courier Partners
// ---------------------------------------------------------------------------

describe('Courier Partners', () => {
  it('GET returns only active records (Task 4 regression)', async () => {
    const { status, body } = await get('/courier-partners', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    body.data.forEach((c) => expect(c.isActive).toBe(true));
  });

  it('GET ?includeInactive=true includes inactive records', async () => {
    const { status, body } = await get('/courier-partners?includeInactive=true', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    const hasInactive = body.data.some((c) => c.isActive === false);
    expect(hasInactive).toBe(true);
  });

  it('POST saves phoneNo correctly (Task 3 regression)', async () => {
    const { body } = await post('/courier-partners', {
      courierName: `Regression Courier ${Date.now()}`,
      phoneNo: '9001002003',
      trackingUrlTemplate: 'https://regression.test/{awb}',
    }, TOKEN);
    expect(body.success).toBe(true);
    expect(body.data.phoneNumber).toBe('9001002003');
  });

  it('GET /:id returns 404 for nonexistent courier', async () => {
    const { status, body } = await get('/courier-partners/999999', TOKEN);
    expect(status).toBe(404);
    expect(body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Parcel
// ---------------------------------------------------------------------------

describe('Parcel', () => {
  it('GET list returns paginated data', async () => {
    const { status, body } = await get('/parcels?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.meta.totalRows).toBeGreaterThan(0);
  });

  it('GET /:id returns 404 for nonexistent parcel', async () => {
    const { status, body } = await get('/parcels/999999', TOKEN);
    expect(status).toBe(404);
    expect(body.success).toBe(false);
  });

  it('GET /:id/timeline has previousStatus populated (Task 2 regression)', async () => {
    if (!parcelWithHistoryId) return;
    const { status, body } = await get(`/parcels/${parcelWithHistoryId}/timeline`, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    const withHistory = body.data.filter((e) => e.previousStatus !== null);
    expect(withHistory.length).toBeGreaterThan(0);
  });

  it('GET /:id/label-data returns sender + receiver addresses with trackingNo', async () => {
    if (!dispatchedParcelId) return;
    const { status, body } = await get(`/parcels/${dispatchedParcelId}/label-data`, TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.parcelCode).toBeDefined();
    expect(body.data.to).toBeDefined();
    expect(body.data.from).toBeDefined();
    expect(body.data.trackingNo).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Product Variation Toggle
// ---------------------------------------------------------------------------

describe('Product Variation', () => {
  it('PATCH status deactivate returns populated data — not null (Task 6 regression)', async () => {
    if (!productId || !variationId) return;
    const { status, body } = await patch(
      `/products/${productId}/variations/${variationId}/status`,
      { isActive: false },
      TOKEN,
    );
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).not.toBeNull();
    expect(body.data.variationId).toBe(variationId);
    expect(body.data.isActive).toBe(false);
  });

  it('PATCH status reactivate — restore state after previous test', async () => {
    if (!productId || !variationId) return;
    const { status, body } = await patch(
      `/products/${productId}/variations/${variationId}/status`,
      { isActive: true },
      TOKEN,
    );
    expect(status).toBe(200);
    expect(body.data.isActive).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

describe('Orders', () => {
  it('GET list returns paginated data', async () => {
    const { status, body } = await get('/orders?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('GET /:id returns 404 for nonexistent order', async () => {
    const { status, body } = await get('/orders/999999', TOKEN);
    expect(status).toBe(404);
    expect(body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Senders
// ---------------------------------------------------------------------------

describe('Senders', () => {
  let senderId;

  it('GET list returns active senders with expected shape', async () => {
    const { status, body } = await get('/senders?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    const s = body.data[0];
    expect(s.senderId).toBeDefined();
    expect(s.customerName).toBeDefined();
    expect(s.phoneNo).toBeDefined();
    expect(s.isActive).toBe(true);
    senderId = s.senderId;
  });

  it('GET /:id returns sender with address fields', async () => {
    if (!senderId) return;
    const { status, body } = await get(`/senders/${senderId}`, TOKEN);
    expect(status).toBe(200);
    expect(body.data.senderId).toBe(senderId);
    expect(body.data.address).toBeDefined();
  });

  it('GET /:id/addresses returns address list', async () => {
    if (!senderId) return;
    const { status, body } = await get(`/senders/${senderId}/addresses`, TOKEN);
    expect(status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0].senderAddressId).toBeDefined();
  });

  it('GET /:id returns 404 for nonexistent sender', async () => {
    const { status, body } = await get('/senders/999999', TOKEN);
    expect(status).toBe(404);
    expect(body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Receivers
// ---------------------------------------------------------------------------

describe('Receivers', () => {
  let receiverId;

  it('GET list returns active receivers with expected shape', async () => {
    const { status, body } = await get('/receivers?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    const r = body.data[0];
    expect(r.receiverId).toBeDefined();
    expect(r.customerName).toBeDefined();
    expect(r.isActive).toBe(true);
    receiverId = r.receiverId;
  });

  it('GET /:id/addresses returns address list', async () => {
    if (!receiverId) return;
    const { status, body } = await get(`/receivers/${receiverId}/addresses`, TOKEN);
    expect(status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data[0].receiverAddressId).toBeDefined();
  });

  it('GET /:id returns 404 for nonexistent receiver', async () => {
    const { status, body } = await get('/receivers/999999', TOKEN);
    expect(status).toBe(404);
    expect(body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

describe('Products', () => {
  it('GET list returns variations with expected shape', async () => {
    const { status, body } = await get('/products?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    const p = body.data[0];
    expect(p.productId).toBeDefined();
    expect(p.variationId).toBeDefined();
    expect(p.materialName).toBeDefined();
    expect(p.colorName).toBeDefined();
    expect(p.size).toBeDefined();
    expect(p.isActive).toBe(true);
  });

  it('GET list only returns active products by default', async () => {
    const { body } = await get('/products?limit=20', TOKEN);
    body.data.forEach((p) => expect(p.isActive).toBe(true));
  });
});
