import CustomPieChart from "../Charts/CustomPieChart";
import type { Transaction } from "../../types/transaction";
import { prepareIncomePieChartData } from "../../utils/helper";
import { useMemo } from "react";
interface RecentIncomeWithChartProps {
  data: Transaction[];
  totalIncome: number;
}
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];
const RecentIncomeWithChart = ({
  data,
  totalIncome,
}: RecentIncomeWithChartProps) => {
  const charData = useMemo(() => prepareIncomePieChartData(data), [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">近60天的收入</h5>
      </div>

      <CustomPieChart
        data={charData}
        label="总收入"
        totalAmount={totalIncome}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
