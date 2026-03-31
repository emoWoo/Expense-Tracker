import {
  LuBriefcase, // 工资
  LuGift, // 奖金 / 礼金
  LuLaptop, // 兼职
  LuBitcoin, // 投资
  LuRocket, // 副业
  LuRotateCcw, // 退款
  LuHeartHandshake, // 礼金（人情）
  LuEllipsis, // 其他
} from "react-icons/lu";

export const INCOME_SOURCE = {
  SALARY: "salary",
  BONUS: "bonus",
  PART_TIME: "part_time",
  INVESTMENT: "investment",
  SIDE: "side",
  REFUND: "refund",
  GIFT: "gift",
  OTHER: "other",
} as const;

export const INCOME_SOURCE_CONFIG = [
  {
    label: "工资",
    value: INCOME_SOURCE.SALARY,
    icon: LuBriefcase,
    color: "#3b82f6",
  },
  {
    label: "奖金",
    value: INCOME_SOURCE.BONUS,
    icon: LuGift,
    color: "#f59e0b",
  },
  {
    label: "兼职",
    value: INCOME_SOURCE.PART_TIME,
    icon: LuLaptop,
    color: "#06b6d4",
  },
  {
    label: "投资",
    value: INCOME_SOURCE.INVESTMENT,
    icon: LuBitcoin,
    color: "#22c55e",
  },
  {
    label: "副业",
    value: INCOME_SOURCE.SIDE,
    icon: LuRocket,
    color: "#8b5cf6",
  },
  {
    label: "退款",
    value: INCOME_SOURCE.REFUND,
    icon: LuRotateCcw,
    color: "#64748b",
  },
  {
    label: "礼金",
    value: INCOME_SOURCE.GIFT,
    icon: LuHeartHandshake,
    color: "#ec4899",
  },
  {
    label: "其他",
    value: INCOME_SOURCE.OTHER,
    icon: LuEllipsis,
    color: "#9ca3af",
  },
] as const;
