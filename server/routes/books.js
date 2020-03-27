const express = require('express');
const router = require('express-promise-router')();
const {check} = require('express-validator');
const models = require('../models');
const addObjectName = require('../utils/object').addObjectName;
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const books = require('../utils/books');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res, next) => {
  const foundBooks = await books.findAll();
  res.json(addObjectName(foundBooks, 'books'));
});

router.post('/', [
  check('title').exists({checkNull: true}),
  check('isbn').optional({nullable: true}).isISBN(),
], validation, auth, (req, res, next) => {
  const newBook = req.body;

  models.Book.create({
    title: newBook.title,
    author: newBook.author,
    isbn: newBook.isbn,
  }).then((newBook) => {
    // 新しく生成された本を指すURLをLocationヘッダに設定する
    const newBookUrl = req.protocol + '://' + req.get('host') + req.url + `/${newBook.id}`;
    res.location(newBookUrl).status(201).end();
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
