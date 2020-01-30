const request = require('supertest');
const app = require('../app');

describe('test to /books', () => {
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

    const res = await request(app).post('/books').send(bookWithoutTitle);
    expect(res.statusCode).toBe(400);
  });

  test('post without author', async () => {
    const bookWithoutAuthor = {
      title: 'sample_title',
      isbn: 9783161484100,
    };

    const res = await request(app).post('/books').send(bookWithoutAuthor);
    expect(res.statusCode).toBe(201);
  });

  test('post without isbn', async () => {
    const bookWithoutIsbn = {
      title: 'sample_title',
      author: 'sample_author',
    };

    const res = await request(app).post('/books').send(bookWithoutIsbn);
    expect(res.statusCode).toBe(201);
  });

  test('post invalid isbn', async () => {
    const bookWithoutIsbn = {
      title: 'sample_title',
      author: 'sample_author',
      isbn: 111111,
    };

    const res = await request(app).post('/books').send(bookWithoutIsbn);
    expect(res.statusCode).toBe(400);
  });

  test('post isbn null', async () => {
    const bookIsbnNull = {
      title: 'sample_title',
      author: 'sample_author',
      isbn: null,
    };

    const res = await request(app).post('/books').send(bookIsbnNull);
    expect(res.statusCode).toBe(201);
  });
});

