const express = require('express');
const router = require('express-promise-router')();
const {check} = require('express-validator');
const user = require('../models').User;
const varidate = require('../middleware/validation');
const db = require('../utils/database');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) => {
  user.findAll({attributes: ['email']})
      .then((user) => res.send(user));
});

router.post('/', [
  check('email').isEmail(),
  check('password').isLength({min: 5, max: 30}),
], varidate, async (req, res, next) => {
  const resevedUser = req.body;

  const createdUser = await db.createUser(
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
  db.deleteAllUsers();
  return res.status(204).end();
});

module.exports = router;
