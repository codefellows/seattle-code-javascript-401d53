'use strict';

let eventEmitter = require('../eventEmitter');

const brainHandler = (payload) => {
  setTimeout(() => {
    console.log('Brain: Brightness changed: ', payload);
    if(payload.brightness > 50){
      // payload in this case is the string 'close'
      eventEmitter.emit('DILATION', 'close');
      eventEmitter.emit('SHIELD_EYES', 'use hand to shield eyes');
    } else {
      eventEmitter.emit('DILATION', 'open');
    }
  }, 1000);
};

module.exports = brainHandler;
