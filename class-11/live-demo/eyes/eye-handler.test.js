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

let consoleSpy;
beforeEach(() => {
  // Attach to the console (take it over)
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterEach(() => {
  // Put the console back
  consoleSpy.mockRestore();
});

describe ('Eye Handler', () => {
  it ('log and emit brightness payload', () => {
    const payload = {brightness: 42};
    handler(payload);
    expect(consoleSpy).toHaveBeenCalledWith(`Eyes: see brightness of ${payload.brightness}`);
    expect(eventEmitter.emit).toHaveBeenCalledWith('BRIGHTNESS', payload);

  });
});
