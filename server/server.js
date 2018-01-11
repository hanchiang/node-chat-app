const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');
  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: ' Hey, how are you?',
    createdAt: 100
  });

  socket.on('createMessage', (message) => {
    console.log('Create message:', message);
  });

  socket.on('disconnect', () => console.log('Client disconnected!'));
});

server.listen(port, () => console.log('Server is running on port ' + port));
