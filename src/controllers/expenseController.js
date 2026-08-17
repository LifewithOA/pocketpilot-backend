const { createExpense } = require("../services/expenseService");

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

module.exports = {
  create,
};