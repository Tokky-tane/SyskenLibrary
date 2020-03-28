'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {}, {});
  Loan.associate = function(models) {
    // associations can be defined here
    Loan.belongsTo(models.Book, {
      foreignKey: 'bookId',
    });
    Loan.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Loan;
};
