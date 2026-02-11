const pool = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, role, is_blocked, created_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL LISTINGS (Admin)
 */
const getAllListings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.*, u.email AS seller_email
      FROM listings l
      JOIN users u ON l.seller_id = u.id
      ORDER BY l.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Get all listings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, 
             buyer.email AS buyer_email,
             seller.email AS seller_email
      FROM transactions t
      JOIN users buyer ON t.buyer_id = buyer.id
      JOIN users seller ON t.seller_id = seller.id
      ORDER BY t.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Get all transactions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getSummary = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const listings = await pool.query("SELECT COUNT(*) FROM listings");
    const transactions = await pool.query("SELECT COUNT(*) FROM transactions");
    const revenue = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM transactions
      WHERE status = 'paid'
    `);

    res.json({
      totalUsers: Number(users.rows[0].count),
      totalListings: Number(listings.rows[0].count),
      totalTransactions: Number(transactions.rows[0].count),
      totalRevenue: Number(revenue.rows[0].total),
    });
  } catch (error) {
    console.error("Admin summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await pool.query(
      `UPDATE users SET is_blocked = true WHERE id = $1 RETURNING id, name, email, role, is_blocked`,
      [userId]
    );

    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await pool.query(
      `UPDATE users SET is_blocked = false WHERE id = $1 RETURNING id, name, email, role, is_blocked`,
      [userId]
    );

    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getAllListings,
  getAllTransactions,
  getSummary,
  blockUser,
  unblockUser,
};
