const express = require("express");

const authRoutes = require("./authRoutes");
const incomeRoutes = require("./incomeRoutes");
const expneseRoutes = require("./expenseRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/income", incomeRoutes);
router.use("/expense", expneseRoutes);

module.exports = router;
