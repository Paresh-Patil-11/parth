const { pool } = require('../config/database');

const getRashis = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        element, 
        ruling_planet, 
        date_range, 
        image_url, 
        description,
        created_at
      FROM rashis 
      ORDER BY id ASC
    `);
    
    if (result.rows.length === 0) {
      // Return mock data if no rashis in database
      const mockRashis = [
        { id: 1, name: 'Mesha (Aries)', element: 'Fire', ruling_planet: 'Mars', date_range: 'Mar 21 - Apr 19' },
        { id: 2, name: 'Vrishabha (Taurus)', element: 'Earth', ruling_planet: 'Venus', date_range: 'Apr 20 - May 20' },
        { id: 3, name: 'Mithuna (Gemini)', element: 'Air', ruling_planet: 'Mercury', date_range: 'May 21 - Jun 20' },
        { id: 4, name: 'Karka (Cancer)', element: 'Water', ruling_planet: 'Moon', date_range: 'Jun 21 - Jul 22' },
        { id: 5, name: 'Simha (Leo)', element: 'Fire', ruling_planet: 'Sun', date_range: 'Jul 23 - Aug 22' },
        { id: 6, name: 'Kanya (Virgo)', element: 'Earth', ruling_planet: 'Mercury', date_range: 'Aug 23 - Sep 22' },
        { id: 7, name: 'Tula (Libra)', element: 'Air', ruling_planet: 'Venus', date_range: 'Sep 23 - Oct 22' },
        { id: 8, name: 'Vrischika (Scorpio)', element: 'Water', ruling_planet: 'Mars', date_range: 'Oct 23 - Nov 21' },
        { id: 9, name: 'Dhanu (Sagittarius)', element: 'Fire', ruling_planet: 'Jupiter', date_range: 'Nov 22 - Dec 21' },
        { id: 10, name: 'Makara (Capricorn)', element: 'Earth', ruling_planet: 'Saturn', date_range: 'Dec 22 - Jan 19' },
        { id: 11, name: 'Kumbha (Aquarius)', element: 'Air', ruling_planet: 'Saturn', date_range: 'Jan 20 - Feb 18' },
        { id: 12, name: 'Meena (Pisces)', element: 'Water', ruling_planet: 'Jupiter', date_range: 'Feb 19 - Mar 20' }
      ];
      
      return res.json({
        success: true,
        data: mockRashis,
        count: mockRashis.length
      });
    }
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get rashis error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch rashis' 
    });
  }
};

const getRashiById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        element, 
        ruling_planet, 
        date_range, 
        image_url, 
        description,
        created_at
      FROM rashis 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Rashi not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get rashi by ID error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch rashi' 
    });
  }
};

const getRashiByName = async (req, res) => {
  try {
    const { name } = req.params;
    
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        element, 
        ruling_planet, 
        date_range, 
        image_url, 
        description,
        created_at
      FROM rashis 
      WHERE name ILIKE $1
    `, [`%${name}%`]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Rashi not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get rashi by name error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch rashi' 
    });
  }
};

const createRashi = async (req, res) => {
  try {
    const { name, element, ruling_planet, date_range, image_url, description } = req.body;
    
    if (!name || !element || !ruling_planet || !date_range) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, element, ruling planet, and date range are required' 
      });
    }
    
    const result = await pool.query(`
      INSERT INTO rashis (name, element, ruling_planet, date_range, image_url, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, element, ruling_planet, date_range, image_url || null, description || null]);
    
    res.status(201).json({
      success: true,
      message: 'Rashi created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create rashi error:', error);
    if (error.code === '23505') {
      return res.status(409).json({ 
        success: false,
        message: 'Rashi with this name already exists' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Failed to create rashi' 
    });
  }
};

const updateRashi = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, element, ruling_planet, date_range, image_url, description } = req.body;
    
    const result = await pool.query(`
      UPDATE rashis 
      SET name = COALESCE($1, name),
          element = COALESCE($2, element),
          ruling_planet = COALESCE($3, ruling_planet),
          date_range = COALESCE($4, date_range),
          image_url = COALESCE($5, image_url),
          description = COALESCE($6, description),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `, [name, element, ruling_planet, date_range, image_url, description, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Rashi not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Rashi updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update rashi error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update rashi' 
    });
  }
};

const deleteRashi = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM rashis WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Rashi not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Rashi deleted successfully'
    });
  } catch (error) {
    console.error('Delete rashi error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete rashi' 
    });
  }
};

module.exports = { 
  getRashis, 
  getRashiById, 
  getRashiByName,
  createRashi,
  updateRashi,
  deleteRashi
};