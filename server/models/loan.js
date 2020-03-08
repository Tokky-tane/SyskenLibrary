'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    lentAt: DataTypes.DATE,
  }, {});
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
