// controllers/reviewController.js
const getReviews = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReviews };