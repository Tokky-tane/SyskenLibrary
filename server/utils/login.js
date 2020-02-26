const users = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('./jwt');

module.exports = async (email, password) => {
  const user = await users.findOne({where: {email: email}});
  if (user === null) {
    throw Error('UserNotFound');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('WrongPassword');
  }

  return jwt.signToken(user.id);
};
