import { request } from "../utils/request";
import type { IncomeFormData } from "../types/income";

export const incomeApi = {
  getIcomes: () => {
    return request.get("/income/get");
  },
  addIcome: (income: IncomeFormData) => {
    return request.post("/income/add", income);
  },
  deleteIcome: (id: string) => {
    return request.delete(`/income/delete/${id}`);
  },
};
