const request = require('supertest');
const users = require('../utils/users');
const books = require('../utils/books');
const loans = require('../utils/loans');
const app = require('../app');
const login = require('../utils/login');

describe('test to /users', () => {
  beforeEach(() => {
    return users.deleteAll();
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

  test('delete all user', async () => {
    const res = await request(app).delete('/users');
    expect(res.statusCode).toBe(204);
  });

  test('get user data', async () => {
    const email = 'foo@bar.com';
    const password = 'password';
    const user = await users.create(email, password);
    const token = await login(email, password);
    const res = await request(app)
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test('get user data using alias of me', async () => {
    const email = 'foo@bar.com';
    const password = 'password';
    await users.create(email, password);
    const token = await login(email, password);
    const res = await request(app)
        .get(`/users/me`)
        .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test('get other user data', async () => {
    const email = 'foo@bar.com';
    const password = 'password';
    const user = await users.create(email, password);
    const token = await login(email, password);
    const res = await request(app)
        .get(`/users/${user.id + 1}`)
        .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });

  test('lent book', async () => {
    const book = await books.create('sample');
    const email = 'foo@bar.com';
    const password = 'password';
    const user = await users.create(email, password);
    const token = await login(email, password);

    const res = await request(app)
        .post(`/users/${user.id}/loans`)
        .set('Authorization', `Bearer ${token}`)
        .send({bookId: book.id});

    expect(res.statusCode).toBe(201);
  });

  test('lent book using alias of me', async () => {
    const book = await books.create('sample');
    const email = 'foo@bar.com';
    const password = 'password';
    await users.create(email, password);
    const token = await login(email, password);

    const res = await request(app)
        .post(`/users/me/loans`)
        .set('Authorization', `Bearer ${token}`)
        .send({bookId: book.id});

    expect(res.statusCode).toBe(201);
  });

  test('lent book using other user id', async () => {
    const book = await books.create('sample');
    const email = 'foo@bar.com';
    const password = 'password';
    const user = await users.create(email, password);
    const token = await login(email, password);

    const res = await request(app)
        .post(`/users/${user.id + 1}/loans`)
        .set('Authorization', `Bearer ${token}`)
        .send({bookId: book.id});

    expect(res.statusCode).toBe(403);
  });

  test('lent not exist book', async () => {
    const email = 'foo@bar.com';
    const password = 'password';
    const user = await users.create(email, password);
    const token = await login(email, password);

    const res = await request(app)
        .post(`/users/${user.id}/loans`)
        .set('Authorization', `Bearer ${token}`)
        .send({bookId: 1});

    expect(res.statusCode).toBe(400);
  });
  test('lent already borrowed book', async () => {
    const book = await books.create('sample');
    const email = 'foo@bar.com';
    const password = 'password';
    const user = await users.create(email, password);
    const token = await login(email, password);

    await loans.create(book.id, user.id);

    const res = await request(app)
        .post(`/users/${user.id}/loans`)
        .set('Authorization', `Bearer ${token}`)
        .send({bookId: book.id});

    expect(res.statusCode).toBe(400);
  });
});

