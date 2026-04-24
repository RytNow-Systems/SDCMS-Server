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
//   EmployeeCode 3 = Test Courier  (RoleCode: COURIER)
const ADMIN_TOKEN = generateTestToken(1);
const OPERATOR_TOKEN = generateTestToken(2);
const COURIER_TOKEN = generateTestToken(3);

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
  it.skip('1.1  GET /api/v1/system/health → 200 with status UP (skipped: checks live DB connection)', async () => {
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
  it('4.1  GET /api/v1/products → 200 with list', async () => {
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
      .send({ materialName: 'Test Widget', materialRate: 99.99, categoryId: 1, unitId: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.materialName).toBe('Test Widget');
  });

  it('4.3  GET /api/v1/products/1 → 200 gets product by ID', async () => {
    const res = await request(app)
      .get('/api/v1/products/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('4.4  GET /api/v1/products → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('4.5  GET /api/v1/products/99999 → 404 on non-existent product', async () => {
    const res = await request(app)
      .get('/api/v1/products/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('4.6  POST /api/v1/products → 400 with missing materialName (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('4.7  PUT /api/v1/products/1 → 200 updates product', async () => {
    const res = await request(app)
      .put('/api/v1/products/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.materialName).toBe('Updated');
  });

  it('4.8  DELETE /api/v1/products/3 → 200 soft-deletes product', async () => {
    const res = await request(app)
      .delete('/api/v1/products/3')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('4.9  GET /api/v1/products/dropdown → 200 returns dropdown list', async () => {
    const res = await request(app)
      .get('/api/v1/products/dropdown')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('label');
    }
  });

  it('4.10 POST /api/v1/products → 409 on duplicate product', async () => {
    // Create a product
    await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Duplicate Test', materialRate: 10, categoryId: 1 });

    // Try to create it again
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ materialName: 'Duplicate Test', materialRate: 10, categoryId: 1 });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('already exists');
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

  it('5.4  GET /api/v1/employees → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('5.5  GET /api/v1/employees/99999 → 404 on non-existent employee', async () => {
    const res = await request(app)
      .get('/api/v1/employees/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('5.6  POST /api/v1/employees → 201 creates a new employee', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ name: 'New Emp', role: 'OPERATOR', email: 'newemp@example.com', password: 'Test123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('5.7  POST /api/v1/employees → 400 with missing name (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ role: 'OPERATOR', email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('5.8  POST /api/v1/employees → 403 with OPERATOR token', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${OPERATOR_TOKEN}`)
      .send({ name: 'New Emp', role: 'OPERATOR', email: 'test2@example.com', password: 'password123' });

    expect(res.statusCode).toBe(403);
  });

  it('5.9  PUT /api/v1/employees/1 → 200 updates employee', async () => {
    const res = await request(app)
      .put('/api/v1/employees/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ name: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('5.10 PATCH /api/v1/employees/1/toggle-access → 200 toggles access', async () => {
    const res = await request(app)
      .patch('/api/v1/employees/1/toggle-access')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ allowLogin: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('5.11 PATCH /api/v1/employees/1/toggle-access → 400 with missing allowLogin (Zod)', async () => {
    const res = await request(app)
      .patch('/api/v1/employees/1/toggle-access')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
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

  it('6.3  GET /api/v1/courier-partners/1 → 200 gets courier by ID', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('6.4  GET /api/v1/courier-partners/99999 → 404 on non-existent courier', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('6.5  PUT /api/v1/courier-partners/1 → 200 updates courier', async () => {
    const res = await request(app)
      .put('/api/v1/courier-partners/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ courierName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('6.6  DELETE /api/v1/courier-partners/2 → 200 deletes courier', async () => {
    const res = await request(app)
      .delete('/api/v1/courier-partners/2')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('6.7  POST /api/v1/courier-partners → 403 with COURIER token', async () => {
    const res = await request(app)
      .post('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`)
      .send({
        courierName: 'TestCourier Express',
        trackingUrlTemplate: 'https://track.testcourier.com/awb/{AWB}',
      });

    expect(res.statusCode).toBe(403);
  });

  it('6.8  GET /api/v1/courier-partners → 403 with COURIER token (read not allowed)', async () => {
    const res = await request(app)
      .get('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('6.9  POST /api/v1/courier-partners → 409 on duplicate courier name', async () => {
    const res = await request(app)
      .post('/api/v1/courier-partners')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        courierName: 'Updated', // Changed from Delhivery in 6.5
        trackingUrlTemplate: 'https://track.test.com/awb/{AWB}',
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Courier name already exists');
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

  it('7.5  POST /api/v1/orders → 400 with missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ courierId: 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('7.6  PUT /api/v1/orders/1 → 200 updates order', async () => {
    const res = await request(app)
      .put('/api/v1/orders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ senderName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('7.7  POST /api/v1/orders → 403 with COURIER token', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`)
      .send({
        senderName: 'E2E Test Sender',
        senderMobile: '9000000001',
        courierId: 1,
        receivers: [
          {
            receiverName: 'E2E Test Receiver',
            receiverPhone: '9000000002',
            address: '1 Test Street',
            city: 'TestCity',
            state: 'TestState',
            pincode: '100001',
            products: [{ productId: 1, qty: 2, unitPrice: 100 }],
          },
        ],
      });

    expect(res.statusCode).toBe(403);
  });

  it('7.8  POST /api/v1/orders (Mode A) → 201 creates sender-to-self order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderName: 'Mode A Sender',
        senderMobile: '9111111111',
        courierId: 1,
        products: [{ productId: 1, qty: 10, unitPrice: 500 }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.receivers).toHaveLength(1);
    expect(res.body.data.receivers[0].receiverName).toBe('Mode A Sender');
  });

  it('7.9  POST /api/v1/orders (Mode C) → 201 creates combo order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderName: 'Mode C Sender',
        senderMobile: '9222222222',
        courierId: 1,
        products: [{ productId: 1, qty: 5, unitPrice: 500 }],
        receivers: [
          {
            receiverName: 'External Receiver',
            receiverPhone: '9333333333',
            address: 'Ext Addr',
            city: 'City',
            state: 'State',
            pincode: '123456',
            products: [{ productId: 1, qty: 2, unitPrice: 500 }],
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    // Mode C should have 2 receivers: 1 synthetic + 1 external
    expect(res.body.data.receivers).toHaveLength(2);
  });

  it('7.10 PATCH /api/v1/orders/:id/cancel (Fresh) → 200 succeeds for pending parcels', async () => {
    // First create a fresh order
    const createRes = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        senderName: 'Cancel Test',
        senderMobile: '9444444444',
        courierId: 1,
        products: [{ productId: 1, qty: 1 }],
      });

    const orderId = createRes.body.data.orderId || createRes.body.data.id;

    const res = await request(app)
      .patch(`/api/v1/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('7.11 GET /api/v1/orders → 200 succeeds with COURIER token (read-only)', async () => {
    const res = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ============================================================================
// ██████ 7B. ORDER CANCEL (runs after parcel lifecycle) ██████
// Parcel 1 is DELIVERED after section 9 → cancellation blocked.
// ============================================================================

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
// ██████ 7B. ORDER CANCEL — post-lifecycle ██████
// Parcel 1 is now DELIVERED → TERMINAL_BLOCKING prevents order cancel.
// ============================================================================
describe('7B. Order Cancel — post-lifecycle', () => {
  it('7B.1 PATCH /api/v1/orders/1/cancel → 400 (parcels past cancellation threshold)', async () => {
    const res = await request(app)
      .patch('/api/v1/orders/1/cancel')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
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

  // Parcel 1 is DELIVERED after section 9 — cancel is blocked for terminal states
  it('10.4 PATCH /api/v1/parcels/1/cancel → 400 (parcel is DELIVERED, terminal)', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/1/cancel')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 17. PARCELS — LIFECYCLE VIA PARCEL 2 ██████
// Uses parcel 2 (PDS-D4E5F6) which starts PENDING
// ============================================================================
describe('17. Parcels — Lifecycle via Parcel 2', () => {
  it('17.1 POST /api/v1/parcels/2/log-print → 200 transitions to LABEL_PRINTED', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/2/log-print')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    if (res.body.data) {
      expect(res.body.data.status).toBe('LABEL_PRINTED');
    }
  });

  it('17.2 POST /api/v1/parcels/scan → 200 links AWB to LABEL_PRINTED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        qrCode: 'PDS-D4E5F6',
        awbNumber: 'AWB-E2E-002',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('17.3 POST /api/v1/parcels/dispatch → 200 dispatches AWB_LINKED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [2] });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('17.4 PATCH /api/v1/parcels/2/return → 200 marks as RETURNED', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/2/return')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    if (res.body.data) {
      expect(res.body.data.status).toBe('RETURNED');
    }
  });
});

// ============================================================================
// ██████ 18. PARCELS — NEGATIVE & EDGE CASES ██████
// ============================================================================
describe('18. Parcels — Negative & Edge Cases', () => {
  it('18.1 POST /api/v1/parcels/scan → 404 with non-existent QR code', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ qrCode: 'NONEXISTENT', awbNumber: 'AWB-X' });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('18.2 POST /api/v1/parcels/scan → 400 with missing qrCode (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/scan')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ awbNumber: 'AWB-X' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('18.3 POST /api/v1/parcels/dispatch → 400 with empty parcelIds (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('18.4 POST /api/v1/parcels/dispatch → 400 dispatching RETURNED parcel', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/dispatch')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ parcelIds: [2] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('18.5 PATCH /api/v1/parcels/2/deliver → 400 (parcel is RETURNED, terminal)', async () => {
    const res = await request(app)
      .patch('/api/v1/parcels/2/deliver')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ============================================================================
// ██████ 11. MASTER DATA — SENDERS (ADMIN, OPERATOR) ██████
// ============================================================================
describe('11. Senders', () => {
  it('11.1 GET /api/v1/senders → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.2 POST /api/v1/senders → 201 creates a new sender', async () => {
    const res = await request(app)
      .post('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        customerName: 'Test Co',
        phoneNo: '9999999999',
        address: '1 St',
        city: 'C',
        state: 'S',
        pincode: '100001'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('11.3 POST /api/v1/senders → 400 with missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ customerName: 'Test' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('11.4 GET /api/v1/senders/1 → 200 gets sender by ID', async () => {
    const res = await request(app)
      .get('/api/v1/senders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('11.5 GET /api/v1/senders/99999 → 404 on non-existent sender', async () => {
    const res = await request(app)
      .get('/api/v1/senders/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('11.6 GET /api/v1/senders/lookup?phone=9876543210 → 200 finds sender by phone', async () => {
    const res = await request(app)
      .get('/api/v1/senders/lookup?phone=9876543210')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('11.7 GET /api/v1/senders/lookup?phone=0000000000 → 404 for unknown phone', async () => {
    const res = await request(app)
      .get('/api/v1/senders/lookup?phone=0000000000')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('11.8 GET /api/v1/senders/names → 200 returns array of names', async () => {
    const res = await request(app)
      .get('/api/v1/senders/names')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.9 GET /api/v1/senders/phones → 200 returns array of phones', async () => {
    const res = await request(app)
      .get('/api/v1/senders/phones')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.10 GET /api/v1/senders/lookup-by-name?name=John → 200 returns array', async () => {
    const res = await request(app)
      .get('/api/v1/senders/lookup-by-name?name=John')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.11 PUT /api/v1/senders/1 → 200 updates sender', async () => {
    const res = await request(app)
      .put('/api/v1/senders/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ customerName: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('11.12 POST /api/v1/senders → 409 on duplicate phone number', async () => {
    const res = await request(app)
      .post('/api/v1/senders')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        customerName: 'Duplicate Phone Inc',
        phoneNo: '9876543210', // Exists in seed data
        address: 'Test Addr',
        city: 'City',
        state: 'State',
        pincode: '123456'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Sender phone number already exists');
  });

  it('11.13 PUT /api/v1/senders/2 → 409 when updating to an existing phone number', async () => {
    const res = await request(app)
      .put('/api/v1/senders/2')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        phoneNo: '9876543210' // Phone of sender 1
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Sender phone number already exists');
  });

  it('11.14 DELETE /api/v1/senders/2 → 200 deletes sender', async () => {
    const res = await request(app)
      .delete('/api/v1/senders/2')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('11.15 GET /api/v1/senders/1/addresses → 200 returns addresses', async () => {
    const res = await request(app)
      .get('/api/v1/senders/1/addresses')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('11.16 POST /api/v1/senders/1/addresses → 201 creates address', async () => {
    const res = await request(app)
      .post('/api/v1/senders/1/addresses')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        address: '1 St',
        city: 'C',
        state: 'S',
        pincode: '100001'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('11.17 POST /api/v1/senders/1/addresses → 400 with missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/senders/1/addresses')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });
});

// ============================================================================
// ██████ 12. MASTER DATA — RECEIVERS (ADMIN, OPERATOR) ██████
// ============================================================================
describe('12. Receivers', () => {
  it('12.1 GET /api/v1/receivers/names → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/names')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('12.2 GET /api/v1/receivers/phones → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/phones')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('12.3 GET /api/v1/receivers/lookup-by-name?name=Receiver → 200 returns array', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/lookup-by-name?name=Receiver')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('12.4 GET /api/v1/receivers/names → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/receivers/names')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 13. PARCEL EVENTS (ADMIN, OPERATOR) ██████
// ============================================================================
describe('13. Parcel Events', () => {
  it('13.1 GET /api/v1/parcel-events → 200 with paginated list', async () => {
    const res = await request(app)
      .get('/api/v1/parcel-events')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta).toHaveProperty('totalRows');
  });

  it('13.2 GET /api/v1/parcel-events/export → 200 returns CSV', async () => {
    const res = await request(app)
      .get('/api/v1/parcel-events/export')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/csv/);
    expect(typeof res.text).toBe('string');
    expect(res.text).toContain('EventID,');
  });

  it('13.3 GET /api/v1/parcel-events → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/parcel-events')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 14. DASHBOARD (ADMIN only) ██████
// ============================================================================
describe('14. Dashboard', () => {
  it('14.1 GET /api/v1/dashboard/metrics → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/metrics')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toHaveProperty('TotalOrders');
    expect(res.body.data).toHaveProperty('totalOrders');
    expect(res.body.data).toHaveProperty('parcelsByStatus');
    expect(res.body.data.parcelsByStatus).toHaveProperty('PENDING');
    expect(res.body.data.TotalOrders).toBe(150);
    expect(res.body.data.totalOrders).toBe(150);
  });

  it('14.2 GET /api/v1/dashboard/metrics → 403 with OPERATOR token', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/metrics')
      .set('Authorization', `Bearer ${OPERATOR_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });

  it('14.3 GET /api/v1/dashboard/metrics → 403 with COURIER token', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/metrics')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`);

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 15. BULK UPLOAD (ADMIN, OPERATOR) ██████
// ============================================================================
describe('15. Bulk Upload', () => {
  it('15.1 POST /api/v1/bulk-uploads → 201 creates bulk upload session', async () => {
    const res = await request(app)
      .post('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({
        rows: [{
          senderName: 'Bulk Sender',
          senderMobile: '9000000099',
          courierId: 1,
          receivers: [{
            receiverName: 'Bulk Receiver',
            receiverPhone: '9000000098',
            products: [{ productId: 1, qty: 1, unitPrice: 100 }]
          }]
        }]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.sessionId).toBeDefined();
  });

  it('15.2 POST /api/v1/bulk-uploads → 400 with empty rows (Zod)', async () => {
    const res = await request(app)
      .post('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ rows: [] });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Validation Error');
  });

  it('15.3 GET /api/v1/bulk-uploads → 200 with ADMIN token', async () => {
    const res = await request(app)
      .get('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('15.4 GET /api/v1/bulk-uploads/1 → 200 gets session by ID', async () => {
    const res = await request(app)
      .get('/api/v1/bulk-uploads/1')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.session).toBeDefined();
  });

  it('15.5 GET /api/v1/bulk-uploads/99999 → 404 on non-existent session', async () => {
    const res = await request(app)
      .get('/api/v1/bulk-uploads/99999')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('15.6 POST /api/v1/bulk-uploads → 403 with COURIER token', async () => {
    const res = await request(app)
      .post('/api/v1/bulk-uploads')
      .set('Authorization', `Bearer ${COURIER_TOKEN}`)
      .send({
        rows: [{
          senderName: 'Bulk Sender',
          senderMobile: '9000000099',
          courierId: 1,
          receivers: [{
            receiverName: 'Bulk Receiver',
            receiverPhone: '9000000098',
            products: [{ productId: 1, qty: 1, unitPrice: 100 }]
          }]
        }]
      });

    expect(res.statusCode).toBe(403);
  });
});

// ============================================================================
// ██████ 16. NOTIFICATIONS (PARTIAL — SEE §5 BLOCKERS) ██████
// ============================================================================
describe('16. Notifications', () => {
  it('16.1 POST /api/v1/parcels/1/notify → 200 sends notification', async () => {
    const res = await request(app)
      .post('/api/v1/parcels/1/notify')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('sent successfully');
  });

  it('16.2 GET /api/v1/parcels/1/notifications → 200 returns notification history', async () => {
    const res = await request(app)
      .get('/api/v1/parcels/1/notifications')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('16.3 POST /api/v1/notifications/1/resend → 200 resends notification', async () => {
    const res = await request(app)
      .post('/api/v1/notifications/1/resend')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('sent successfully');
  });

  it('16.4 POST /api/v1/notifications/webhook → 200 succeeds with valid payload', async () => {
    const res = await request(app)
      .post('/api/v1/notifications/webhook')
      .send({ notificationId: 1, status: 'delivered' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.statusId).toBe(2); // 2 = Delivered
  });
});
