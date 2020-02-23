const models = require('../models');

exports.clearUserDatabase = () => {
  models.User.destroy({where: {}, truncate: true}).then();
};
