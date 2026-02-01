const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessagesBetweenUsers,
  getSellersForBuyer,
  getBuyersForListing,
  getSellerChats,
  getBuyerChats,
} = require("../controllers/messageController");

// SEND MESSAGE (buyer or seller)
router.post("/", authenticate, sendMessage);

// CHAT WINDOW (buyer <-> seller for a listing)
router.get(
  "/chat/:listingId/:otherUserId",
  authenticate,
  getMessagesBetweenUsers
);

// BUYER DASHBOARD → all sellers buyer chatted with
router.get(
  "/buyer/sellers",
  authenticate,
  getSellersForBuyer
);

// BUYER DASHBOARD → all chats
router.get(
  "/buyer",
  authenticate,
  getBuyerChats
);

// SELLER → buyers for a specific listing
router.get(
  "/seller/listing/:listingId/buyers",
  authenticate,
  getBuyersForListing
);

// SELLER DASHBOARD → all buyer chats across all listings
router.get(
  "/seller/chats",
  authenticate,
  getSellerChats
);

module.exports = router;
