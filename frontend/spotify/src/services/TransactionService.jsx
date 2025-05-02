import api from "../api/axios";
import { apiRequest } from "../api/ApiRequest";

const TransactionService = {
  createTransaction: async (planId) => {
    return await apiRequest(() => {
      return api.post("/transactions/", { plan_id: planId });
    });
  },

  updateStatusTransaction: async (orderCode) => {
    return await apiRequest(() => {
      return api.put("transactions/", { orderCode: orderCode, status: "success" });
    });
  }
};

export default TransactionService;
