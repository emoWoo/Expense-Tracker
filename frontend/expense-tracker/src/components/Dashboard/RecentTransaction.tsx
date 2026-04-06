import { LuArrowRight } from "react-icons/lu";
import dayjs from "dayjs";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { EXPENSE_CATEGORY_CONFIG } from "../../constants/expenseConfig";
import { INCOME_SOURCE_CONFIG } from "../../constants/incomeConfig";

interface RecentTransactionProps {
  transactions?: {
    _id: string;
    amount: number;
    type: "income" | "expense";
    category?: string;
    source?: string;
    description?: string;
    date: string;
  }[];
  onSeeMore?: () => void;
}

const RecentTransaction: React.FC<RecentTransactionProps> = ({
  transactions,
  onSeeMore,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">最近交易</h5>

        <button className="card-btn" onClick={onSeeMore}>
          <span className="leading-none translate-y-[1px]">查看更多</span>
          <LuArrowRight className="text-base"></LuArrowRight>
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => {
          const config =
            item.type === "expense"
              ? EXPENSE_CATEGORY_CONFIG.find(
                  (configItem) => configItem.value === item.category,
                ) ||
                EXPENSE_CATEGORY_CONFIG.find(
                  (configItem) => configItem.value === "other",
                )
              : INCOME_SOURCE_CONFIG.find(
                  (configItem) => configItem.value === item.source,
                ) ||
                INCOME_SOURCE_CONFIG.find(
                  (configItem) => configItem.value === "other",
                );

          return (
            <TransactionInfoCard
              key={item._id}
              icon={config?.icon}
              description={item.description}
              date={dayjs(item.date).format("YYYY-MM-DD")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransaction;
