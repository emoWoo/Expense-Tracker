import { addThounsandsSeparate } from "../../utils/helper";
import { EXPENSE_CATEGORY_CONFIG } from "../../constants/expenseConfig";
import { INCOME_SOURCE_CONFIG } from "../../constants/incomeConfig";

export interface PayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const name =
      EXPENSE_CATEGORY_CONFIG.find((item) => item.value === payload[0].name)
        ?.label ||
      INCOME_SOURCE_CONFIG.find((item) => item.value === payload[0].name)
        ?.label ||
      payload[0].name ||
      "Unknown";
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">{name}</p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-900">
            ¥{addThounsandsSeparate(payload[0].value)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
