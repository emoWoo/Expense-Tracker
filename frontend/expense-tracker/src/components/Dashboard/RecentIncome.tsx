import { LuArrowRight } from "react-icons/lu";
import type { Transaction } from "../../types/transaction";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { INCOME_SOURCE_CONFIG } from "../../constants/incomeConfig";
import dayjs from "dayjs";

interface RecentIncomeProps {
  transactions: Transaction[];
  onSeeMore: () => void;
}

const RecentIncome = ({ transactions, onSeeMore }: RecentIncomeProps) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">收入</h5>

        <button className="card-btn" onClick={onSeeMore}>
          <span className="leading-none translate-y-[1px]">查看更多</span>
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((i) => {
          const sourceConfig =
            INCOME_SOURCE_CONFIG.find((item) => item.value === i.source) ||
            INCOME_SOURCE_CONFIG.find((item) => item.value === "other");
          return (
            <TransactionInfoCard
              key={i._id}
              icon={sourceConfig?.icon}
              description={i.description}
              date={dayjs(i.date).format("YYYY-MM-DD")}
              amount={i.amount}
              type="income"
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentIncome;
