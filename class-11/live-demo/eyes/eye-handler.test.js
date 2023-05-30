'use strict';

// bring in the object to be mocked
const eventEmitter = require('../eventEmitter');
const handler = require('./handler');


// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock('../eventEmitter.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

// this will be updated toa  spy.  this is DANGEROUS, only gets you about 80% correct functionality.  very brittle.  spy is coming
console.log = jest.fn();

describe ('Eye Handler', () => {
  it ('log and emit brightness payload', () => {
    const payload = {brightness: 42};
    handler(payload);
    expect(console.log).toHaveBeenCalledWith(`Eyes: see brightness of ${payload.brightness}`);
    expect(eventEmitter.emit).toHaveBeenCalledWith('BRIGHTNESS', payload);

  });
});
