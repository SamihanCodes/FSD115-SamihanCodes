const pool = require("../config/db");

// 🔹 Create new message
const createMessage = async (
  listing_id,
  sender_id,
  receiver_id,
  message
) => {
  const result = await pool.query(
    `
    INSERT INTO messages (listing_id, sender_id, receiver_id, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [listing_id, sender_id, receiver_id, message]
  );

  return result.rows[0];
};

// 🔹 Get messages for a listing
// - Seller: pass buyerId
// - Buyer: buyerId === userId
const getMessagesByListing = async (
  listingId,
  buyerId,
  userId,
  role
) => {
  let query = `
    SELECT 
      m.*,
      su.email AS sender_email,
      ru.email AS receiver_email
    FROM messages m
    JOIN users su ON m.sender_id = su.id
    JOIN users ru ON m.receiver_id = ru.id
    WHERE m.listing_id = $1
  `;

  const values = [listingId];
  let idx = 2;

  // Buyer can only see their own messages
  if (role === "buyer") {
    query += `
      AND (m.sender_id = $${idx} OR m.receiver_id = $${idx})
    `;
    values.push(userId);
  }

  // Seller selecting a buyer from sidebar
  if (role === "seller" && buyerId) {
    query += `
      AND (m.sender_id = $${idx} OR m.receiver_id = $${idx})
    `;
    values.push(buyerId);
  }

  query += " ORDER BY m.created_at ASC";

  const result = await pool.query(query, values);
  return result.rows;
};

// 🔹 Seller sidebar: buyers who messaged this listing
const getBuyersForListing = async (listing_id) => {
  const query = `
    SELECT DISTINCT
      u.id,
      u.email
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.listing_id = $1
      AND u.role = 'buyer'
    ORDER BY u.email;
  `;

  const result = await pool.query(query, [listing_id]);
  return result.rows;
};

module.exports = {
  createMessage,
  getMessagesByListing,
  getBuyersForListing,
};
