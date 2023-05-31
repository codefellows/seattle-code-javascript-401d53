'use strict';

const eventEmitter = require('../eventPool');
const { handlePickupAndDelivery } = require('./handler');

eventEmitter.on('pickup', handlePickupAndDelivery); 
