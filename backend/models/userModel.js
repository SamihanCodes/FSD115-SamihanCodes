const pool = require("../config/db");
const createUser = async (name, email, hashedPassword, role) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
  `;
  const values = [name, email, hashedPassword, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};
const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
const updateUserProfile = async (userId, name, email) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3
    RETURNING id, name, email, role
  `;
  const values = [name, email, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};
const updateUserPassword = async (userId, hashedPassword) => {
  const query = `
    UPDATE users
    SET password = $1
    WHERE id = $2
  `;
  await pool.query(query, [hashedPassword, userId]);
  return true;
};
module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,     
  updateUserPassword,     
};
