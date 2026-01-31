const messageModel = require("../models/messageModel");

// SEND MESSAGE (buyer or seller)
const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { listing_id, receiver_id, message } = req.body;

    if (!listing_id || !receiver_id || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const msg = await messageModel.createMessage(
      listing_id,
      sender_id,
      receiver_id,
      message
    );

    res.status(201).json(msg);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CHAT BETWEEN TWO USERS FOR A LISTING
const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { listingId, otherUserId } = req.params;
    const userId = req.user.id;

    const messages = await messageModel.getMessagesBetweenUsers(
      listingId,
      userId,
      otherUserId
    );

    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// BUYER DASHBOARD: GET SELLERS
const getSellersForBuyer = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const sellers = await messageModel.getSellersForBuyer(buyerId);
    res.json(sellers);
  } catch (error) {
    console.error("Get sellers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// SELLER DASHBOARD: GET BUYERS FOR LISTING
const getBuyersForListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const buyers = await messageModel.getBuyersForListing(listingId);
    res.json(buyers);
  } catch (error) {
    console.error("Get buyers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getBuyerChats = async (req, res) => {
  try {
    const buyer_id = req.user.id;

    const chats = await messageModel.getBuyerChats(buyer_id);
    res.json(chats);
  } catch (error) {
    console.error("Get buyer chats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  getSellersForBuyer,
  getBuyersForListing,
  getBuyerChats,
};
