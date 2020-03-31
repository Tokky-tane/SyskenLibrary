const loanModel = require('../models').Loan;

exports.create = async (bookId, userId) => {
  return await loanModel.create({
    bookId: bookId,
    userId: userId,
  });
};
