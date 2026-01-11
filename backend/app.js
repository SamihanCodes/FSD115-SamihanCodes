require("dotenv").config();


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const interestRoutes = require("./routes/interestRoutes");
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require("./routes/listingRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/interests", interestRoutes);

app.use('/api/auth', authRoutes);
app.use("/api/listings", listingRoutes);
app.get('/', (req, res) => {
  res.send('LiveStockHub API is running');
});

module.exports = app;
