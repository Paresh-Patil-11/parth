const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Handle admin mock user
      if (decoded.id === 'admin-mock-id') {
        req.user = {
          id: 'admin-mock-id',
          name: 'Admin',
          email: 'admin@mysite.com',
          role: 'admin'
        };
        return next();
      }
      
      const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.id]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ 
          success: false,
          message: 'User not found - token invalid' 
        });
      }
      
      req.user = result.rows[0];
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized - token invalid' 
      });
    }
  } else {
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized - no token provided' 
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied - not authenticated' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Access denied - requires one of these roles: ${roles.join(', ')}` 
      });
    }
    
    next();
  };
};

const adminAuth = async (req, res, next) => {
  try {
    await protect(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false,
          message: 'Access denied - admin privileges required' 
        });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Authentication failed' 
    });
  }
};

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Handle admin mock user
      if (decoded.id === 'admin-mock-id') {
        req.user = {
          id: 'admin-mock-id',
          name: 'Admin',
          email: 'admin@mysite.com',
          role: 'admin'
        };
        return next();
      }
      
      const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.id]);
      
      if (result.rows.length > 0) {
        req.user = result.rows[0];
      }
    } catch (error) {
      // Continue without user if token is invalid
      console.log('Optional auth failed:', error.message);
    }
  }
  next();
};

module.exports = { protect, authorize, adminAuth, optionalAuth };