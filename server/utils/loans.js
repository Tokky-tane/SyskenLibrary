const loanModel = require('../models').Loan;

exports.create = async (bookId, userId) => {
  return await loanModel.create({
    bookId: bookId,
    userId: userId,
  });
};

exports.deleteById = async (loanId) => {
  const destroyedNum = await loanModel.destroy({
    where: {id: loanId},
  });

  if (destroyedNum < 1) {
    return false;
  } else {
    return true;
  }
};
