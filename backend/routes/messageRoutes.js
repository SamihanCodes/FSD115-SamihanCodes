// routes/messageRoutes.js
const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessagesByListing,
} = require("../controllers/messageController");

const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, sendMessage);
router.get("/:listingId", authenticate, getMessagesByListing);

module.exports = router;
