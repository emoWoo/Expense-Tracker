import dayjs from "dayjs";
import type { Transaction } from "../types/transaction";
import { INCOME_SOURCE_CONFIG } from "../constants/incomeConfig";
import { EXPENSE_CATEGORY_CONFIG } from "../constants/expenseConfig";
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name: string) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0].toUpperCase();
  }

  return initials;
};

export const addThounsandsSeparate = (num: number) => {
  if (num === null || isNaN(num)) return "";

  const [integerPart, decimalPart] = num.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (
  data: { date: string; expense: Transaction[] }[],
) => {
  return data
    .map((item) => ({
      date: dayjs(item.date).format("MM-DD"),
      totalAmount: item.expense.reduce(
        (sum, expenseItem) => sum + (expenseItem.amount || 0),
        0,
      ),
      activity: item.expense.map((expenseItem) => ({
        name:
          EXPENSE_CATEGORY_CONFIG.find(
            (configItem) => configItem.value === expenseItem.category,
          )?.label || "其他",
        amount: expenseItem.amount || 0,
      })),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const prepareIncomePieChartData = (data: Transaction[]) => {
  const chartData = data.map((item) => {
    const sourceConfig =
      INCOME_SOURCE_CONFIG.find(
        (configItem) => configItem.value === item?.source,
      ) ||
      INCOME_SOURCE_CONFIG.find((configItem) => configItem.value === "other");

    return {
      name: sourceConfig?.label || "其他",
      amount: item?.amount || 0,
    };
  });

  return chartData;
};

export const prepareIncomeBarChartData = (
  data: { date: string; income: Transaction[] }[],
) => {
  return data
    .map((item) => ({
      date: dayjs(item.date).format("MM-DD"),
      totalAmount: item.income.reduce(
        (sum, incomeItem) => sum + (incomeItem.amount || 0),
        0,
      ),
      activity: item.income.map((incomeItem) => ({
        name:
          INCOME_SOURCE_CONFIG.find(
            (configItem) => configItem.value === incomeItem.source,
          )?.label || "其他",
        amount: incomeItem.amount || 0,
      })),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const prepareExpenseLineChartData = (
  data: { date: string; expense: Transaction[] }[],
) => {
  return data
    .map((item) => ({
      date: dayjs(item.date).format("MM-DD"),
      totalAmount: item.expense.reduce(
        (sum, expenseItem) => sum + (expenseItem.amount || 0),
        0,
      ),
      expense: item.expense.map((expenseItem) => ({
        category: expenseItem.category || "其他",
        amount: expenseItem.amount || 0,
      })),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
