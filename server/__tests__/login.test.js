const request = require('supertest');
const users = require('../utils/users');
const app = require('../app');

describe('test login', () => {
  const email = 'foo@bar.com';
  const password = 'foobar';
  beforeAll(async () => {
    users.deleteAll();
    await users.create(email, password);
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
    expect(res.statusCode).toBe(401);
  });

  test('wrong pass word login', async () => {
    const wrongPassword = 'not@exist.com';
    const res = await request(app)
        .post('/login')
        .send({email: email, password: wrongPassword});
    expect(res.statusCode).toBe(401);
  });
});
