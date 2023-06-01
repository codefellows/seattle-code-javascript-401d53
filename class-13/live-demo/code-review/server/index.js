'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

// socket server singleton
const server = new Server();

// create a namespace
const caps = server.of('/caps');

// create / allow for connections to the caps namespace
caps.on('connection', (socket) => {
  // confirmation that a client is connected
  console.log('connected to the caps namespace', socket.id);

  // any event emitted is read by onAny  
  socket.onAny((event, payload) => {
    let timestamp = new Date();
    // will log everything as required by lab
    console.log('EVENT: ', { event, timestamp, payload });
  });

  // listens for and relays pickup event
  socket.on('pickup', (payload) => {
    // TODO: for lab-13, need to queue "pickup" messaging to the driver
    // sends to all clients except sender...  other possibilities
    socket.broadcast.emit('pickup', payload);
  });

  // is this necessary since onAny is logging?  maybe good to have?
  socket.on('in-transit', (payload) => {
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    // TODO: for lab-13, need to queue "delivered" messaging to the vendor
    socket.broadcast.emit('delivered', payload);
  });

});

console.log('listening on PORT:', PORT);
server.listen(PORT);
