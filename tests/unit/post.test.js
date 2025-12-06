const request = require('supertest');
const app = require('../../src/app');

describe('POST /v1/fragments', () => {
  it('should create a text fragment', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .set('Authorization', 'Bearer testtoken') // must match how your auth expects
      .set('Content-Type', 'text/plain')
      .send('Test text fragment');
    expect(res.statusCode).toBe(201);
    expect(res.body.fragment.type).toBe('text/plain');
    expect(res.headers.location).toMatch(/\/fragments\/\w+/);
  });
});
