const express = require('express');
const router = new express.Router();
const {check, validationResult} = require('express-validator');
const models = require('../database/models');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const addObjectName = function(object, name) {
  const emitObject = {};
  emitObject[name] = object;
  return emitObject;
};

router.get('/', function(req, res, next) {
  models.Book.findAll({attributes: ['title', 'author', 'isbn']})
      .then((books) => {
        res.json(addObjectName(books, 'books'));
      })
      .catch((err) => {
        next(err);
      });
});

router.post('/', [
  check('title').exists({checkNull: true}),
  check('isbn').optional({nullable: true}).isISBN(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

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
