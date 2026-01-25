// controllers/messageController.js
const messageModel = require("../models/messageModel");

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

const getMessagesByListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const user_id = req.user.id;

    const messages = await messageModel.getMessagesByListing(
      listingId,
      user_id
    );

    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendMessage,
  getMessagesByListing,
};
