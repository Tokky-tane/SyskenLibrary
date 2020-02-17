const express=require('express');
const app=express();
const books=require('./routes/books');
const users=require('./routes/users');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/books', books);
app.use('/users', users);

module.exports = app;
