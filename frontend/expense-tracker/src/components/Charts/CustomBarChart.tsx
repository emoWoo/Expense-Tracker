import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { addThounsandsSeparate } from "../../utils/helper";
import type { Transaction } from "../../types/transaction";

type ChartDataItem = {
  date: string;
  activity: {
    name: string;
    amount: number;
  }[];
  totalAmount: number;
};

type TooltipPayloadItem = {
  color?: string;
  dataKey?: string;
  fill?: string;
  name?: string;
  payload: ChartDataItem;
  value?: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload?.date}
        </p>
        <div className="space-y-1 mb-2">
          {payload[0].payload?.activity.map((item, index) => (
            <p key={`${item.name}-${index}`} className="text-xs text-gray-600">
              {item.name || "abc"}: ¥{addThounsandsSeparate(item.amount)}
            </p>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          数目:{" "}
          <span className="text-sm font-medium text-gray-900">
            ¥{addThounsandsSeparate(payload[0].payload.totalAmount)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

type CustomBarChartProps = {
  data: ChartDataItem[];
  type: "income" | "expense";
};
const CustomBarChart = ({ data, type }: CustomBarChartProps) => {
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#eee" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="totalAmount"
            radius={[10, 10, 0, 0]}
            fill="#FF8042"
            shape={(props) => {
              const { x, y, width, height, index } = props;

              const fill = index % 2 === 0 ? "#875cf5" : "#cfbefb";

              return (
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  radius={[10, 10, 0, 0]}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
