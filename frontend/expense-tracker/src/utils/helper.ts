import type { Transaction } from "../pages/Dashboard/Home";

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

export const prepareExpenseBarChartData = (data: Transaction[]) => {
  const chartData = data.map((item) => {
    return {
      category: item?.category || "其他",
      amount: item?.amount || 0,
    };
  });

  return chartData;
};

export const prepareIncomePieChartData = (data: Transaction[]) => {
  console.log("Preparing pie chart data from transactions:", data);
  const chartData = data.map((item) => {
    return {
      name: item?.source || "其他",
      amount: item?.amount || 0,
    };
  });

  return chartData;
};
