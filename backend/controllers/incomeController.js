const Income = require("../models/Income");
const xlsx = require("xlsx");

//添加收入
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "请提供完整的收入信息！" });
    }

    const newIncome = await Income.create({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    res.status(201).json({ message: "收入添加成功！", income: newIncome });
  } catch (error) {
    res.status(500).json({ message: "添加收入失败！", error: error.message });
  }
};

//获取所有收入
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const allIncome = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ message: "获取收入成功！", income: allIncome });
  } catch (error) {
    res.status(500).json({ message: "获取收入失败！", error: error.message });
  }
};

//删除收入
exports.deleteIncome = async (req, res) => {
  const incomeId = req.params.id;

  try {
    await Income.findOneAndDelete(incomeId);
    res.status(200).json({ message: "删除收入成功！" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//删除所有收入
exports.deleteAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    await Income.deleteMany({ userId });
    res.status(200).json({ message: "删除所有收入成功！" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//下载收入Excel，可以改进成流的方式不占用服务器存储空间
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    const data = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: income.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "incomes_detail.xlsx");
    res.download("incomes_detail.xlsx");
  } catch (error) {
    res.status(500).json({ message: "下载Excel失败！", error: error.message });
  }
};
