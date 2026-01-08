CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  seller_id INT NOT NULL,
  animal_type VARCHAR(50) NOT NULL,
  breed VARCHAR(100),
  age INT,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_seller
    FOREIGN KEY (seller_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
