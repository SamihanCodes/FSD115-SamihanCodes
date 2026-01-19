const express = require("express");
const router = express.Router();

const {
  getMyTransactions,
  payTransaction,
} = require("../controllers/transactionController");

const authenticate = require("../middleware/authMiddleware");

router.get(
  "/my",
  authenticate,
  getMyTransactions
);

router.patch(
  "/:id/pay",
  authenticate,
  payTransaction
);

module.exports = router;
