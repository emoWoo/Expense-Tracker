import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { addThounsandsSeparate } from "../../utils/helper";

interface TransactionInfoCardProps {
  icon?: IconType;
  description?: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  hideDeleteBtn?: boolean;
  onDelete?: () => void;
}

const TransactionInfoCard: React.FC<TransactionInfoCardProps> = ({
  icon,
  description,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyle = () => {
    return type === "income"
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";
  };

  const Icon = icon;

  return (
    <div className=" group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {Icon ? <Icon size={22} /> : <LuUtensils size={22} />}
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{description}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyle()}`}
          >
            <div className="text-xs font-medium leading-none translate-y-[2px]">
              {type === "income" ? "+" : "-"}¥{addThounsandsSeparate(amount)}
            </div>
            {type === "income" ? (
              <LuTrendingUp className="text-green-500" />
            ) : (
              <LuTrendingDown className="text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
