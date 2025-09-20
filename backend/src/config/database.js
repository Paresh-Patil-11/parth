const { Pool } = require('pg');

// Database configuration
const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/astrology_db',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create connection pool
const pool = new Pool(dbConfig);

// Pool error handling
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err);
  process.exit(-1);
});

// Database connection function
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    
    // Test the connection
    const result = await client.query('SELECT NOW()');
    console.log('🕒 Database time:', result.rows[0].now);
    
    client.release();
    
    // Create tables if they don't exist
    await createTables();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // If database doesn't exist, provide helpful message
    if (error.code === '3D000') {
      console.log('📝 Please create the database first:');
      console.log('   createdb astrology_db');
    }
    
    process.exit(1);
  }
};

// Create tables function
const createTables = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create schedules table
    await client.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        dob DATE NOT NULL,
        birth_time TIME NOT NULL,
        birth_place VARCHAR(255) NOT NULL,
        rashi VARCHAR(50),
        service VARCHAR(100) NOT NULL,
        preferred_date DATE NOT NULL,
        preferred_time TIME NOT NULL,
        timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create rashis table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rashis (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        element VARCHAR(20) NOT NULL CHECK (element IN ('Fire', 'Earth', 'Air', 'Water')),
        ruling_planet VARCHAR(50) NOT NULL,
        date_range VARCHAR(100) NOT NULL,
        image_url VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        photo_url VARCHAR(500),
        text TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create indexes for better performance
    await client.query('CREATE INDEX IF NOT EXISTS idx_schedules_status ON schedules(status)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_schedules_email ON schedules(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_schedules_created_at ON schedules(created_at)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_schedules_preferred_date ON schedules(preferred_date)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_rashis_name ON rashis(name)');
    
    // Create trigger for updated_at timestamps
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql'
    `);
    
    // Apply triggers to all tables
    const tables = ['users', 'schedules', 'rashis', 'reviews'];
    for (const table of tables) {
      await client.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column()
      `);
    }
    
    await client.query('COMMIT');
    console.log('✅ Database tables created/verified successfully');
    
    // Insert sample data if tables are empty
    await insertSampleData(client);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Insert sample data function
const insertSampleData = async (client = null) => {
  const dbClient = client || await pool.connect();
  
  try {
    // Check if rashis exist
    const rashiCount = await dbClient.query('SELECT COUNT(*) FROM rashis');
    if (parseInt(rashiCount.rows[0].count) === 0) {
      await dbClient.query(`
        INSERT INTO rashis (name, element, ruling_planet, date_range, description) VALUES
        ('Mesha (Aries)', 'Fire', 'Mars', 'Mar 21 - Apr 19', 'The first sign of the zodiac, known for leadership and courage.'),
        ('Vrishabha (Taurus)', 'Earth', 'Venus', 'Apr 20 - May 20', 'Known for stability, patience, and love for luxury.'),
        ('Mithuna (Gemini)', 'Air', 'Mercury', 'May 21 - Jun 20', 'The communicator of the zodiac, versatile and intellectual.'),
        ('Karka (Cancer)', 'Water', 'Moon', 'Jun 21 - Jul 22', 'Nurturing and protective, deeply connected to home and family.'),
        ('Simha (Leo)', 'Fire', 'Sun', 'Jul 23 - Aug 22', 'Natural leaders with a flair for drama and creativity.'),
        ('Kanya (Virgo)', 'Earth', 'Mercury', 'Aug 23 - Sep 22', 'Analytical and practical, with attention to detail.'),
        ('Tula (Libra)', 'Air', 'Venus', 'Sep 23 - Oct 22', 'Seekers of balance, harmony, and justice.'),
        ('Vrischika (Scorpio)', 'Water', 'Mars', 'Oct 23 - Nov 21', 'Intense and passionate, with deep emotional depth.'),
        ('Dhanu (Sagittarius)', 'Fire', 'Jupiter', 'Nov 22 - Dec 21', 'Adventurous philosophers seeking truth and wisdom.'),
        ('Makara (Capricorn)', 'Earth', 'Saturn', 'Dec 22 - Jan 19', 'Ambitious and disciplined, climbing towards success.'),
        ('Kumbha (Aquarius)', 'Air', 'Saturn', 'Jan 20 - Feb 18', 'Progressive thinkers and humanitarian visionaries.'),
        ('Meena (Pisces)', 'Water', 'Jupiter', 'Feb 19 - Mar 20', 'Compassionate dreamers with deep intuition.')
      `);
      console.log('✅ Sample rashis data inserted');
    }
    
    // Check if reviews exist
    const reviewCount = await dbClient.query('SELECT COUNT(*) FROM reviews');
    if (parseInt(reviewCount.rows[0].count) === 0) {
      await dbClient.query(`
        INSERT INTO reviews (name, photo_url, text, rating) VALUES
        ('Priya Sharma', '/images/user1.jpg', 'The astrology consultation was life-changing! The predictions were incredibly accurate and the guidance helped me make important career decisions.', 5),
        ('Rajesh Kumar', '/images/user2.jpg', 'Very insightful reading. The astrologer explained everything in detail and provided practical remedies that actually worked.', 5),
        ('Anita Patel', '/images/user3.jpg', 'Professional and knowledgeable service. The birth chart analysis was comprehensive and helped me understand myself better.', 4),
        ('Suresh Gupta', '/images/user4.jpg', 'Amazing experience with marriage compatibility analysis. It helped us understand our relationship dynamics much better.', 5),
        ('Meera Joshi', '/images/user5.jpg', 'Great financial guidance through astrology. The timing suggestions for investments were spot on!', 4)
      `);
      console.log('✅ Sample reviews data inserted');
    }
    
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  } finally {
    if (!client) {
      dbClient.release();
    }
  }
};

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('🔄 Closing database connections...');
  try {
    await pool.end();
    console.log('✅ Database connections closed successfully');
  } catch (error) {
    console.error('❌ Error closing database connections:', error);
  }
};

// Handle process termination
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = { 
  pool, 
  connectDB, 
  createTables, 
  insertSampleData,
  gracefulShutdown
};