const express = require("express");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoute");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

module.exports = app;