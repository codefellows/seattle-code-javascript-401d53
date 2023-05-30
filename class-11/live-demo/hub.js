'use strict';

// this is a less tethered example.  
// think of the "hub" as the body listening to all of the body parts

let eventEmitter = require('./eventEmitter');

// require the sun code, the hub will allow it to run as part of this "pool"
require('./sun');

// handlers
require('./eyes');
const brainHandler = require('./brain');
const pupilHandler = require('./pupils');
const handHandler = require('./hand');

// listeners to all events
// this can be called in the eyes/index.js file
// multiple listeners performing diff operations:  NOI PROBLEM
eventEmitter.on('SUNLIGHT', (payload) => console.log('something happened with sunlight', payload));
eventEmitter.on('BRIGHTNESS', brainHandler);
eventEmitter.on('DILATION', pupilHandler);
eventEmitter.on('SHIELD_EYES', handHandler);
