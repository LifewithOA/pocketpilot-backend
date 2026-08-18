const { createExpense, getExpenses } = require("../services/expenseService");

const create = async (req, res) => {
  try {
    const expense = await createExpense(req.body, req.user.id);

    res.status(201).json({
      message: "Expense created successfully.",
      expense,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const expenses = await getExpenses(req.user.id);

    res.status(200).json({
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
};