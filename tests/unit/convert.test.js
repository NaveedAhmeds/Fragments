const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/fragments/:id.html', () => {
  let fragmentId;
  beforeAll(async () => {
    const postRes = await request(app)
      .post('/v1/fragments')
      .set('Authorization', 'Bearer testtoken')
      .set('Content-Type', 'text/markdown')
      .send('# Hello World');
    fragmentId = postRes.body.fragment.id;
  });

  test('should convert markdown fragment to HTML', async () => {
    const res = await request(app)
      .get(`/v1/fragments/${fragmentId}.html`)
      .set('Authorization', 'Bearer testtoken');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/^text\/html/);
    expect(res.text).toContain('<h1>Hello World</h1>');
  });

  test('should return 415 for unsupported conversion', async () => {
    const res = await request(app)
      .get(`/v1/fragments/${fragmentId}.txt`)
      .set('Authorization', 'Bearer testtoken');
    expect(res.statusCode).toBe(415);
  });
});
