import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import jwt from 'jsonwebtoken';

process.env.USE_MOCK_DB = 'true';
process.env.JWT_SECRET = 'e2e-test-secret-key-sdcms-2026';

const generateTestToken = (employeeCode) =>
  jwt.sign({ id: employeeCode }, process.env.JWT_SECRET, { expiresIn: '1h' });

const ADMIN_TOKEN = generateTestToken(1);

let app;

beforeAll(async () => {
  const module = await import('../../src/app.js');
  app = module.default;
});

describe('Status Toggle APIs', () => {
  it('PATCH /api/v1/courier-partners/:id/status -> 200', async () => {
    const res = await request(app)
      .patch('/api/v1/courier-partners/1/status')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ isActive: false });
    expect(res.statusCode).toBe(200);
  });

  it('PATCH /api/v1/employees/:id/status -> 200', async () => {
    const res = await request(app)
      .patch('/api/v1/employees/3/status')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ isActive: false });
    expect(res.statusCode).toBe(200);
  });

  it('PATCH /api/v1/products/:id/status -> 200', async () => {
    const res = await request(app)
      .patch('/api/v1/products/1/status')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .send({ isActive: false });
    expect(res.statusCode).toBe(200);
  });
});
