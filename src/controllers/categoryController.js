const {
  getCategories,
  createCategory,
} = require("../services/categoryService");

const getAll = async (req, res) => {
  try {
    const categories = await getCategories(req.user.id);

    res.status(200).json({
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, req.user.id);

    res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  create,
};