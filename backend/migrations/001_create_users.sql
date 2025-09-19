CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin', 'admin@astrology.com', '$2a$10$YourHashedPasswordHere', 'admin')
ON CONFLICT (email) DO NOTHING;