const express = require("express");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  deleteAllIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get-all", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.delete("/delete", protect, deleteAllIncome);
router.get("/download-excel", protect, downloadIncomeExcel);

module.exports = router;
