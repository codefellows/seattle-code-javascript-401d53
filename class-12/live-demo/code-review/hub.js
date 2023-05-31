'use strict';

const eventPool = require('./eventPool');

// making system aware of vendor and driver
require('./vendor/index');
require('./driver/index');

// listeners: listen to all events and log expected content
eventPool.on('pickup', (payload) => logger('pickup', payload));
eventPool.on('in-transit', (payload) => logger('in-transit', payload));
eventPool.on('delivered', (payload) => logger('delivered', payload));

// logs the event, a timestamp and the payload
function logger(event, payload){
  const timestamp = new Date();
  console.log('EVENT: ', { event, timestamp, payload });
}
