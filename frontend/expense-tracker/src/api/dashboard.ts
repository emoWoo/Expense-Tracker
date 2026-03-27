import { request } from "../utils/request";

export const dashboardApi = {
  getDashboardData: () => {
    return request.get("/dashboard");
  },
};
