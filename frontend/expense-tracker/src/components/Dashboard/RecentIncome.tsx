import { LuArrowRight } from "react-icons/lu";
import type { Transaction } from "../../pages/Dashboard/Home";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
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
        {transactions?.slice(0, 5)?.map((i) => (
          <TransactionInfoCard
            key={i._id}
            title={i.source || ""}
            icon={i.icon || ""}
            date={dayjs(i.date).format("YYYY-MM-DD")}
            amount={i.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
