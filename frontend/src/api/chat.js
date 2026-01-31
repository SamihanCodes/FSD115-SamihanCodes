import api from "./axios";

// Buyer starts chat
export const startChat = (seller_id, listing_id) => {
  return api.post("/chats/start", { seller_id, listing_id });
};

// Send message
export const sendMessage = (conversation_id, message) => {
  return api.post("/chats/message", { conversation_id, message });
};

// Get messages
export const getMessages = (conversationId) => {
  return api.get(`/chats/messages/${conversationId}`);
};

// Buyer conversations
export const getBuyerChats = () => {
  return api.get("/chats/buyer");
};

// Seller conversations
export const getSellerChats = () => {
  return api.get("/chats/seller");
};
