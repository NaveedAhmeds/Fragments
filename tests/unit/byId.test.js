const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/fragments/:id', () => {
  let fragmentId;
  beforeAll(async () => {
    const postRes = await request(app)
      .post('/v1/fragments')
      .set('Authorization', 'Bearer testtoken')
      .set('Content-Type', 'text/plain')
      .send('fragdata');
    fragmentId = postRes.body.fragment.id;
  });

  test('should return fragment data with correct Content-Type', async () => {
    const res = await request(app)
      .get(`/v1/fragments/${fragmentId}`)
      .set('Authorization', 'Bearer testtoken');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/^text\/plain/);
    expect(res.text).toBe('fragdata');
  });

  test('should return fragment metadata at /info', async () => {
    const res = await request(app)
      .get(`/v1/fragments/${fragmentId}/info`)
      .set('Authorization', 'Bearer testtoken');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      id: fragmentId,
      owner: 'testuser',
      type: 'text/plain',
    });
  });
});
