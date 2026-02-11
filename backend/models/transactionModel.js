const pool = require("../config/db");

// Create transaction when bid is accepted
const createTransaction = async (bid_id, buyer_id, seller_id, amount) => {
  const query = `
    INSERT INTO transactions (bid_id, buyer_id, seller_id, amount)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [
    bid_id,
    buyer_id,
    seller_id,
    amount,
  ]);
  return result.rows[0];
};

// Get transactions for logged-in user
const getMyTransactions = async (user_id) => {
  const query = `
    SELECT *
    FROM transactions
    WHERE buyer_id = $1 OR seller_id = $1
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};

// Mark transaction as paid 
const markAsPaid = async (transaction_id, buyer_id) => {
  const query = `
    UPDATE transactions
    SET status = 'paid'
    WHERE id = $1 AND buyer_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [
    transaction_id,
    buyer_id,
  ]);
  return result.rows[0];
};
const getTransactionById = async (id, user_id) => {
  const query = `
    SELECT *
    FROM transactions
    WHERE id = $1
      AND (buyer_id = $2 OR seller_id = $2)
  `;
  const result = await pool.query(query, [id, user_id]);
  return result.rows[0];
};


module.exports = {
  createTransaction,
  getMyTransactions,
  markAsPaid,
  getTransactionById,
};
