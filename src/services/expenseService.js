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

const deleteExpense = async (expenseId, userId) => {
  const expense = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId,
    },
  });

  if (!expense) {
    throw new Error("Expense not found.");
  }

  await prisma.expense.delete({
    where: {
      id: expenseId,
    },
  });

  return expense;
};

const updateExpense = async (expenseId, userId, expenseData) => {
  const existingExpense = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId,
    },
  });

  if (!existingExpense) {
    throw new Error("Expense not found.");
  }

  const updatedExpense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: expenseData,
  });

  return updatedExpense;
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};

