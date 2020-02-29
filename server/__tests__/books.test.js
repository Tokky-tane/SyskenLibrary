const request = require('supertest');
const app = require('../app');
const dbUtil = require('../utils/database');
const login = require('../utils/login');

describe('test to /books', () => {
  const email = 'foo@bar.com';
  const password = 'password';
  let token;
  beforeAll(async () => {
    await dbUtil.deleteAllUsers();
    await dbUtil.createUser(email, password);
  });

  beforeEach(async () => {
    token = await login(email, password);
  });

  test('get', async (done) => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    done();
  });

  test('post without title', async () => {
    const bookWithoutTitle = {
      author: 'sample_author',
      isbn: 9783161484100,
    };

    const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(bookWithoutTitle);
    expect(res.statusCode).toBe(400);
  });

  test('post without author', async () => {
    const bookWithoutAuthor = {
      title: 'sample_title',
      isbn: 9783161484100,
    };

    const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(bookWithoutAuthor);
    expect(res.statusCode).toBe(201);
  });

  test('post without isbn', async () => {
    const bookWithoutIsbn = {
      title: 'sample_title',
      author: 'sample_author',
    };

    const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(bookWithoutIsbn);
    expect(res.statusCode).toBe(201);
  });

  test('post invalid isbn', async () => {
    const bookWithoutIsbn = {
      title: 'sample_title',
      author: 'sample_author',
      isbn: 111111,
    };

    const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(bookWithoutIsbn);
    expect(res.statusCode).toBe(400);
  });

  test('post isbn null', async () => {
    const bookIsbnNull = {
      title: 'sample_title',
      author: 'sample_author',
      isbn: null,
    };

    const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(bookIsbnNull);
    expect(res.statusCode).toBe(201);
  });

  test('post with wrong token', async () => {
    const book = {title: 'sample_title'};
    const wrongToken = token + 'a';

    const res = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${wrongToken}`)
        .send(book);
    expect(res.statusCode).toBe(401);
  });
});

