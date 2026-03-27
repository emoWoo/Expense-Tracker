import { LuArrowRight } from "react-icons/lu";
import dayjs from "dayjs";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

interface RecentTransactionProps {
  transactions?: {
    _id: string;
    amount: number;
    type: "income" | "expense";
    category?: string;
    source?: string;
    icon: string;
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
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={
              item.type === "expense" ? item.category || "" : item.source || ""
            }
            icon={item.icon}
            date={dayjs().format("YYYY-MM-DD")} //(item.date).format("YYYY-MM-DD")
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
