let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  let li = jQuery('<li></li>');
  li.text(message.from + ' ' + formattedTime + ' : ' + message.text);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  a.attr('href', message.url);

  li.text(message.from + ' ' + formattedTime + ' : ');
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// event emitters
jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();

  let messageTextbox = jQuery('[name=message]');
  if (messageTextbox.val() === '') {
    return;
  }

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(event) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supporte by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  setTimeout(function() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      locationButton.removeAttr('disabled').text('Send location');

      const coords = position.coords;
      socket.emit('createLocationMessage', {
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    }, function (err) {
      alert('Unable to fetch location');
      console.log(err);
      locationButton.removeAttr('disabled').text('Send location');
    });
  }, 500);
  
});