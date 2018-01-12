let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  console.log('Got new message:', message);
  let li = jQuery('<li></li>')
  li.text(message.from + ': ' + message.text);
  jQuery('#messages').append(li);
});

socket.on('newUserJoined', function(message) {
  console.log('From: ' + message.from + ', text: ' + message.text);
  let li = jQuery('<li></li>')
  li.text(message.from + ': ' + message.text);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {
    console.log('Ack!');
  });
});