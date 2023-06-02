'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');


module.exports = socket;

// the only reason we do this is so that we can create a socket and immediately take it over with a mock!
