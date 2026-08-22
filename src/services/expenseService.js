const prisma = require("../config/prisma");

const createExpense = async (expenseData, userId) => {
  const {
    name,
    amount,
    description,
    categoryId,
    date,
    paymentMethod,
    additionalNotes,
  } = expenseData;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      OR: [
        {
          isDefault: true,
        },
        {
          userId,
        },
      ],
    },
  });

  if (!category) {
    throw new Error("Invalid category.");
  }

  const newExpense = await prisma.expense.create({
    data: {
      name,
      amount,
      description,
      categoryId,
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
    include: {
      categoryRef: true,
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

  const {
    name,
    amount,
    description,
    categoryId,
    date,
    paymentMethod,
    additionalNotes,
  } = expenseData;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      OR: [
        {
          isDefault: true,
        },
        {
          userId,
        },
      ],
    },
  });

  if (!category) {
    throw new Error("Invalid category.");
  }

  const updatedExpense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      name,
      amount,
      description,
      categoryId,
      date,
      paymentMethod,
      additionalNotes,
    },
  });

  return updatedExpense;
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};

