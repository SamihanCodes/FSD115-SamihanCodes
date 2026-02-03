import api from "./axios";

export const updateProfile = (data) =>
  api.put("/users/profile", data);

export const changePassword = (data) =>
  api.put("/users/password", data);
