import { LuArrowRight } from "react-icons/lu";
import type { Transaction } from "../../pages/Dashboard/Home";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import dayjs from "dayjs";

interface ExpenseTransactionsProps {
  transactions: Transaction[];
  onSeeMore?: () => void;
}

const ExpenseTransactions = ({
  transactions,
  onSeeMore,
}: ExpenseTransactionsProps) => {
  console.log("ExpenseTransactions transactions:", transactions);
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">花费</h5>

        <button className="card-btn" onClick={onSeeMore}>
          <span className="leading-none translate-y-[1px]">查看更多</span>
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((i) => (
          <TransactionInfoCard
            key={i._id}
            title={i.category || ""}
            icon={i.icon || ""}
            date={dayjs(i.date).format("YYYY-MM-DD")}
            amount={i.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
