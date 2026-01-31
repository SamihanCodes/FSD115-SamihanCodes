const chatModel = require("../models/chatModel");

// Buyer starts chat
const startChat = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const { seller_id, listing_id } = req.body;

    const convo = await chatModel.getOrCreateConversation(
      buyer_id,
      seller_id,
      listing_id
    );

    res.json(convo);
  } catch (err) {
    console.error("Start chat error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Send message
const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { conversation_id, message } = req.body;

    const msg = await chatModel.sendMessage(
      conversation_id,
      sender_id,
      message
    );

    res.status(201).json(msg);
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get messages
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await chatModel.getMessages(conversationId);
    res.json(messages);
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Buyer chats
const getBuyerChats = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const chats = await chatModel.getBuyerConversations(buyer_id);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Seller chats
const getSellerChats = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const chats = await chatModel.getSellerConversations(seller_id);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  startChat,
  sendMessage,
  getMessages,
  getBuyerChats,
  getSellerChats,
};
