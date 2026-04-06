import { LuDownload } from "react-icons/lu";
import type { Transaction } from "../../types/transaction";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import dayjs from "dayjs";
import { INCOME_SOURCE_CONFIG } from "../../constants/incomeConfig";

type IcomeListProps = {
  transactions: Transaction[];
  onDelete: (income: Transaction) => void;
  //   onEdit: (income: Transaction) => void;
  onDownload: (income: Transaction) => void;
};

const IcomeList = ({ transactions, onDelete, onDownload }: IcomeListProps) => {
  const config = (source: string | undefined) => {
    const config = INCOME_SOURCE_CONFIG.find((item) => item.value === source);
    return config ? config : null;
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">收入来源</h5>

        <button className="card-btn">
          <LuDownload className="text-sm" />
          下载
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            description={income.description}
            icon={config(income.source)?.icon}
            date={dayjs(income.date).format("YYYY-MM-DD")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income)}
          />
        ))}
      </div>
    </div>
  );
};

export default IcomeList;
