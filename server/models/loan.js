'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    lentAt: DataTypes.DATE,
  }, {});
  Loan.associate = function(models) {
    // associations can be defined here
  };
  return Loan;
};
