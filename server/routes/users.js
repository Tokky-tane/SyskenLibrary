const express = require('express');
const router = require('express-promise-router')();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const user = require('../models').User;

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) => {
  user.findAll({attributes: ['email']})
      .then((user) => res.send(user));
});

router.post('/', [
  check('email').isEmail(),
  check('password').isLength({min: 5, max: 30}),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const resevedUser = req.body;
  const saltRounds = 10;
  bcrypt.hash(resevedUser.password, saltRounds)
      .then((hash) => user.findOrCreate({
        where: {
          email: resevedUser.email,
        },
        defaults: {password: hash},
      }))
      .then(([createdUser, created]) => {
        if (!created) {
          return res.status(409).end();
        }

        const createdUserUrl = req.protocol + '://' + req.get('host') + req.url + `/${createdUser.id}`;
        return res.location(createdUserUrl)
            .status(201)
            .end();
      });
});

router.delete('/', async (req, res) => {
  user.destroy({where: {}, truncate: true})
      .then(() =>
        res.status(204).end(),
      );
});

module.exports = router;
