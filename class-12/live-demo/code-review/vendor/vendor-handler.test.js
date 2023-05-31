'use strict';

let eventEmitter = require('../eventPool');

const { orderHandler, thankDriver } = require('./handler');

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

describe('Vendor handlers', () => {

  test('Should log correct emit and console log for orderHandler', () => {
    let payload = {
      orderId: 12345,
    };

    orderHandler(payload);

    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: ORDER ready for pickup:', payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Should log correct emit and console log for thankDriver', () => {
    let payload = {
      customer: 'Test Test',
    };

    thankDriver(payload);

    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Thank you for your order', payload.customer);
  });

});
