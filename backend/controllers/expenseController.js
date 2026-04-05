const Expense = require("../models/Expense");
const xlsx = require("xlsx");

//添加花费
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { description, category, amount, date } = req.body;

    if (!category || !amount || !description) {
      return res.status(400).json({ message: "请提供完整的收入信息！" });
    }

    const newExpense = await Expense.create({
      userId,
      description,
      category,
      amount,
      date: new Date(date),
    });

    res.status(201).json({ message: "花费添加成功！", Expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "添加花费失败！", error: error.message });
  }
};

//获取所有花费
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const allExpense = await Expense.find({ userId }).sort({ date: -1 });
    const groupedExpense = Object.values(
      allExpense.reduce((acc, item) => {
        const dateKey = new Date(item.date).toISOString().split("T")[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            expense: [],
          };
        }

        acc[dateKey].expense.push(item);
        return acc;
      }, {}),
    );
    res.status(200).json({
      message: "获取花费成功！",
      expense: allExpense,
      groupedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "获取花费失败！", error: error.message });
  }
};

//删除花费
exports.deleteExpense = async (req, res) => {
  const ExpenseId = req.params.id;

  try {
    await Expense.findOneAndDelete(ExpenseId);
    res.status(200).json({ message: "删除花费成功！" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//删除所有花费
exports.deleteAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    await Expense.deleteMany({ userId });
    res.status(200).json({ message: "删除所有花费成功！" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//下载收入Excel，可以改进成流的方式不占用服务器存储空间
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const Expenses = await Expense.find({ userId }).sort({ date: -1 });

    const data = Expenses.map((Expense) => ({
      类别: Expense.category,
      数目: Expense.amount,
      日期: Expense.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");
    xlsx.writeFile(wb, "Expenses_detail.xlsx");
    res.download("Expenses_detail.xlsx");
  } catch (error) {
    res.status(500).json({ message: "下载Excel失败！", error: error.message });
  }
};
