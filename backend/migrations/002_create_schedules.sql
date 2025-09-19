CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_place VARCHAR(255) NOT NULL,
  rashi VARCHAR(50),
  service VARCHAR(100),
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_schedules_status ON schedules(status);
CREATE INDEX idx_schedules_email ON schedules(email);