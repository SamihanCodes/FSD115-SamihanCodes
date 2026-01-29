const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessagesByListing,
  getBuyersForListing,
} = require("../controllers/messageController");

// Send message
router.post("/", authenticate, sendMessage);

router.get(
  "/:listingId",
  authenticate,
  getMessagesByListing
);

// Seller sidebar
router.get(
  "/:listingId/buyers",
  authenticate,
  getBuyersForListing
);

module.exports = router;
