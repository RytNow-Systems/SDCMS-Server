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
//   - Variation toggle tests (Product suite) reset state — safe to re-run.
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

const del = async (path, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: headers(token),
  });
  return { status: r.status, body: await r.json() };
};

// ---------------------------------------------------------------------------
// Setup — login once, share token across all suites
// ---------------------------------------------------------------------------

let TOKEN;

beforeAll(async () => {
  const { body } = await post('/auth/login', {
    email: 'admin@test.com',
    password: 'admin',
  });
  TOKEN = body?.data?.token;
  if (!TOKEN) throw new Error('Login failed — is the server running at ' + BASE + '?');
});

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

describe('Auth', () => {
  it('valid credentials return token + role', async () => {
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

  it('missing auth header returns 401', async () => {
    const { status } = await get('/parcels');
    expect(status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// Courier Partners
// ---------------------------------------------------------------------------

describe('Courier Partners', () => {
  it('GET /courier-partners returns only active records (Task 4 regression)', async () => {
    const { status, body } = await get('/courier-partners', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    body.data.forEach((c) => expect(c.isActive).toBe(true));
  });

  it('GET /courier-partners?includeInactive=true includes inactive records', async () => {
    const { status, body } = await get('/courier-partners?includeInactive=true', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    const hasInactive = body.data.some((c) => c.isActive === false);
    expect(hasInactive).toBe(true);
  });

  it('POST /courier-partners saves phoneNo correctly (Task 3 regression)', async () => {
    const { status, body } = await post('/courier-partners', {
      courierName: `Regression Courier ${Date.now()}`,
      phoneNo: '9001002003',
      trackingUrlTemplate: 'https://regression.test/{awb}',
    }, TOKEN);
    expect(body.success).toBe(true);
    expect(body.data.phoneNumber).toBe('9001002003');
  });
});

// ---------------------------------------------------------------------------
// Parcel — read operations
// ---------------------------------------------------------------------------

describe('Parcel', () => {
  it('GET /parcels returns paginated list', async () => {
    const { status, body } = await get('/parcels?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.meta.totalRows).toBeGreaterThan(0);
  });

  it('GET /parcels/:id/timeline has previousStatus populated (Task 2 regression)', async () => {
    // Parcel 77 had log-print performed — known to have timeline events
    const { status, body } = await get('/parcels/77/timeline', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    const withHistory = body.data.filter((e) => e.previousStatus !== null);
    expect(withHistory.length).toBeGreaterThan(0);
  });

  it('GET /parcels/:id/label-data returns sender + receiver addresses', async () => {
    // Parcel 75 is Dispatched with known label data
    const { status, body } = await get('/parcels/75/label-data', TOKEN);
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
  it('PATCH status returns populated data object — not null (Task 6 regression)', async () => {
    const { status, body } = await patch(
      '/products/1/variations/2/status',
      { isActive: false },
      TOKEN,
    );
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).not.toBeNull();
    expect(body.data.variationId).toBe(2);
    expect(body.data.isActive).toBe(false);
  });

  it('reactivate variation — restore state after previous test', async () => {
    const { status, body } = await patch(
      '/products/1/variations/2/status',
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
  it('GET /orders returns paginated list', async () => {
    const { status, body } = await get('/orders?limit=5', TOKEN);
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });
});
