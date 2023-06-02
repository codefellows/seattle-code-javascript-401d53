'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const Queue = require('./lib/queue');
const capsQueue = new Queue();

// socket server singleton
const server = new Server();

// create a namespace
const caps = server.of('/caps');

// create / allow for connections to the caps namespace
caps.on('connection', (socket) => {
  // confirmation that a client is connected
  console.log('connected to the caps namespace', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined the ${room} room`);
  });

  // any event emitted is read by onAny  
  socket.onAny((event, payload) => {
    let timestamp = new Date();
    // will log everything as required by lab
    console.log('EVENT: ', { event, timestamp, payload });
  });

  // listens for and relays pickup event
  socket.on('pickup', (payload) => {
    // DONE: for lab-13, need to queue "pickup" messaging to the driver
    let driverQueue = capsQueue.read('driver');
    if(!driverQueue){
      let driverKey = capsQueue.store('driver', new Queue());
      driverQueue = capsQueue.read(driverKey);
    }
    driverQueue.store(payload.messageId, payload);
    // sends to all clients except sender...  other possibilities
    socket.broadcast.emit('pickup', payload);
  });

  // is this necessary since onAny is logging?  maybe good to have?
  socket.on('in-transit', (payload) => {
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    // TODO: for lab-13, need to queue "delivered" messaging to the vendor
    let vendorQueue = capsQueue.read(payload.queueId);
    if(!vendorQueue){
      let vendorKey = capsQueue.store(payload.queueId, new Queue());
      vendorQueue = capsQueue.read(vendorKey);
    }
    vendorQueue.store(payload.messageId, payload);

    socket.to(payload.queueId).emit('delivered', payload);
  });

  socket.on('getAll', (payload) => {
    console.log('attempting to get all');
    let currentQueue = capsQueue.read(payload.queueId);
    // console.log(payload.queueId, capsQueue );

    if(currentQueue && currentQueue.data){
      const ids = Object.keys(currentQueue.data);
      // console.log(ids);
      ids.forEach(messageId => {
        let savedPayload = currentQueue.read(messageId);
        socket.emit(savedPayload.event, savedPayload);
      });
    }
  });

  socket.on('received', (payload) => {
    let currentQueue = capsQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('we have payloads, but no queue');
    }
    currentQueue.remove(payload.messageId);
  });

});

console.log('listening on PORT:', PORT);
server.listen(PORT);
