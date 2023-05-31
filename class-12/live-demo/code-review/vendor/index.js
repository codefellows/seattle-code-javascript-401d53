'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const eventEmitter = require('../eventPool');

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {
  orderHandler();
}, 5000);

eventEmitter.on('delivered', deliveredMessage);
