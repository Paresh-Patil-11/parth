const { pool } = require('../config/database');

const getReviews = async (req, res) => {
  try {
    const { limit = 10, offset = 0, rating } = req.query;
    
    let query = 'SELECT * FROM reviews WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (rating) {
      paramCount++;
      query += ` AND rating = $${paramCount}`;
      params.push(rating);
    }
    
    query += ' ORDER BY id DESC';
    
    if (limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(parseInt(limit));
    }
    
    if (offset) {
      paramCount++;
      query += ` OFFSET $${paramCount}`;
      params.push(parseInt(offset));
    }
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      // Return mock data if no reviews in database
      const mockReviews = [
        {
          id: 1,
          name: 'Samar Patel',
          photo_url: '/images/user1.jpg',
          text: 'The astrology consultation was incredibly accurate and insightful. The predictions about my career change came true within months. Highly recommended!',
          rating: 5
        },
        {
          id: 2,
          name: 'Riya Sharma',
          photo_url: '/images/user2.jpg',
          text: 'Amazing experience! The marriage compatibility report helped us understand each other better. The remedies suggested worked wonderfully for our relationship.',
          rating: 5
        },
        {
          id: 3,
          name: 'Arjun Reddy',
          photo_url: '/images/user3.jpg',
          text: 'Very professional service with detailed analysis. The health predictions were spot-on and helped me take preventive measures. Thank you for the guidance!',
          rating: 5
        },
        {
          id: 4,
          name: 'Meera Gupta',
          photo_url: '/images/user4.jpg',
          text: 'Great guidance for career decisions. The timing predictions for job changes were incredibly accurate. I got my dream job exactly when predicted!',
          rating: 4
        },
        {
          id: 5,
          name: 'Rohit Kumar',
          photo_url: '/images/user5.jpg',
          text: 'Truly helpful financial guidance. The investment timing suggestions helped me make profitable decisions. The remedies are simple yet effective.',
          rating: 5
        }
      ];
      
      return res.json({
        success: true,
        data: mockReviews,
        count: mockReviews.length
      });
    }
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch reviews' 
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Review not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get review by ID error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch review' 
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { name, photo_url, text, rating } = req.body;
    
    if (!name || !text || !rating) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, text, and rating are required' 
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false,
        message: 'Rating must be between 1 and 5' 
      });
    }
    
    const result = await pool.query(`
      INSERT INTO reviews (name, photo_url, text, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [name, photo_url || null, text, rating]);
    
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create review' 
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, photo_url, text, rating } = req.body;
    
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ 
        success: false,
        message: 'Rating must be between 1 and 5' 
      });
    }
    
    const result = await pool.query(`
      UPDATE reviews 
      SET name = COALESCE($1, name),
          photo_url = COALESCE($2, photo_url),
          text = COALESCE($3, text),
          rating = COALESCE($4, rating)
      WHERE id = $5
      RETURNING *
    `, [name, photo_url, text, rating, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Review not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Review updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update review' 
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Review not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete review' 
    });
  }
};

const getReviewStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_count,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star_count,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star_count,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star_count,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_count
      FROM reviews
    `);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch review statistics' 
    });
  }
};

module.exports = { 
  getReviews, 
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewStats
};