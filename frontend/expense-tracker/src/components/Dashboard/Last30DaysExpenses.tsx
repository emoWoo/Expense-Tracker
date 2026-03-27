import { useMemo } from "react";
import type { Transaction } from "../../pages/Dashboard/Home";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

interface Last30DaysExpensesProps {
  transactions: Transaction[];
}

const Last30DaysExpenses = ({ transactions }: Last30DaysExpensesProps) => {
  const chartData = useMemo(
    () => prepareExpenseBarChartData(transactions),
    [transactions],
  );

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">近30天的支出</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
