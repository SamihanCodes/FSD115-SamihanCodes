const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/interests", require("./routes/interestRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin/analytics", require("./routes/adminAnalyticsRoutes"));

app.get("/", (req, res) => {
  res.send("LiveStockHub API is running");
});

module.exports = app;
