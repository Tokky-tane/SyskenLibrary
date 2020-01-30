'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Books',
        'isbn', Sequelize.BIGINT);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Books',
        'isbn', Sequelize.INTEGER);
  },
};
