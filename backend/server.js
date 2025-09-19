const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

dotenv.config();

const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const { setupSocket } = require('./src/config/socket');

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  }
});

// Setup socket
setupSocket(io);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});