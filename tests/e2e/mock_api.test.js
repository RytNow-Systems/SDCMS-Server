// ============================================================================
// File: tests/e2e/mock_api.test.js
// Description: End-to-End mock-mode test suite for SDCMS Backend.
// Environment: USE_MOCK_DB=true (no live MySQL required).
// Framework: Jest + Supertest
// Targets: Auth (Login/Profile), System (Health), Master Data (Products,
//          Employees, Couriers), Orders, Parcel Lifecycle.
// ============================================================================

import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import jwt from 'jsonwebtoken';

// ============================================================================
// ENV SETUP — Must be set BEFORE dynamic import of app
// ============================================================================
process.env.USE_MOCK_DB = 'true';
process.env.JWT_SECRET = 'e2e-test-secret-key-sdcms-2026';
process.env.JWT_EXPIRES_IN = '1h';
process.env.NODE_ENV = 'test';

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Generate a JWT directly (bypasses login API for isolated endpoint testing).
 * Uses the same signing logic as shared/utils/generateToken.js.
 *
 * @param {number} employeeCode - EmployeeCode to encode in the token.
 * @returns {string} Signed JWT.
 */
const generateTestToken = (employeeCode) =>
  jwt.sign({ id: employeeCode }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

// Pre-generated tokens matching mock seed EmployeeCodes:
//   EmployeeCode 1 = Admin User   (RoleCode: ADMIN)
//   EmployeeCode 2 = Test Operator (RoleCode: OPERATOR)
const ADMIN_TOKEN = generateTestToken(1);
const OPERATOR_TOKEN = generateTestToken(2);

// Token for a non-existent employee (for 401 tests)
const INVALID_USER_TOKEN = generateTestToken(99999);

// ============================================================================
// APP IMPORT (dynamic — env vars must be set first)
// ============================================================================
let app;

beforeAll(async () => {
  const module = await import('../../src/app.js');
  app = module.default;
});

// ============================================================================
// ██████ 1. SYSTEM HEALTH ██████
// ============================================================================
describe('1. System Health', () => {
  it('1.1  GET /api/v1/system/health → 200 with status UP', async () => {
    const res = await request(app).get('/api/v1/system/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.status).toBe('UP');
  });

  it('1.2  GET /api/v1/nonexistent → 404 from notFound middleware', async () => {
    const res = await request(app).get('/api/v1/nonexistent');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 2. AUTH — LOGIN ██████
// ============================================================================
describe('2. Auth — Login', () => {
  it('2.1  POST /api/v1/auth/login → 200 with valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com', password: 'securePass123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.email).toBe('admin@example.com');
  });

  it('2.2  POST /api/v1/auth/login → 401 with wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com', password: 'wrongPassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('2.3  POST /api/v1/auth/login → 400 with missing password (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('2.4  POST /api/v1/auth/login → 401 with non-existent email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody@example.com', password: 'anyPassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 3. AUTH — PROFILE ██████
// ============================================================================
describe('3. Auth — Profile', () => {
  it('3.1  GET /api/v1/auth/profile → 401 without token', async () => {
    const res = await request(app).get('/api/v1/auth/profile');

    expect(res.statusCode).toBe(401);
  });

  it('3.2  GET /api/v1/auth/profile → 200 with valid ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('3.3  GET /api/v1/auth/profile → 401 with token for non-existent user', async () => {
    const res = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${INVALID_USER_TOKEN}`);

    expect(res.statusCode).toBe(401);
  });
});

// ============================================================================
// ██████ 4. MASTER DATA — PRODUCTS ██████
// ============================================================================
describe('4. Products CRUD', () => {
  it('4.1  GET /api/v1/products → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('4.2  POST /api/v1/products → 201 creates a new product', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ productName: 'Test Widget', materialRate: 99.99 });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('4.3  GET /api/v1/products/1 → 200 gets product by ID', async () => {
    const res = await request(app)
      .get('/api/v1/products/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });
});

// ============================================================================
// ██████ 5. MASTER DATA — EMPLOYEES ██████
// ============================================================================
describe('5. Employees', () => {
  it('5.1  GET /api/v1/employees → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('5.2  GET /api/v1/employees/1 → 200 gets employee by ID', async () => {
    const res = await request(app)
      .get('/api/v1/employees/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('5.3  GET /api/v1/employees → 403 with OPERATOR token (ADMIN only)', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${OPERATOR_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 6. MASTER DATA — COURIERS ██████
// ============================================================================
describe('6. Couriers', () => {
  it('6.1  GET /api/v1/courier-partners → 200 with authenticated token', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('6.2  POST /api/v1/courier-partners → 201 creates a new courier', async () => {
    const res = await request(app)
      .post('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        courierName: 'TestCourier Express',
        trackingUrlTemplate: 'https://track.testcourier.com/awb/{AWB}',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

// ============================================================================
// ██████ 7. ORDERS ██████
// ============================================================================
describe('7. Orders', () => {
  it('7.1  GET /api/v1/orders → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('7.2  POST /api/v1/orders → 201 creates a new order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderName: 'E2E Test Sender',
        senderMobile: '9000000001',
        courierId: 1,
        receivers: [
          {
            receiverName: 'E2E Test Receiver',
            receiverPhone: '9000000002',
            addressLine1: '1 Test Street',
            city: 'TestCity',
            state: 'TestState',
            pincode: '100001',
            products: [{ productId: 1, qty: 2, unitPrice: 100 }],
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('7.3  GET /api/v1/orders/1 → 200 gets order aggregate by ID', async () => {
    const res = await request(app)
      .get('/api/v1/orders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('7.4  GET /api/v1/orders → 401 without token', async () => {
    const res = await request(app).get('/api/v1/orders');

    expect(res.statusCode).toBe(401);
  });
});

// ============================================================================
// ██████ 8. PARCELS — READ ██████
// ============================================================================
describe('8. Parcels — Read', () => {
  it('8.1  GET /api/v1/parcels → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/parcels')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('8.2  GET /api/v1/parcels/1 → 200 gets parcel by ID', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('8.3  GET /api/v1/parcels/1/label-data → 200 gets label data', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1/label-data')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('8.4  GET /api/v1/parcels/1/timeline → 200 gets event timeline', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1/timeline')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('8.5  GET /api/v1/parcels/99999 → 404 on non-existent parcel', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
  });
});

// ============================================================================
// ██████ 9. PARCELS — LIFECYCLE (State Transitions) ██████
// Exercises the full state machine:
//   PENDING → LABEL_PRINTED → AWB_LINKED → DISPATCHED → DELIVERED
// Uses seed parcel ID 1 (PDS-A1B2C3, status: PENDING)
// ============================================================================
describe('9. Parcels — Lifecycle', () => {
  it('9.1  POST /api/v1/parcels/1/log-print → 200 transitions to LABEL_PRINTED', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/1/log-print')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    // Verify the status changed
    if (res.body.data) {
      expect(res.body.data.status).toBe('LABEL_PRINTED');
    }
  });

  it('9.2  POST /api/v1/parcels/scan → 200 links AWB to LABEL_PRINTED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        qrCode: 'PDS-A1B2C3',     // seed parcel_id for parcel 1
        awbNumber: 'AWB-E2E-001',  // unique AWB
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('9.3  POST /api/v1/parcels/dispatch → 200 dispatches AWB_LINKED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [1] });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('9.4  PATCH /api/v1/parcels/1/deliver → 200 marks as DELIVERED', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/1/deliver')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ============================================================================
// ██████ 10. PARCELS — VALIDATION / NEGATIVE PATHS ██████
// ============================================================================
describe('10. Parcels — Validation', () => {
  it('10.1 POST /api/v1/parcels/scan → 400 with missing qrCode (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ awbNumber: 'AWB-ZZZ' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('10.2 POST /api/v1/parcels/dispatch → 400 with empty parcelIds', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // Parcel 2 is still PENDING — cannot dispatch without AWB
  it('10.3 POST /api/v1/parcels/dispatch → 400 dispatching PENDING parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [2] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('10.4 PATCH /api/v1/parcels/2/cancel → 200 cancels PENDING parcel', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/2/cancel')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
