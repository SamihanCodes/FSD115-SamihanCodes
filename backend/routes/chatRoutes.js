const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");

// Buyer starts chat
router.post("/start", authenticate, chatController.startChat);

// Send message
router.post("/message", authenticate, chatController.sendMessage);

// Get messages
router.get("/messages/:conversationId", authenticate, chatController.getMessages);

// Buyer conversations
router.get("/buyer", authenticate, chatController.getBuyerChats);

// Seller conversations
router.get("/seller", authenticate, chatController.getSellerChats);

module.exports = router;
