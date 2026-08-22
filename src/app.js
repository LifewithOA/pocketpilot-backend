const express = require("express");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoute");
const categoryRoutes = require("./routes/categoryRoute");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);

module.exports = app;