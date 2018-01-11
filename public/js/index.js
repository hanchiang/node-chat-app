let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  console.log('Got new message:', message);
});

socket.on('newUserJoined', function(message) {
  console.log('From: ' + message.from + ', text: ' + message.text);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
