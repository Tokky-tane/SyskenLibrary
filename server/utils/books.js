const models = require('../models');

const bookDataToFlat = (book) => {
  if (book['Loan'] == null) {
    book.borrowedBy = null;
    book.borrowedAt = null;
  } else {
    book.borrowedBy = book.Loan.userId;
    book.borrowedAt = book.Loan.createdAt;
  }

  delete book['Loan'];

  return book;
};

exports.findAll = async () => {
  const bookModels = await models.Book.findAll({
    attributes: ['id', 'title', 'author', 'isbn'],
    include: [{
      model: models.Loan,
    }],
  });

  const books = bookModels.map((bookModel) => {
    const book = bookModel.get({plain: true});

    return bookDataToFlat(book);
  });

  return books;
};

exports.findById = async (id) => {
  const book = await models.Book.findOne({
    where: {id: id},
    attributes: ['id', 'title', 'author', 'isbn'],
    include: [{
      model: models.Loan,
    }],
  });

  if (book == null) {
    return null;
  }

  return bookDataToFlat(book);
};

exports.deleteAll = () => {
  models.Book.destroy({where: {}});
};
