import { LuArrowRight } from "react-icons/lu";
import type { Transaction } from "../../types/transaction";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { EXPENSE_CATEGORY_CONFIG } from "../../constants/expenseConfig";
import dayjs from "dayjs";

interface ExpenseTransactionsProps {
  transactions: Transaction[];
  onSeeMore?: () => void;
}

const ExpenseTransactions = ({
  transactions,
  onSeeMore,
}: ExpenseTransactionsProps) => {
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
        {transactions?.slice(0, 5)?.map((i) => {
          const categoryConfig =
            EXPENSE_CATEGORY_CONFIG.find((item) => item.value === i.category) ||
            EXPENSE_CATEGORY_CONFIG.find((item) => item.value === "other");

          return (
            <TransactionInfoCard
              key={i._id}
              icon={categoryConfig?.icon}
              description={i.description}
              date={dayjs(i.date).format("YYYY-MM-DD")}
              amount={i.amount}
              type="expense"
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
