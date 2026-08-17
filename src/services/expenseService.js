const prisma = require("../config/prisma");

const createExpense = async (expenseData, userId) => {
  const {
    name,
    amount,
    description,
    category,
    date,
    paymentMethod,
    additionalNotes,
  } = expenseData;

  const newExpense = await prisma.expense.create({
    data: {
      name,
      amount,
      description,
      category,
      date,
      paymentMethod,
      additionalNotes,
      userId,
    },
  });

  return newExpense;
};

module.exports = {
  createExpense,
};