'use strict';

const { io } = require('socket.io-client');

// we establish ourself as a socket client, and connect
const socket = io('http://localhost:3001/caps');

const { orderHandler, thankDriver } = require('./handler');

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {

  orderHandler(socket);
}, 5000);

socket.on('delivered', (payload) => {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
});
