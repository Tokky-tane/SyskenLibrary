const users = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('./jwt');

module.exports = async (email, password) => {
  const user = await users.findOne({where: {email: email}});
  if (user === null) {
    return null;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return null;
  }

  return jwt.signToken(user.id);
};
