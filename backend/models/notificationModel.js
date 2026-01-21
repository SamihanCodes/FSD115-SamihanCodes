const pool = require("../config/db");

const createNotification = async (user_id, message) => {
  const query = `
    INSERT INTO notifications (user_id, message)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [user_id, message]);
  return result.rows[0];
};

const getUserNotifications = async (user_id) => {
  const query = `
    SELECT * FROM notifications
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};

module.exports = {
  createNotification,
  getUserNotifications,
};
