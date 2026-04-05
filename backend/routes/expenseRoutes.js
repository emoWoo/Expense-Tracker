const express = require("express");

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  deleteAllExpense,
  downloadExpenseExcel,
} = require("../controllers/ExpenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/delete/:id", protect, deleteExpense);
router.delete("/delete", protect, deleteAllExpense);
router.get("/download-excel", protect, downloadExpenseExcel);

module.exports = router;
