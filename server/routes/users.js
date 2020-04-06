const express = require('express');
const router = require('express-promise-router')();
const {check} = require('express-validator');
const user = require('../models').User;
const validate = require('../middleware/validation');
const users = require('../utils/users');
const books = require('../utils/books');
const loans = require('../utils/loans');
const auth = require('../middleware/auth');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) => {
  user.findAll({attributes: ['email']})
      .then((user) => res.send(user));
});

router.post('/', [
  check('email').isEmail(),
  check('password').isLength({min: 5, max: 30}),
], validate, async (req, res, next) => {
  const resevedUser = req.body;

  const createdUser = await users.create(
      resevedUser.email,
      resevedUser.password);

  if (!createdUser) {
    return res.status(409).end();
  }

  const createdUserUrl = req.protocol + '://' + req.get('host') + req.url + `/${createdUser.id}`;
  return res.location(createdUserUrl)
      .status(201)
      .end();
});

router.delete('/', async (req, res) => {
  users.deleteAll();
  return res.status(204).end();
});

const checkUserId = (req, res, next) => {
  if (req.params.userId != 'me' &&
    req.params.userId != req.body.userId) {
    return res.status(403).send({
      error: {
        message: '他の人のアカウントで操作することはできません',
      },
    });
  } else {
    next();
  }
};

router.get('/:userId', auth, checkUserId, async (req, res) => {
  const userId = req.body.userId;
  const foundUser = await users.findById(userId);

  res.send(foundUser);
});

router.post('/:userId/loans', [
  check('bookId').isInt(),
], validate, auth, checkUserId, async (req, res) => {
  const bookId = req.body.bookId;
  const userId = req.body.userId;
  const book = await books.findById(bookId);

  if (book == null) {
    return res.status(400).send({
      error: {
        message: '指定された本は存在しません',
      },
    });
  }

  if (book.borrowedBy != null) {
    return res.status(400).send({
      error: {
        message: 'すでに本が借りられています',
      },
    });
  }

  const createdLoan = await loans.create(bookId, userId);
  const createdLoanUrl = req.protocol + '://' + req.get('host') + req.url + `/${createdLoan.id}`;
  return res.location(createdLoanUrl)
      .status(201)
      .end();
});

module.exports = router;
