const pool = require("../config/db");

// CREATE MESSAGE
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

// GET ALL MESSAGES BETWEEN TWO USERS FOR A LISTING
const getMessagesBetweenUsers = async (
  listing_id,
  user1_id,
  user2_id
) => {
  const result = await pool.query(
    `
    SELECT 
      m.*,
      su.email AS sender_email,
      ru.email AS receiver_email
    FROM messages m
    JOIN users su ON m.sender_id = su.id
    JOIN users ru ON m.receiver_id = ru.id
    WHERE m.listing_id = $1
      AND (
        (m.sender_id = $2 AND m.receiver_id = $3)
        OR
        (m.sender_id = $3 AND m.receiver_id = $2)
      )
    ORDER BY m.created_at ASC;
    `,
    [listing_id, user1_id, user2_id]
  );

  return result.rows;
};

// BUYER DASHBOARD: ALL SELLER CHATS
const getSellersForBuyer = async (buyer_id) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      l.id AS listing_id,
      l.animal_type,
      l.price,
      u.id AS seller_id,
      u.email AS seller_email
    FROM messages m
    JOIN listings l ON m.listing_id = l.id
    JOIN users u ON u.id = l.seller_id
    WHERE m.sender_id = $1 OR m.receiver_id = $1
    ORDER BY l.created_at DESC;
    `,
    [buyer_id]
  );

  return result.rows;
};

// BUYER DASHBOARD: CHAT THREADS (navbar)
const getBuyerChats = async (buyer_id) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      l.id AS listing_id,
      l.animal_type,
      l.price,
      u.id AS seller_id,
      u.email AS seller_email
    FROM messages m
    JOIN listings l ON m.listing_id = l.id
    JOIN users u ON u.id = l.seller_id
    WHERE m.sender_id = $1 OR m.receiver_id = $1
    ORDER BY l.created_at DESC;
    `,
    [buyer_id]
  );

  return result.rows;
};

// SELLER DASHBOARD: BUYERS FOR A LISTING
const getBuyersForListing = async (listing_id) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      u.id,
      u.email
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.listing_id = $1
      AND u.role = 'buyer'
    ORDER BY u.email;
    `,
    [listing_id]
  );

  return result.rows;
};

// SELLER DASHBOARD: ALL BUYER CHATS (ALL LISTINGS)
const getSellerChats = async (seller_id) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      m.listing_id,
      l.animal_type,
      u.id AS buyer_id,
      u.email AS buyer_email
    FROM messages m
    JOIN listings l ON m.listing_id = l.id
    JOIN users u ON u.id = m.sender_id
    WHERE l.seller_id = $1
    ORDER BY l.created_at DESC;
    `,
    [seller_id]
  );

  return result.rows;
};

module.exports = {
  createMessage,
  getMessagesBetweenUsers,
  getSellersForBuyer,
  getBuyerChats,        // 👈 THIS WAS MISSING (critical)
  getBuyersForListing,
  getSellerChats,
};
