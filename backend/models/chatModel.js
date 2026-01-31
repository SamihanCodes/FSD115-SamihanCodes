const pool = require("../config/db");

// Create or get conversation
const getOrCreateConversation = async (buyer_id, seller_id, listing_id) => {
  const existing = await pool.query(
    `
    SELECT * FROM conversations
    WHERE buyer_id = $1 AND seller_id = $2 AND listing_id = $3
    `,
    [buyer_id, seller_id, listing_id]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  const result = await pool.query(
    `
    INSERT INTO conversations (buyer_id, seller_id, listing_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [buyer_id, seller_id, listing_id]
  );

  return result.rows[0];
};

// Send message
const sendMessage = async (conversation_id, sender_id, message) => {
  const result = await pool.query(
    `
    INSERT INTO chat_messages (conversation_id, sender_id, message)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [conversation_id, sender_id, message]
  );

  return result.rows[0];
};

// Get messages
const getMessages = async (conversation_id) => {
  const result = await pool.query(
    `
    SELECT 
      m.*,
      u.email AS sender_email
    FROM chat_messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.conversation_id = $1
    ORDER BY m.created_at ASC;
    `,
    [conversation_id]
  );

  return result.rows;
};

// Buyer: all conversations
const getBuyerConversations = async (buyer_id) => {
  const result = await pool.query(
    `
    SELECT c.*, u.email AS seller_email, l.animal_type
    FROM conversations c
    JOIN users u ON c.seller_id = u.id
    JOIN listings l ON c.listing_id = l.id
    WHERE c.buyer_id = $1
    ORDER BY c.created_at DESC;
    `,
    [buyer_id]
  );

  return result.rows;
};

// Seller: all conversations
const getSellerConversations = async (seller_id) => {
  const result = await pool.query(
    `
    SELECT c.*, u.email AS buyer_email, l.animal_type
    FROM conversations c
    JOIN users u ON c.buyer_id = u.id
    JOIN listings l ON c.listing_id = l.id
    WHERE c.seller_id = $1
    ORDER BY c.created_at DESC;
    `,
    [seller_id]
  );

  return result.rows;
};

module.exports = {
  getOrCreateConversation,
  sendMessage,
  getMessages,
  getBuyerConversations,
  getSellerConversations,
};
