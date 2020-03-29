const express = require('express');
const router = require('express-promise-router')();
const {check} = require('express-validator');
const user = require('../models').User;
const validate = require('../middleware/validation');
const users = require('../utils/users');
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

router.get('/:userId', auth, async (req, res) => {
  if (req.params.userId != 'me' &&
    req.params.userId != req.body.userId) {
    return res.status(403).send({
      error: {
        message: '他の人のデータを見ることはできません',
      },
    });
  }
  const userId = req.body.userId;
  const foundUser = users.findById(userId);

  res.send(foundUser);
});

module.exports = router;
