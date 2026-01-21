const bidModel = require("../models/bidModel");
const pool = require("../config/db");
const transactionModel = require("../models/transactionModel");
const notificationModel = require("../models/notificationModel");

// Buyer places a bid
const placeBid = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const { listing_id, amount } = req.body;

    if (!listing_id || !amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Valid listing ID and bid amount are required",
      });
    }

    const listingResult = await pool.query(
      "SELECT seller_id, price FROM listings WHERE id = $1",
      [listing_id]
    );

    if (listingResult.rows.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    
    const listing = listingResult.rows[0];

    if (listing.seller_id === buyer_id) {
      return res.status(403).json({
        message: "You cannot bid on your own listing",
      });
    }

    if (Number(amount) < Number(listing.price)) {
      return res.status(400).json({
        message: "Bid amount must be at least the listing price",
      });
    }

    const highestBidResult = await pool.query(
      "SELECT MAX(amount) AS max_bid FROM bids WHERE listing_id = $1",
      [listing_id]
    );

    const highestBid = highestBidResult.rows[0].max_bid;

    if (highestBid && Number(amount) <= Number(highestBid)) {
      return res.status(400).json({
        message: "Bid must be higher than the current highest bid",
      });
    }

    const bid = await bidModel.createBid(listing_id, buyer_id, amount);

    //  Notify seller
    await notificationModel.createNotification(
      listing.seller_id,
      "A new bid has been placed on your listing."
    );

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });
  } catch (error) {
    console.error("Place bid error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Seller views bids
const getMyBids = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const bids = await bidModel.getBidsBySeller(seller_id);
    res.status(200).json(bids);
  } catch (error) {
    console.error("Get bids error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Seller accepts bid
const acceptBid = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { bid_id } = req.params;

    const bid = await bidModel.acceptBid(bid_id, seller_id);

    if (!bid) {
      return res.status(404).json({
        message: "Bid not found or unauthorized",
      });
    }

    // Mark listing as sold
    await pool.query(
      "UPDATE listings SET status = 'sold' WHERE id = $1",
      [bid.listing_id]
    );

    // Create transaction
    const transaction = await transactionModel.createTransaction(
      bid.id,
      bid.buyer_id,
      seller_id,
      bid.amount
    );

    //  Notify buyer
    await notificationModel.createNotification(
      bid.buyer_id,
      "Your bid has been accepted by the seller."
    );

    //  Notify seller
    await notificationModel.createNotification(
      seller_id,
      "A transaction has been created for your listing."
    );

    res.json({
      message: "Bid accepted, listing marked as sold",
      bid,
      transaction,
    });
  } catch (error) {
    console.error("Accept bid error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  placeBid,
  getMyBids,
  acceptBid,
};
