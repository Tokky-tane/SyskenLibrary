'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isbn: DataTypes.BIGINT,
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.hasOne(models.Loan, {
      foreignKey: 'bookId',
    });
  };
  return Book;
};
