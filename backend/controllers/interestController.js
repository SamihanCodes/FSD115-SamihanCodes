const interestModel = require("../models/interestModel");
const pool = require("../config/db");

// Buyer shows interest in a listing
const createInterest = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const { listing_id } = req.body;

    if (!listing_id) {
      return res.status(400).json({
        message: "Listing ID is required",
      });
    }

    // Prevent buyer from showing interest in own listing
    const listingCheck = await pool.query(
      "SELECT seller_id FROM listings WHERE id = $1",
      [listing_id]
    );

    if (listingCheck.rows.length === 0) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listingCheck.rows[0].seller_id === buyer_id) {
      return res.status(403).json({
        message: "You cannot show interest in your own listing",
      });
    }

    const interest = await interestModel.createInterest(
      listing_id,
      buyer_id
    );

    res.status(201).json({
      message: "Interest registered successfully",
      interest,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "You have already shown interest in this listing",
      });
    }

    console.error("Create interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Seller views interests on their listings
const getMyListingInterests = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const interests =
      await interestModel.getInterestsBySeller(seller_id);

    res.status(200).json(interests);
  } catch (error) {
    console.error("Get interests error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createInterest,
  getMyListingInterests,
};
