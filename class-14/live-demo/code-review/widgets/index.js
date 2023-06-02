'use strict';

const { io } = require('socket.io-client');

// we establish ourself as a socket client, and connect
const socket = io('http://localhost:3001/caps');
const { orderHandler, thankDriver } = require('./handler');
const store = 'acme-widgets';

socket.emit('join', store);
socket.emit('getAll', {queueId: store});

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {

  orderHandler(socket);
}, 7000);

socket.on('delivered', (payload) => {
  setTimeout(() => {
    socket.emit('received', payload);
    thankDriver(payload);
  }, 1000);
});
