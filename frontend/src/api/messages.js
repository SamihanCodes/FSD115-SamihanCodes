import api from "./axios";

// get buyers who contacted seller for a listing
export const getBuyersForListing = (listingId) => {
  return api.get(`/messages/listing/${listingId}/buyers`);
};

// get chat messages for a listing + buyer
export const getMessagesByListing = (listingId, buyerId) => {
  return api.get(`/messages/listing/${listingId}`, {
    params: { buyerId },
  });
};

// send message
export const sendMessage = (data) => {
  return api.post("/messages", data);
};
