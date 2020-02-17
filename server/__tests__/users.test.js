const request = require('supertest');
const dbUtils = require('../database-utils');
const app = require('../app');

describe('test to /users', () => {
  beforeEach(() => {
    dbUtils.clearUserDatabase();
  });

  test('post user', async () => {
    const user = {
      email: 'foo@bar.com',
      password: 'password',
    };

    const res = await request(app).post('/users').send(user);
    expect(res.statusCode).toBe(201);
  });

  test('post same email', async () => {
    const user = {
      email: 'foo@bar.com',
      password: 'password',
    };

    await request(app).post('/users').send(user);
    const res = await request(app).post('/users').send(user);

    expect(res.statusCode).toBe(409);
  });

  test('post short password user', async () => {
    const shortPasswordUser = {
      email: 'foo@bar.com',
      password: '1234',
    };

    const res = await request(app).post('/users').send(shortPasswordUser);
    expect(res.statusCode).toBe(400);
  });

  test('post long password user', async () => {
    const shortPasswordUser = {
      email: 'foo@bar.com',
      password: '1234567890123456789012345678901234567890',
    };

    const res = await request(app).post('/users').send(shortPasswordUser);
    expect(res.statusCode).toBe(400);
  });

  test('get all user', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
  });
});

