const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const { getAll, create } = require("../controllers/categoryController");


router.get("/", authenticate, getAll);
router.post("/",authenticate, create);

module.exports = router;