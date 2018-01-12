let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  let li = jQuery('<li></li>');
  li.text(message.from + ': ' + message.text);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  a.attr('href', message.url);

  li.text(message.from + ': ');
  li.append(a);
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
  jQuery('[name=message]').val('');
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(event) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supporte by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);

    const coords = position.coords;
    socket.emit('createLocationMessage', {
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  }, function(err) {
    alert('Unable to fetch location');
    console.log(err);
  });
});