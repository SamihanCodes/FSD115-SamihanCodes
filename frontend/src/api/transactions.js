import api from "./axios";

export const getMyTransactions = () =>
  api.get("/transactions/my");

export const payTransaction = (id) =>
  api.patch(`/transactions/${id}/pay`);
