import api from "./axios";

export const getMyNotifications = () =>
  api.get("/notifications/my");
