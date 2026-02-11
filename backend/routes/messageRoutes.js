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

// CHAT WINDOW 
router.get(
  "/chat/:listingId/:otherUserId",
  authenticate,
  getMessagesBetweenUsers
);

// BUYER DASHBOARD 
router.get(
  "/buyer/sellers",
  authenticate,
  getSellersForBuyer
);

router.get(
  "/buyer",
  authenticate,
  getBuyerChats
);


router.get(
  "/seller/listing/:listingId/buyers",
  authenticate,
  getBuyersForListing
);


router.get(
  "/seller/chats",
  authenticate,
  getSellerChats
);

module.exports = router;
