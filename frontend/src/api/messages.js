import api from "./axios";

export const sendMessage = (data) => {
  return api.post("/messages", data);
};

export const getMessagesByListing = (listingId) => {
  return api.get(`/messages/${listingId}`);
};
