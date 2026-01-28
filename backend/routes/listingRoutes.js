const express = require("express");
const router = express.Router();

const {
  createListing,
  getAllListings,
  getMyListings,
  updateListingStatus,
  updateListing,
  searchListings,
  deleteListing,
} = require("../controllers/listingController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// 🔍 SEARCH MUST COME FIRST
router.get("/search", searchListings);

// 🌍 PUBLIC – buyer listings
router.get("/", getAllListings);

// 🐄 CREATE LISTING
router.post(
  "/",
  authenticate,
  authorizeRole("seller"),
  upload.array("images", 5),
  createListing
);

// 👤 SELLER LISTINGS
router.get(
  "/my",
  authenticate,
  authorizeRole("seller"),
  getMyListings
);

// ✏️ EDIT
router.put(
  "/:id",
  authenticate,
  authorizeRole("seller"),
  updateListing
);

// 🔄 STATUS
router.patch(
  "/:id/status",
  authenticate,
  authorizeRole("seller"),
  updateListingStatus
);

// ❌ DELETE (PERMANENT)
router.delete(
  "/:id",
  authenticate,
  authorizeRole("seller"),
  deleteListing
);

module.exports = router;
