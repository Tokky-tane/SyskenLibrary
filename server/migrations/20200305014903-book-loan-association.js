'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Loans', 'bookId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Books',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Loans', 'bookId');
  },
};
