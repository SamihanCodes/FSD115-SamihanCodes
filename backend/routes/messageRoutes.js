const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessagesBetweenUsers,
  getSellersForBuyer,
  getBuyersForListing,
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

// BUYER DASHBOARD - get all sellers buyer has chatted with
router.get(
  "/buyer/sellers",
  authenticate,
  getSellersForBuyer
);

// SELLER DASHBOARD - get buyers for a specific listing
router.get(
  "/seller/listing/:listingId/buyers",
  authenticate,
  getBuyersForListing
);
router.get("/buyer", authenticate, getBuyerChats);

module.exports = router;
