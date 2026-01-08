const listingModel = require("../models/listingModel");

// Create a new livestock listing (Seller only)
const createListing = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { animal_type, breed, age, price, description } = req.body;

    // Basic validation
    if (!animal_type || !price) {
      return res.status(400).json({
        message: "Animal type and price are required",
      });
    }

    const listing = await listingModel.createListing(
      seller_id,
      animal_type,
      breed,
      age,
      price,
      description
    );

    res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.error("Create listing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all active listings (Public)
const getAllListings = async (req, res) => {
  try {
    const listings = await listingModel.getAllListings();
    res.status(200).json(listings);
  } catch (error) {
    console.error("Get listings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get listings by logged-in seller
const getMyListings = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const listings = await listingModel.getListingsBySeller(seller_id);
    res.status(200).json(listings);
  } catch (error) {
    console.error("Get my listings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Mark listing as sold (Seller only)
const updateListingStatus = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "sold"].includes(status)) {
      return res.status(400).json({
        message: "Status must be 'active' or 'sold'",
      });
    }

    const updatedListing =
      await listingModel.updateListingStatus(
        id,
        seller_id,
        status
      );

    if (!updatedListing) {
      return res.status(404).json({
        message: "Listing not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Listing status updated",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("Update listing status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createListing,
  getAllListings,
  getMyListings,
  updateListingStatus,
};

