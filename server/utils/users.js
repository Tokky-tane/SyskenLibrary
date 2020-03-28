const models = require('../models');
const bcrypt = require('bcrypt');


exports.deleteAll = async () => {
  await models.User.destroy({where: {}});
};

exports.create = async (email, password) => {
  const sameEmailUser = await models.User.findOne({where: {email: email}});

  // !sameEmailUserでは動かない なぜだろう？
  if (sameEmailUser !== null) {
    return null;
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const createdUser = await models.User.create({email: email, password: hash});
  return createdUser;
};
