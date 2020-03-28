const express = require('express');
const router = require('express-promise-router')();
const {check} = require('express-validator');
const addObjectName = require('../utils/object').addObjectName;
const validate = require('../middleware/validation');
const login = require('../utils/login');

router.use(express.json());

router.post('/', [
  check('email').isEmail(),
  check('password').isString().isLength({min: 5, max: 30}),
], validate, async (req, res, next) => {
  const receivedUser = req.body;

  const token = await login(receivedUser.email, receivedUser.password);
  if (token === null) {
    return res.status(401).end();
  }

  res.send(addObjectName(token, 'token'));

  return;
});

module.exports = router;
