const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/fragments?expand=1', () => {
  test("should return expanded metadata for user's fragments", async () => {
    // create a fragment to test
    await request(app)
      .post('/v1/fragments')
      .set('Authorization', 'Bearer testtoken')
      .set('Content-Type', 'text/plain')
      .send('fragment data');

    const res = await request(app)
      .get('/v1/fragments?expand=1')
      .set('Authorization', 'Bearer testtoken');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.fragments)).toBe(true);
    expect(res.body.fragments.length).toBeGreaterThan(0);
    expect(res.body.fragments[0]).toHaveProperty('type');
    expect(res.body.fragments[0]).toHaveProperty('created');
    expect(res.body.fragments[0]).toHaveProperty('data');
  });

  test('should return only ids if expand is missing', async () => {
    const res = await request(app)
      .get('/v1/fragments')
      .set('Authorization', 'Bearer testtoken');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.fragments)).toBe(true);
    expect(res.body.fragments[0]).toHaveProperty('id');
    expect(res.body.fragments[0]).not.toHaveProperty('type');
  });
});
