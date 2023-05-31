'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

// socket server singleton // sometimes called io
const server = new Server();

// listening for all events at http://localhost:3001
server.listen(PORT);

// allows the capability for clients to connect to http://localhost:3001
server.on('connection', (socket) => {
  // proof we are connected to the server
  console.log('connected to the event server', socket.id);

  socket.on('MESSAGE', (payload) => {
    // we used logger for this in lab-11
    console.log('SERVER: Message event', payload);

    // 3 ways to emit more here:  https://socket.io/docs/v4/emit-cheatsheet/
    // socket.emit('MESSAGE', payload); // basic emit back to sender
    // server.emit('MESSAGE', payload); // send to all clients connected to the server
    socket.broadcast.emit('MESSAGE', payload);  // sends to all parties in the socket EXCEPT for the sender
  });
  socket.on('RECEIVED', (payload) => {
    console.log('SERVER: Received event', payload);
    // note that NO ONE is listening for this!
    socket.broadcast.emit('RECEIVED', payload);
  });
});






// create a namespace example
// listening for all events at http://localhost:3001/brightness
const brightness = server.of('/brightness');
brightness.on('connection', (socket) => {
  console.log('socket connected to brightness namespace!', socket.id);

  // how to join a room 
  socket.on('JOIN', (room) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room name in this example--', room);
    socket.join(room);
    console.log(`you've joined the ${room} room`);
    console.log('these are All the current rooms', socket.adapter.rooms);
    // how to emit to a room:  maybe useful later
    // socket.to(room).emit('some-event', some-payload);

  });
});
