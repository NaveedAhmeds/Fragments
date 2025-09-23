// tests/unit/get.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/get', () => {
  test('unauthenticated requests are denied', () =>
    request(app).get('/v1/get').expect(500));

  test('incorrect credentials are denied', () =>
    request(app)
      .get('/v1/get')
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('authenticated users get a fragments array', async () => {
    const res = await request(app).get('/v1/get').auth('user1@email.com', '1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
  });

  // TODO: add tests for fragment contents later
});
