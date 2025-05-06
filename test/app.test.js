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

  describe('Array Sum Feature', () => {
    it('should calculate sum of array', async () => {
      const response = await request(app)
        .post('/api/sum')
        .send({ numbers: [1, 2, 3, 4, 5] });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sum', 15);
    });

    it('should handle empty array', async () => {
      const response = await request(app)
        .post('/api/sum')
        .send({ numbers: [] });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sum', 0);
    });

    it('should reject non-array input', async () => {
      const response = await request(app)
        .post('/api/sum')
        .send({ numbers: 'not an array' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should reject array with non-numbers', async () => {
      const response = await request(app)
        .post('/api/sum')
        .send({ numbers: [1, '2', 3] });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
}); 