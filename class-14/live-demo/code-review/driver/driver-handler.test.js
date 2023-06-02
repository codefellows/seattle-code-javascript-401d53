'use strict';

let socket = require('../socket-client-for-tests-only');
const { pickupOccurred, packageDelivered } = require('./handler');

jest.mock('../socket-client-for-tests-only.js', () => {
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
    pickupOccurred(payload, socket);

    expect(socket.emit).toHaveBeenCalledWith('in-transit', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: picked up', payload.orderId);
  });


  test('should emit delivered and log Driver delivery ', () => {
    let payload = { orderId: 12345};
    packageDelivered(payload, socket);

    expect(socket.emit).toHaveBeenCalledWith('delivered', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: delivered', payload.orderId);
  });


});
