const { pool } = require('../config/database');
const { getIO } = require('../config/socket');
const { validationResult } = require('express-validator');
const { Parser } = require('json2csv');

const createSchedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      full_name, email, phone, dob, birth_time, birth_place,
      rashi, service, preferred_date, preferred_time, timezone, message
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO schedules (full_name, email, phone, dob, birth_time, birth_place, 
       rashi, service, preferred_date, preferred_time, timezone, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [full_name, email, phone, dob, birth_time, birth_place,
       rashi, service, preferred_date, preferred_time, timezone, message, 'pending']
    );
    
    const schedule = result.rows[0];
    
    // Emit socket event for real-time update
    getIO().to('admin-room').emit('new-schedule', schedule);
    
    res.status(201).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSchedules = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', sortBy = 'created_at', order = 'DESC' } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM schedules WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      query += ` AND (full_name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR phone ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }
    
    // Get total count
    const countResult = await pool.query(query.replace('SELECT *', 'SELECT COUNT(*)'), params);
    const totalItems = parseInt(countResult.rows[0].count);
    
    // Add sorting and pagination
    query += ` ORDER BY ${sortBy} ${order}`;
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    params.push(limit);
    paramCount++;
    query += ` OFFSET $${paramCount}`;
    params.push(offset);
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems,
        totalPages: Math.ceil(totalItems / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE schedules SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    
    // Emit socket event
    getIO().to('admin-room').emit('schedule-updated', result.rows[0]);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM schedules WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    
    // Emit socket event
    getIO().to('admin-room').emit('schedule-deleted', id);
    
    res.json({
      success: true,
      message: 'Schedule deleted'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const exportSchedules = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedules ORDER BY created_at DESC');
    
    const fields = ['id', 'full_name', 'email', 'phone', 'dob', 'birth_time', 'birth_place',
                    'rashi', 'service', 'preferred_date', 'preferred_time', 'timezone',
                    'message', 'status', 'created_at'];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(result.rows);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('schedules.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createSchedule, getSchedules, updateSchedule, deleteSchedule, exportSchedules };