require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const interestRoutes = require("./routes/interestRoutes");
const bidRoutes = require("./routes/bidRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.send("LiveStockHub API is running");
});

module.exports = app;
