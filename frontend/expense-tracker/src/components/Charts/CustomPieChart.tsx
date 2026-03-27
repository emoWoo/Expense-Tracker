import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import { addThounsandsSeparate } from "../../utils/helper";

interface CustomPieChartProps {
  data: { name: string; amount: number }[];
  label: string;
  totalAmount: number;
  colors: string[];
  showTextAnchor?: boolean;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        />
        <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
        <Legend content={<CustomLegend />} />
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              ¥{addThounsandsSeparate(totalAmount)}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
