import { LuDownload } from "react-icons/lu";
import type { Transaction } from "../../types/transaction";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import dayjs from "dayjs";
import { EXPENSE_CATEGORY_CONFIG } from "../../constants/expenseConfig";

type ExpenseListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onDownload: () => void;
};

const ExpenseList = ({
  transactions,
  onDelete,
  onDownload,
}: ExpenseListProps) => {
  const config = (category: string | undefined) => {
    const config = EXPENSE_CATEGORY_CONFIG.find(
      (item) => item.value === category,
    );
    return config ? config : null;
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">所有支出</h5>

        <button className="card-btn">
          <LuDownload className="text-sm" />
          下载
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            description={expense.description}
            icon={config(expense.category)?.icon}
            date={dayjs(expense.date).format("YYYY-MM-Do")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
