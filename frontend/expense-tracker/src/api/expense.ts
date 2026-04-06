import { request } from "../utils/request";
import type { ExpenseFormData } from "../types/expense";

export const expenseApi = {
  getExpenses: () => {
    return request.get("/expense/get");
  },
  addExpense: (expense: ExpenseFormData) => {
    return request.post("/expense/add", expense);
  },
  deleteExpense: (id: string) => {
    return request.delete(`/expense/delete/${id}`);
  },
  downloadExpenseExcel: () => {
    return request.get("/expense/download-excel");
  },
};
