const { pool } = require('../config/database');
const { validationResult } = require('express-validator');
const { Parser } = require('json2csv');

const createSchedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: errors.array() 
      });
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
       rashi || null, service, preferred_date, preferred_time, timezone, message || null, 'pending']
    );
    
    const schedule = result.rows[0];
    
    // Emit socket event for real-time update to admin
    if (req.io) {
      req.io.to('admin-room').emit('new-schedule', schedule);
    }
    
    res.status(201).json({
      success: true,
      message: 'Schedule request submitted successfully',
      data: schedule
    });
  } catch (error) {
    console.error('Create schedule error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to submit schedule request' 
    });
  }
};

const getSchedules = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = '', 
      sortBy = 'created_at', 
      order = 'DESC' 
    } = req.query;
    
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
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
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await pool.query(countQuery, params);
    const totalItems = parseInt(countResult.rows[0].count);
    
    // Add sorting and pagination
    const validSortColumns = ['id', 'full_name', 'email', 'service', 'preferred_date', 'status', 'created_at'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    
    query += ` ORDER BY ${sortColumn} ${sortOrder}`;
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    params.push(parseInt(limit));
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
        totalPages: Math.ceil(totalItems / parseInt(limit)),
        hasNextPage: parseInt(page) < Math.ceil(totalItems / parseInt(limit)),
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get schedules error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch schedules' 
    });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM schedules WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Schedule not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get schedule by ID error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch schedule' 
    });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled' 
      });
    }
    
    let query = 'UPDATE schedules SET';
    const params = [];
    const updates = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      updates.push(`status = $${paramCount}`);
      params.push(status);
    }
    
    if (notes !== undefined) {
      paramCount++;
      updates.push(`notes = $${paramCount}`);
      params.push(notes);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'No valid fields to update' 
      });
    }
    
    paramCount++;
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    query += ` ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    params.push(id);
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Schedule not found' 
      });
    }
    
    // Emit socket event
    if (req.io) {
      req.io.to('admin-room').emit('schedule-updated', result.rows[0]);
    }
    
    res.json({
      success: true,
      message: 'Schedule updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update schedule' 
    });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM schedules WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Schedule not found' 
      });
    }
    
    // Emit socket event
    if (req.io) {
      req.io.to('admin-room').emit('schedule-deleted', id);
    }
    
    res.json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete schedule' 
    });
  }
};

const exportSchedules = async (req, res) => {
  try {
    const { status, start_date, end_date } = req.query;
    
    let query = 'SELECT * FROM schedules WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }
    
    if (start_date) {
      paramCount++;
      query += ` AND created_at >= $${paramCount}`;
      params.push(start_date);
    }
    
    if (end_date) {
      paramCount++;
      query += ` AND created_at <= $${paramCount}`;
      params.push(end_date);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No schedules found for export' 
      });
    }
    
    const fields = [
      { label: 'ID', value: 'id' },
      { label: 'Full Name', value: 'full_name' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Date of Birth', value: 'dob' },
      { label: 'Birth Time', value: 'birth_time' },
      { label: 'Birth Place', value: 'birth_place' },
      { label: 'Rashi', value: 'rashi' },
      { label: 'Service', value: 'service' },
      { label: 'Preferred Date', value: 'preferred_date' },
      { label: 'Preferred Time', value: 'preferred_time' },
      { label: 'Timezone', value: 'timezone' },
      { label: 'Message', value: 'message' },
      { label: 'Status', value: 'status' },
      { label: 'Created At', value: 'created_at' }
    ];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(result.rows);
    
    const filename = `schedules_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.header('Content-Type', 'text/csv');
    res.attachment(filename);
    res.send(csv);
  } catch (error) {
    console.error('Export schedules error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to export schedules' 
    });
  }
};

const getScheduleStats = async (req, res) => {
  try {
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_schedules,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_count,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as this_week_count,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as this_month_count
      FROM schedules
    `);
    
    const serviceStats = await pool.query(`
      SELECT service, COUNT(*) as count 
      FROM schedules 
      WHERE service IS NOT NULL 
      GROUP BY service 
      ORDER BY count DESC
    `);
    
    res.json({
      success: true,
      data: {
        overview: statsResult.rows[0],
        serviceBreakdown: serviceStats.rows
      }
    });
  } catch (error) {
    console.error('Get schedule stats error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch schedule statistics' 
    });
  }
};

module.exports = { 
  createSchedule, 
  getSchedules, 
  getScheduleById,
  updateSchedule, 
  deleteSchedule, 
  exportSchedules,
  getScheduleStats
};