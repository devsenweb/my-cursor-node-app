const request = require('supertest');
const app = require('../app');

describe('Test endpoint', () => {
  it('should return hello world message', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('should return test endpoint data', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('timestamp');
  });
}); 