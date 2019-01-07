let socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('disconnected from server.');
});

socket.on('newMessage', function (message) {
  console.log("newMessage", message);
});

socket.emit('createMessage', {
  from: 'John',
  text: 'Hey'
}, function (message) {
  console.log('Got it.', message);
});
