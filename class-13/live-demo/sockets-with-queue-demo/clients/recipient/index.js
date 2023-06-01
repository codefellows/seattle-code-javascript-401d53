'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

socket.emit('GET-MESSAGES', {queueId: 'messages'});

socket.on('MESSAGE', (payload) => {
  setTimeout(() => {
    console.log('Message received: ', payload);
    socket.emit('RECEIVED', payload);
  }, 2000);
});
