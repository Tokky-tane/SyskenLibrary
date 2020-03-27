const models = require('../models');

exports.findAll = async () => {
  const bookModels = await models.Book.findAll({
    attributes: ['id', 'title', 'author', 'isbn'],
    include: [{
      model: models.Loan,
    }],
  });

  const books = bookModels.map((bookModel) => {
    const book = bookModel.get({plain: true});

    if (book['Loan'] != null) {
      book.borrowedBy = null;
      book.borrowedAt = null;
    } else {
      book.borrowedBy = book.Loan.bookId;
      book.borrowedAt = book.Loan.createdAt;
    }

    delete book['Loan'];

    return book;
  });

  return books;
};
