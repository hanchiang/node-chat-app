let socket = io();

function scrollToBottom() {
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');

  // console.log(clientHeight + scrollTop + 2 * newMessageHeight, scrollHeight);

  if (clientHeight + scrollTop + 2 * newMessageHeight >= scrollHeight) {
    // console.log('Reached bottom!');
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      return window.location.href = '/';
    }
    console.log('No error when joining room');
  });
});

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  let ol = jQuery('<ol></ol>');
  users.forEach(user => ol.append(jQuery('<li></li>').text(user)));
  jQuery('#users').html(ol);
});

// event emitters from DOM
jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();

  let messageTextbox = jQuery('[name=message]');
  if (messageTextbox.val() === '') {
    return;
  }

  socket.emit('createMessage', {
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