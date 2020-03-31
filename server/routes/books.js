const express = require('express');
const router = require('express-promise-router')();
const {check} = require('express-validator');
const addObjectName = require('../utils/object').addObjectName;
const auth = require('../middleware/auth');
const books = require('../utils/books');
const validate = require('../middleware/validation');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res, next) => {
  const foundBooks = await books.findAll();
  res.json(addObjectName(foundBooks, 'books'));
});

router.post('/', [
  check('title').exists({checkNull: true}),
  check('isbn').optional({nullable: true}).isISBN(),
], validate, auth, (req, res, next) => {
  const book = req.body;

  books.create(book.title, book.author, book.isbn).then((newBook) => {
    // 新しく生成された本を指すURLをLocationヘッダに設定する
    const newBookUrl = req.protocol + '://' + req.get('host') + req.url + `/${newBook.id}`;
    res.location(newBookUrl).status(201).end();
  });
});

router.delete('/', async (req, res) => {
  await books.deleteAll();
  res.status(204).end();
});

module.exports = router;
