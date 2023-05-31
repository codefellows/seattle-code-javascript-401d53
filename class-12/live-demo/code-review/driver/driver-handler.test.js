'use strict';

let eventEmitter = require('../eventPool');
const { pickupOccurred, packageDelivered } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

describe('Testing driver handlers', () => {

  test('Should log and emit in-transit after pick up occurs', () => {
    let payload = { orderId: 12345 };
    pickupOccurred(payload);

    expect(eventEmitter.emit).toHaveBeenCalledWith('in-transit', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: picked up', payload.orderId);
  });


  test('should emit delivered and log Driver delivery ', () => {
    let payload = { orderId: 12345};
    packageDelivered(payload);

    expect(eventEmitter.emit).toHaveBeenCalledWith('delivered', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: delivered', payload.orderId);
  });


});
