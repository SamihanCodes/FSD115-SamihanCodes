const pool = require("../config/db");

// CREATE LISTING 
const createListing = async (
  seller_id,
  animal_type,
  breed,
  age,
  price,
  description,
  images
) => {
  const result = await pool.query(
    `
    INSERT INTO listings 
    (seller_id, animal_type, breed, age, price, description, images)
    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
    RETURNING *;
    `,
    [
      seller_id,
      animal_type,
      breed,
      age,
      price,
      description,
      JSON.stringify(images || []), 
    ]
  );

  return result.rows[0];
};

// GET ALL ACTIVE LISTINGS (BUYER)
const getAllListingsWithHighestBid = async () => {
  const result = await pool.query(`
    SELECT 
      listings.*,
      users.name AS seller_name,
      COALESCE(MAX(bids.amount), 0) AS highest_bid
    FROM listings
    JOIN users ON listings.seller_id = users.id
    LEFT JOIN bids ON listings.id = bids.listing_id
    WHERE listings.status = 'active'
    GROUP BY listings.id, users.name
    ORDER BY listings.created_at DESC;
  `);

  return result.rows;
};

// GET SELLER LISTINGS
const getListingsBySeller = async (seller_id) => {
  const result = await pool.query(
    `SELECT * FROM listings WHERE seller_id = $1 ORDER BY created_at DESC`,
    [seller_id]
  );
  return result.rows;
};

// SEARCH LISTINGS
const searchListings = async ({ animal_type, minPrice, maxPrice, breed }) => {
  let query = `
    SELECT 
      listings.*,
      COALESCE(MAX(bids.amount), 0) AS highest_bid
    FROM listings
    LEFT JOIN bids ON listings.id = bids.listing_id
    WHERE listings.status = 'active'
  `;

  const values = [];
  let idx = 1;

  if (animal_type) {
    query += ` AND listings.animal_type ILIKE $${idx++}`;
    values.push(`%${animal_type}%`);
  }

  if (breed) {
    query += ` AND listings.breed ILIKE $${idx++}`;
    values.push(`%${breed}%`);
  }

  if (minPrice) {
    query += ` AND listings.price >= $${idx++}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND listings.price <= $${idx++}`;
    values.push(maxPrice);
  }

  query += `
    GROUP BY listings.id
    ORDER BY listings.created_at DESC;
  `;

  const result = await pool.query(query, values);
  return result.rows;
};

// UPDATE STATUS
const updateListingStatus = async (listing_id, seller_id, status) => {
  const result = await pool.query(
    `
    UPDATE listings
    SET status = $1
    WHERE id = $2 AND seller_id = $3
    RETURNING *;
    `,
    [status, listing_id, seller_id]
  );
  return result.rows[0];
};

// UPDATE LISTING
const updateListing = async (
  id,
  seller_id,
  animal_type,
  breed,
  age,
  price,
  description
) => {
  const result = await pool.query(
    `
    UPDATE listings
    SET animal_type=$1, breed=$2, age=$3, price=$4, description=$5
    WHERE id=$6 AND seller_id=$7
    RETURNING *;
    `,
    [animal_type, breed, age, price, description, id, seller_id]
  );

  return result.rows[0];
};

// DELETE LISTING
const deleteListing = async (listing_id, seller_id) => {
  const result = await pool.query(
    `DELETE FROM listings WHERE id=$1 AND seller_id=$2 RETURNING *`,
    [listing_id, seller_id]
  );
  return result.rows[0];
};

module.exports = {
  createListing,
  getAllListingsWithHighestBid,
  getListingsBySeller,
  searchListings,
  updateListingStatus,
  updateListing,
  deleteListing,
};
