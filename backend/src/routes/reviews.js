const express = require('express');
const router = express.Router();
const { 
  getReviews, 
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewStats
} = require('../controllers/reviewController');
const { validateReview, validateId } = require('../utils/validators');
const { adminAuth, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', getReviews);
router.get('/stats', getReviewStats);
router.get('/:id', validateId, getReviewById);

// Admin routes
router.post('/', adminAuth, validateReview, createReview);
router.patch('/:id', adminAuth, validateId, updateReview);
router.delete('/:id', adminAuth, validateId, deleteReview);

module.exports = router;