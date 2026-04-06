import { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import type { Transaction } from "../../types/transaction";

interface GroupedExpenseItem {
  date: string;
  expense: Transaction[];
}

interface Last30DaysExpensesProps {
  transactions: GroupedExpenseItem[];
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

      <CustomBarChart data={chartData} type="expense" />
    </div>
  );
};

export default Last30DaysExpenses;
