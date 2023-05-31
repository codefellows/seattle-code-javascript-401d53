'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');
const Chance = require('chance');
let chance = new Chance();

setInterval(() => {
  let text = `Hello ${chance.first()}`;
  console.log(`Messenger: message sent: ${text}`);
  socket.emit('MESSAGE', { text });
}, 5000);
