const express = require("express");
const router = express.Router();

const { create, getAll, remove, update } = require("../controllers/expenseController");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.delete("/:id", authenticate, remove);
router.put("/:id", authenticate, update)

module.exports = router;