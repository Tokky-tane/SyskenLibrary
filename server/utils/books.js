const models = require('../models');

exports.deleteAll = () => {
  models.Book.destroy({where: {}});
};
