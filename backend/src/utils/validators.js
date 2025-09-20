const { body, param, query } = require('express-validator');

// Auth validators
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Schedule validators
const validateSchedule = [
  body('full_name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Full name must be between 2 and 255 characters')
    .matches(/^[a-zA-Z\s\.]+$/)
    .withMessage('Full name can only contain letters, spaces, and dots'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('dob')
    .isDate()
    .withMessage('Please provide a valid date of birth')
    .custom(value => {
      const date = new Date(value);
      const now = new Date();
      const age = (now - date) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 1 || age > 150) {
        throw new Error('Age must be between 1 and 150 years');
      }
      return true;
    }),
  
  body('birth_time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid birth time in HH:MM format'),
  
  body('birth_place')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Birth place must be between 2 and 255 characters'),
  
  body('service')
    .isIn([
      'Health Consultation',
      'Career Guidance', 
      'Marriage Compatibility',
      'Financial Planning',
      'Compatibility Analysis',
      'Spiritual Guidance'
    ])
    .withMessage('Please select a valid service'),
  
  body('preferred_date')
    .isDate()
    .withMessage('Please provide a valid preferred date')
    .custom(value => {
      const date = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (date < now) {
        throw new Error('Preferred date cannot be in the past');
      }
      return true;
    }),
  
  body('preferred_time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid preferred time in HH:MM format'),
  
  body('timezone')
    .isIn([
      'Asia/Kolkata',
      'America/New_York',
      'America/Los_Angeles', 
      'Europe/London',
      'Asia/Dubai',
      'Australia/Sydney'
    ])
    .withMessage('Please select a valid timezone'),
  
  body('rashi')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Rashi must not exceed 50 characters'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters')
];

const validateScheduleUpdate = [
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Status must be one of: pending, confirmed, completed, cancelled'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes must not exceed 1000 characters')
];

// Review validators
const validateReview = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('text')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review text must be between 10 and 1000 characters'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('photo_url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Photo URL must be a valid URL')
];

// Rashi validators
const validateRashi = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Rashi name must be between 2 and 50 characters'),
  
  body('element')
    .trim()
    .isIn(['Fire', 'Earth', 'Air', 'Water'])
    .withMessage('Element must be one of: Fire, Earth, Air, Water'),
  
  body('ruling_planet')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Ruling planet must be between 2 and 50 characters'),
  
  body('date_range')
    .trim()
    .matches(/^[A-Z][a-z]+ \d{1,2} - [A-Z][a-z]+ \d{1,2}$/)
    .withMessage('Date range must be in format "Mon DD - Mon DD"'),
  
  body('image_url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
];

// Parameter validators
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
];

// Query validators
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query must not exceed 100 characters'),
  
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'email', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  
  query('order')
    .optional()
    .isIn(['ASC', 'DESC', 'asc', 'desc'])
    .withMessage('Order must be ASC or DESC')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateSchedule,
  validateScheduleUpdate,
  validateReview,
  validateRashi,
  validateId,
  validatePagination
};