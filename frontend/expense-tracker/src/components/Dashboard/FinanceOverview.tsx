import CustomPieChart from "../Charts/CustomPieChart";

interface FinanceOverviewProps {
  totalBlance: number;
  totalIncome: number;
  totalExpense: number;
}

const COLORS = ["#875CF5", "#f27313", "#e74341"];

const FinanceOverview: React.FC<FinanceOverviewProps> = ({
  totalBlance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    { name: "总余额", amount: totalBlance },
    { name: "总收入", amount: totalIncome },
    { name: "总支出", amount: totalExpense },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">财务概览</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="总余额"
        totalAmount={totalBlance}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
