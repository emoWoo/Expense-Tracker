import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "仪表盘",
    key: "dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "收入",
    key: "income",
    icon: LuHandCoins,
    path: "/income",
  },
  {
    id: "03",
    label: "支出",
    key: "expense",
    icon: LuWalletMinimal,
    path: "/expense",
  },
  {
    id: "04",
    label: "退出登录",
    key: "logout",
    icon: LuLogOut,
    path: "logout",
  },
];
