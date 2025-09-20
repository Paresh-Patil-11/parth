const express = require('express');
const router = express.Router();
const { 
  createSchedule, 
  getSchedules, 
  getScheduleById,
  updateSchedule, 
  deleteSchedule, 
  exportSchedules,
  getScheduleStats
} = require('../controllers/scheduleController');
const { 
  validateSchedule, 
  validateScheduleUpdate, 
  validateId, 
  validatePagination 
} = require('../utils/validators');
const { adminAuth, optionalAuth } = require('../middleware/auth');

// Public routes
router.post('/', validateSchedule, createSchedule);

// Admin routes
router.get('/', adminAuth, validatePagination, getSchedules);
router.get('/stats', adminAuth, getScheduleStats);
router.get('/export', adminAuth, exportSchedules);
router.get('/:id', adminAuth, validateId, getScheduleById);
router.patch('/:id', adminAuth, validateId, validateScheduleUpdate, updateSchedule);
router.delete('/:id', adminAuth, validateId, deleteSchedule);

module.exports = router;