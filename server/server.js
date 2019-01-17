const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("A new user just connected");

  socket.emit('newMessage', generateMessage('Admin', 'Welocome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', "New User Joined!"));

  socket.on('createMessage', (message, callback) => {
    console.log("createMessage", message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is the server:');
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
