CREATE TABLE IF NOT EXISTS rashis (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  element VARCHAR(20) NOT NULL,
  ruling_planet VARCHAR(50) NOT NULL,
  date_range VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  description TEXT
);