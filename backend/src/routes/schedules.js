// routes/schedules.js
const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  createSchedule,
  getSchedules,
  updateScheduleStatus,
  deleteSchedule,
  exportSchedules
} = require('../controllers/scheduleController');

// Public route
router.post('/', createSchedule);

// Admin routes
router.get('/', adminAuth, getSchedules);
router.put('/:id/status', adminAuth, updateScheduleStatus);
router.delete('/:id', adminAuth, deleteSchedule);
router.get('/export', adminAuth, exportSchedules);

module.exports = router;