'use strict';

let eventEmitter = require('../eventEmitter');


// extracting the handler makes it testable!
module.exports = (payload) => {
  console.log(`Eyes: see brightness of ${payload.brightness}`);
  eventEmitter.emit('BRIGHTNESS', payload);

};
