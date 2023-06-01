'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const Queue = require('./lib/queue');
let messageQueue = new Queue();

// socket server singleton // sometimes called io
const server = new Server();

// listening for all events at http://localhost:3001
server.listen(PORT);

// allows the capability for clients to connect to http://localhost:3001
server.on('connection', (socket) => {
  // proof we are connected to the server
  console.log('connected to the event server', socket.id);
  socket.onAny((event, payload) => {
    console.log('SERVER: ', {event, payload});
  });

  socket.on('MESSAGE', (payload) => {
    // we used logger for this in lab-11
    // console.log('SERVER: Message event', payload);

    // DONE: step ONE.  store all messages in queue
    let currentQueue = messageQueue.read(payload.queueId);
    // first time we run our server, this queue won't exist.  we need validation
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue);
      currentQueue = messageQueue.read(queueKey);
    }
    // now that we KNOW we have a currentQueue, lets store the incoming message
    // because that unique messageId is a string, JavaScript will maintain order for us.
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('MESSAGE', payload);  // sends to all parties in the socket EXCEPT for the sender
  });
  socket.on('RECEIVED', (payload) => {
    // console.log('SERVER: Received event', payload);
    // DONE: Step TWO.  IF the message is received, remove it from the queue
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue) {
      throw new Error('we have messages but no queue!');
    }
    let message = currentQueue.remove(payload.messageId);
    // note that NO ONE is listening for this!
    socket.broadcast.emit('RECEIVED', message);
  });

  //TODO: Step THREE.  create an event called GET-MESSAGES, that the recipient can emit so that they can obtain any missed messages
  socket.on('GET-MESSAGES', (payload) => {
    console.log('attempting to get messages');
    let currentQueue = messageQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      // getting a list of all message
      Object.keys(currentQueue.data).forEach(messageId => {
        // sending saved messages that were missed by recipient
        // maybe sending to the correct room also works (if two vendors)
        socket.emit('MESSAGE', currentQueue.read(messageId));
      });
    }
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
