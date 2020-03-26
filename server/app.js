require('dotenv').config();
const express = require('express');
const app = express();
const books = require('./routes/books');
const users = require('./routes/users');
const login = require('./routes/login');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/books', books);
app.use('/users', users);
app.use('/login', login);

module.exports = app;
