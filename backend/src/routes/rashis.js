const express = require('express');
const router = express.Router();
const { 
  getRashis, 
  getRashiById, 
  getRashiByName,
  createRashi,
  updateRashi,
  deleteRashi
} = require('../controllers/rashiController');
const { validateRashi, validateId } = require('../utils/validators');
const { adminAuth, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', getRashis);
router.get('/:id', validateId, getRashiById);
router.get('/name/:name', getRashiByName);

// Admin routes
router.post('/', adminAuth, validateRashi, createRashi);
router.patch('/:id', adminAuth, validateId, updateRashi);
router.delete('/:id', adminAuth, validateId, deleteRashi);

module.exports = router;