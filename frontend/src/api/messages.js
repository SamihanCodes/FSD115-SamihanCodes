import api from "./axios";

export const sendMessage = (data) =>
  api.post("/messages", data);

export const getMessagesBetweenUsers = (listingId, otherUserId) =>
  api.get(`/messages/chat/${listingId}/${otherUserId}`);

export const getBuyerChats = () =>
  api.get("/messages/buyer");

export const getBuyersForListing = (listingId) =>
  api.get(`/messages/seller/listing/${listingId}/buyers`);
