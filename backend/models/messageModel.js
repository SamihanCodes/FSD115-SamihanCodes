const pool = require("../config/db");

// ✅ Create a new message
const createMessage = async (
  listing_id,
  sender_id,
  receiver_id,
  message
) => {
  const query = `
    INSERT INTO messages (listing_id, sender_id, receiver_id, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    listing_id,
    sender_id,
    receiver_id,
    message,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// ✅ Get chat messages for a listing (buyer ↔ seller)
const getMessagesByListing = async (listing_id, user_id) => {
  const query = `
    SELECT 
      m.*,
      u.name AS sender_name,
      u.email AS sender_email
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.listing_id = $1
      AND (m.sender_id = $2 OR m.receiver_id = $2)
    ORDER BY m.created_at ASC;
  `;

  const result = await pool.query(query, [
    listing_id,
    user_id,
  ]);

  return result.rows;
};

module.exports = {
  createMessage,
  getMessagesByListing,
};
