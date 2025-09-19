CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(500),
  text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5)
);