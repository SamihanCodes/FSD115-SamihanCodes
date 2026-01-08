const express = require("express");
const router = express.Router();

const {
  createListing,
  getAllListings,
  getMyListings,
  updateListingStatus,
} = require("../controllers/listingController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Public route — view all listings
router.get("/", getAllListings);

// Seller-only route — create listing
router.post(
  "/",
  authenticate,
  authorizeRole("seller"),
  createListing
);

// Seller-only route — view own listings
router.get(
  "/my",
  authenticate,
  authorizeRole("seller"),
  getMyListings
);

// Seller-only route — update listing status
router.patch(
  "/:id/status",
  authenticate,
  authorizeRole("seller"),
  updateListingStatus
);

module.exports = router;
