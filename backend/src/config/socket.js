let io;

const setupSocket = (socketIO) => {
  io = socketIO;
  
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('join-admin', () => {
      socket.join('admin-room');
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { setupSocket, getIO };