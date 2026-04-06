import { useMemo } from "react";
import type { Transaction } from "../../types/transaction";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

type GroupedIncomeItem = {
  date: string;
  income: Transaction[];
};
interface IncomeOverviewProps {
  transactions: GroupedIncomeItem[];
  onAddIncome?: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {
  // const chartData = useMemo(
  //   () => prepareIncomeBarChartData(transactions),
  //   [transactions],
  // );

  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
          <h5 className="text-lg">收入概览</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            实时记录你的收入，并提醒你多挣点钱
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          增加收入
        </button>
      </div>
      <div className="mt-10">
        {/* <CustomBarChart data={chartData} type="income" /> */}
      </div>
    </div>
  );
};

export default IncomeOverview;
