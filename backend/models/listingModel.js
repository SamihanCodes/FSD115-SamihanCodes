const pool = require("../config/db");

// Create new listing
const createListing = async (
  seller_id,
  animal_type,
  breed,
  age,
  price,
  description
) => {
  const query = `
    INSERT INTO listings 
    (seller_id, animal_type, breed, age, price, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    seller_id,
    animal_type,
    breed,
    age,
    price,
    description,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all listings
const getAllListings = async () => {
  const query = `
    SELECT listings.*, users.name AS seller_name
    FROM listings
    JOIN users ON listings.seller_id = users.id
    WHERE status = 'active'
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);
  return result.rows;
};

// Get listings by seller
const getListingsBySeller = async (seller_id) => {
  const query = `
    SELECT * FROM listings
    WHERE seller_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [seller_id]);
  return result.rows;
};
// Update listing status (seller only)
const updateListingStatus = async (listing_id, seller_id, status) => {
  const query = `
    UPDATE listings
    SET status = $1
    WHERE id = $2 AND seller_id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [
    status,
    listing_id,
    seller_id,
  ]);

  return result.rows[0];
};


module.exports = {
  createListing,
  getAllListings,
  getListingsBySeller,
  updateListingStatus,
};

