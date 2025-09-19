const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedules');
const rashiRoutes = require('./routes/rashis');
const reviewRoutes = require('./routes/reviews');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/rashis', rashiRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;