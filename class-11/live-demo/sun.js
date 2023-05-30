'use strict';

let eventEmitter = require('./eventEmitter');

// this is what starts the event sequence
setInterval(() => {
  console.log('-------------------new interval begins------------------');
  const brightness = Math.floor(Math.random() * 100);

  console.log(`the sun shines with a brightness of ${brightness}`);

  // note that payload IS { brightness }
  eventEmitter.emit('SUNLIGHT', { brightness });
}, 5000);
