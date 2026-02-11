const transactionModel = require("../models/transactionModel");

// View transactions 
const getMyTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;
    const transactions =
      await transactionModel.getMyTransactions(user_id);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Buyer marks transaction as paid
const payTransaction = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const { id } = req.params;

    const transaction =
      await transactionModel.markAsPaid(id, buyer_id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found or unauthorized",
      });
    }

    res.json({
      message: "Payment successful (simulated)",
      transaction,
    });
  } catch (error) {
    console.error("Pay transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// invoice
const getTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const transaction =
      await transactionModel.getTransactionById(id, user_id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    console.error("Get transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyTransactions,
  payTransaction,
  getTransaction,
};
