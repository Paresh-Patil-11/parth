// controllers/rashiController.js
const { pool } = require('../config/database');

const getRashis = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rashis ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRashis };