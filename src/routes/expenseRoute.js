const express = require("express");
const router = express.Router();

const { create } = require("../controllers/expenseController");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, create);

module.exports = router;