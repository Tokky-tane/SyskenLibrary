const request = require('supertest');
const dbUtils = require('../utils/database');
const app = require('../app');

describe('test login', () => {
  const email = 'foo@bar.com';
  const password = 'foobar';
  beforeAll(async () => {
    await dbUtils.clearUserDatabase();
    await dbUtils.createUser(email, password);
  });

  test('sign', async () => {
    const res = await request(app)
        .post('/login')
        .send({email: email, password: password});
    expect(res.statusCode).toBe(200);
  });

  test('not exist user login', async () => {
    const notExistEmail = 'not@exist.com';
    const res = await request(app)
        .post('/login')
        .send({email: notExistEmail, password: password});
    expect(res.statusCode).toBe(400);
  });

  test('wrong pass word login', async () => {
    const wrongPassword = 'not@exist.com';
    const res = await request(app)
        .post('/login')
        .send({email: email, password: wrongPassword});
    expect(res.statusCode).toBe(400);
  });
});
