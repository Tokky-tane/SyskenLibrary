const express = require('express');
const router = require('express-promise-router')();
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const user = require('../models').User;
const jwt = require('../utils/jwt');
const addObjectName = require('../utils/object').addObjectName;

router.use(express.json());

router.post('/', [
  check('email').isEmail(),
  check('password').isString().isLength({min: 5, max: 30}),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const receivedUser = req.body;
  const dbUser = await user.findOne({where: {email: receivedUser.email}});

  if (!dbUser) {
    res.status(400).end();
    return;
  }

  const match = await bcrypt.compare(receivedUser.password, dbUser.password);
  if (!match) {
    res.status(400).end();
    return;
  }

  const token = jwt.signToken(dbUser.id);
  res.send(addObjectName(token, 'token'));

  return;
});

module.exports = router;
