import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 ">
        <h2 className="text-lg text-black font-medium">记账本本</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-20 border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7 -left-5" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            color="bg-primary"
            label="统计一下收入和支出"
            icon={<LuTrendingUpDown />}
            value="¥10,000"
          />
        </div>

        <img
          className="rounded-2xl w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
          src={CARD_2}
        />
      </div>
    </div>
  );
};

export default AuthLayout;

interface StatsInfoCardProps {
  color: string;
  label: string;
  icon: React.ReactNode; // 因为你传入的是 <LuTrendingDown />
  value: string;
}

const StatsInfoCard: React.FC<StatsInfoCardProps> = ({
  color,
  label,
  icon,
  value,
}) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white rounded-full drop-shadow-xl ${color}`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">{value}</span>
      </div>
    </div>
  );
};
