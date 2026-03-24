const express = require("express");

const authRoutes = require("./authRoutes");
const incomeRoutes = require("./incomeRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/income", incomeRoutes);

module.exports = router;
