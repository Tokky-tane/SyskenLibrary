const models = require('../models');
const bcrypt = require('bcrypt');

exports.findById = async (userId) => {
  const foundUser = (await models.User.findOne({
    where: {id: userId},
    attributes: ['id', 'email'],
    include: [{
      model: models.Loan,
      attributes: ['id', 'bookId', 'createdAt'],
    }],
  })).toJSON();

  // rename Loans -> loans
  foundUser['loans'] = foundUser['Loans'];
  delete foundUser['Loans'];

  return foundUser;
};

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
