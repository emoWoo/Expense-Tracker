import { useMemo } from "react";
import type { Transaction } from "../../types/transaction";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

interface IncomeOverviewProps {
  transactions: Transaction[];
  onAddIncome?: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {
  const chartData = useMemo(
    () => prepareIncomeBarChartData(transactions),
    [transactions],
  );

  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
          <h5 className="text-lg">income overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">abcabc</p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart data={chartData} type="income" />
      </div>
    </div>
  );
};

export default IncomeOverview;
