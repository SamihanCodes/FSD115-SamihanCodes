import api from "./axios";

export const sendMessage = (data) =>
  api.post("/messages", data);

export const getMessagesByListing = (listingId, buyerId) =>
  api.get(`/messages/listing/${listingId}`, {
    params: { buyerId },
  });

export const getBuyersForListing = (listingId) =>
  api.get(`/messages/listing/${listingId}/buyers`);
// Buyer: get all my chats
export const getBuyerChats = () =>
  api.get("/messages/buyer");

