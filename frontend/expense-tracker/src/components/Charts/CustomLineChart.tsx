import {
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { addThounsandsSeparate } from "../../utils/helper";
import { EXPENSE_CATEGORY_CONFIG } from "../../constants/expenseConfig";

type ChartDataItem = {
  date?: string;
  totalAmount: number;
  expense: {
    category: string;
    amount: number;
  }[];
};

const expenseCategoryLabelMap = EXPENSE_CATEGORY_CONFIG.reduce(
  (acc, item) => {
    acc[item.value] = item.label;
    return acc;
  },
  {} as Record<string, string>,
);

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
    const { date, totalAmount, expense } = payload[0].payload;

    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">{date}</p>
        <div className="space-y-1 mb-2">
          {expense.map((item, index) => (
            <p
              key={`${item.category}-${index}`}
              className="text-xs text-gray-600"
            >
              {expenseCategoryLabelMap[item.category] || item.category}: ¥
              {addThounsandsSeparate(item.amount)}
            </p>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          总计:{" "}
          <span className="text-sm font-medium text-gray-900">
            ¥{addThounsandsSeparate(totalAmount)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }: { data: ChartDataItem[] }) => {
  console.log("Chart data:", data);
  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#875cf5"
            fillOpacity={1}
            fill="url(#colorAmount)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
