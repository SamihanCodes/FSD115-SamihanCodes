const express = require("express");
const router = express.Router();

const {
  getMyTransactions,
  payTransaction,
  getTransaction,
} = require("../controllers/transactionController");

const authenticate = require("../middleware/authMiddleware");

// View all my transactions
router.get(
  "/my",
  authenticate,
  getMyTransactions
);

// Pay transaction (buyer only)
router.patch(
  "/:id/pay",
  authenticate,
  payTransaction
);

//  invoice
router.get(
  "/:id",
  authenticate,
  getTransaction
);

module.exports = router;
