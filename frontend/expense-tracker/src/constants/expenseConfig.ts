import {
  LuUtensils, // 餐饮
  LuCar, // 交通
  LuShoppingCart, // 购物
  LuHouse, // 住房
  LuGamepad2, // 娱乐
  LuHeartPulse, // 健康
  LuBookOpen, // 教育
  LuSmartphone, // 通讯
  LuPackage, // 日用品
  LuPlane, // 旅行
  LuHandHeart, // 社交
  LuEllipsisVertical, // 其他
} from "react-icons/lu";

export const EXPENSE_CATEGORY = {
  FOOD: "food",
  TRANSPORT: "transport",
  SHOPPING: "shopping",
  HOUSING: "housing",
  ENTERTAINMENT: "entertainment",
  HEALTH: "health",
  EDUCATION: "education",
  COMMUNICATION: "communication",
  DAILY: "daily",
  TRAVEL: "travel",
  SOCIAL: "social",
  OTHER: "other",
} as const;

export const EXPENSE_CATEGORY_CONFIG = [
  {
    label: "餐饮",
    value: EXPENSE_CATEGORY.FOOD,
    icon: LuUtensils,
    color: "#f87171",
  },
  {
    label: "交通",
    value: EXPENSE_CATEGORY.TRANSPORT,
    icon: LuCar,
    color: "#60a5fa",
  },
  {
    label: "购物",
    value: EXPENSE_CATEGORY.SHOPPING,
    icon: LuShoppingCart,
    color: "#fbbf24",
  },
  {
    label: "住房",
    value: EXPENSE_CATEGORY.HOUSING,
    icon: LuHouse,
    color: "#34d399",
  },
  {
    label: "娱乐",
    value: EXPENSE_CATEGORY.ENTERTAINMENT,
    icon: LuGamepad2,
    color: "#a78bfa",
  },
  {
    label: "健康",
    value: EXPENSE_CATEGORY.HEALTH,
    icon: LuHeartPulse,
    color: "#f472b6",
  },
  {
    label: "教育",
    value: EXPENSE_CATEGORY.EDUCATION,
    icon: LuBookOpen,
    color: "#fbbf24",
  },
  {
    label: "通讯",
    value: EXPENSE_CATEGORY.COMMUNICATION,
    icon: LuSmartphone,
    color: "#60a5fa",
  },
  {
    label: "日用品",
    value: EXPENSE_CATEGORY.DAILY,
    icon: LuPackage,
    color: "#34d399",
  },
  {
    label: "旅行",
    value: EXPENSE_CATEGORY.TRAVEL,
    icon: LuPlane,
    color: "#a78bfa",
  },
  {
    label: "社交",
    value: EXPENSE_CATEGORY.SOCIAL,
    icon: LuHandHeart,
    color: "#f472b6",
  },
  {
    label: "其他",
    value: EXPENSE_CATEGORY.OTHER,
    icon: LuEllipsisVertical,
    color: "#9ca3af",
  },
] as const;
