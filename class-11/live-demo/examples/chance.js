'use strict';

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

const payload = {
  name: chance.name(),
  guid: chance.guid(),
  address: chance.address(),
};

console.log('payload:', payload);
