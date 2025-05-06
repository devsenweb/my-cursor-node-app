const request = require('supertest');
const express = require('express');
const app = require('../app');

describe('API Endpoints', () => {
  test('GET /api/hello should return hello message', async () => {
    const response = await request(app)
      .get('/api/hello')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello, World!');
  });

  test('GET /api/hello should have correct response structure', async () => {
    const response = await request(app)
      .get('/api/hello')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      message: 'Hello, World!'
    });
  });

  test('GET /api/hello should return 200 status code', async () => {
    const response = await request(app)
      .get('/api/hello');
    
    expect(response.status).toBe(200);
  });

  test('GET /api/hello should return JSON content type', async () => {
    const response = await request(app)
      .get('/api/hello');
    
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app)
      .get('/nonexistent');
    
    expect(response.status).toBe(404);
  });
}); 