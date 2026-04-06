import { LuPlus } from "react-icons/lu";
import type { Transaction } from "../../types/transaction";
import { useMemo } from "react";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";

interface GroupedExpenseItem {
  date: string;
  expense: Transaction[];
}

interface ExpenseOverviewProps {
  transactions: GroupedExpenseItem[];
  onAddExpense?: () => void;
}

const ExpenseOverview = ({
  transactions,
  onAddExpense,
}: ExpenseOverviewProps) => {
  const chartData = useMemo(
    () => prepareExpenseLineChartData(transactions),
    [transactions],
  );

  console.log("ExpenseOverview transactions:", transactions);

  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
          <h5 className="text-lg">支出概览</h5>
          <p className="text-xs text-gray-400 mt-0.5">实时记录你的开支</p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          添加支出
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
