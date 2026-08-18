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

const getExpenses = async (userId) => {
  const expenses = await prisma.expense.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return expenses;
};

module.exports = {
  createExpense,
  getExpenses,
};

