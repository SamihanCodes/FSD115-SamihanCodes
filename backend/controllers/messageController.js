const pool = require("../config/db");
const messageModel = require("../models/messageModel");

//  Send message
const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { listing_id, receiver_id, message } = req.body;

    if (!listing_id || !receiver_id || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    //  Check listing status
    const listingRes = await pool.query(
      "SELECT status FROM listings WHERE id = $1",
      [listing_id]
    );

    if (listingRes.rows.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listingRes.rows[0].status === "sold") {
      return res
        .status(403)
        .json({ message: "Chat closed. Listing sold." });
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
    const { buyerId } = req.query;

    const userId = req.user.id;
    const role = req.user.role;

    const messages = await messageModel.getMessagesByListing(
      listingId,
      buyerId,
      userId,
      role
    );

    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Seller sidebar
const getBuyersForListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    const buyers = await messageModel.getBuyersForListing(
      listingId
    );

    res.json(buyers);
  } catch (error) {
    console.error("Get buyers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendMessage,
  getMessagesByListing,
  getBuyersForListing,
};
