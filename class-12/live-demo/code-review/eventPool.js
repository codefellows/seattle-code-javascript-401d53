'use strict';

// Implement a Module for a Global Event Pool.
// Export a single EventEmitter from the Node JS module.
// Should be imported by any module that needs to notify or be alerted by other modules of an event.

const Event = require('events');

const eventEmitter = new Event();

module.exports = eventEmitter;
