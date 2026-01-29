const listingModel = require("../models/listingModel");

//  CREATE LISTING WITH IMAGES
const createListing = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { animal_type, breed, age, price, description } = req.body;

    if (!animal_type || !price) {
      return res.status(400).json({
        message: "Animal type and price are required",
      });
    }

    //  Cloudinary image URLs
    const images = Array.isArray(req.files)
      ? req.files.map((f) => f.path)
      : [];

    const listing = await listingModel.createListing(
      seller_id,
      animal_type,
      breed || null,
      age || null,
      price,
      description || null,
      images
    );

    res.status(201).json(listing);
  } catch (error) {
  console.error("CREATE LISTING FULL ERROR:", error);
  res.status(500).json({ error: error.message });
}

};

//  SEARCH LISTINGS 
const searchListings = async (req, res) => {
  try {
    const { animal_type, minPrice, maxPrice, breed } = req.query;

    const listings = await listingModel.searchListings({
      animal_type,
      minPrice,
      maxPrice,
      breed,
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Search listings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  GET ALL ACTIVE LISTINGS BUYERS
const getAllListings = async (req, res) => {
  try {
    const listings =
      await listingModel.getAllListingsWithHighestBid();
    res.json(listings);
  } catch (error) {
    console.error("Get all listings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  GET SELLER'S OWN LISTINGS
const getMyListings = async (req, res) => {
  try {
    const listings = await listingModel.getListingsBySeller(
      req.user.id
    );
    res.json(listings);
  } catch (error) {
    console.error("Get my listings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  UPDATE LISTING STATUS 
const updateListingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "sold"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status" });
    }

    const updated = await listingModel.updateListingStatus(
      req.params.id,
      req.user.id,
      status
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  UPDATE LISTING DETAILS
const updateListing = async (req, res) => {
  try {
    const updated = await listingModel.updateListing(
      req.params.id,
      req.user.id,
      req.body.animal_type,
      req.body.breed,
      req.body.age,
      req.body.price,
      req.body.description
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    console.error("Update listing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  DELETE LISTING PERMANEN
const deleteListing = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { id } = req.params;

    const deleted = await listingModel.deleteListing(
      id,
      seller_id
    );

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Listing not found or unauthorized" });
    }

    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete listing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createListing,
  getAllListings,
  getMyListings,
  updateListingStatus,
  updateListing,
  searchListings,
  deleteListing,
};
