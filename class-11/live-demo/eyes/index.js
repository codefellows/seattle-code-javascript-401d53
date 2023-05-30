'use strict';

let eventEmitter = require('../eventEmitter');

const handler = require('./handler');

const eyeHandler = (payload) => {
  setTimeout(() => {
    // do the thing
    handler(payload);
  }, 1000);
};

eventEmitter.on('SUNLIGHT', eyeHandler);

module.exports = eyeHandler;
