'use strict';

let socket = require('../socket-client-for-tests-only');

const { orderHandler, thankDriver } = require('./handler');

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

describe('Vendor handlers', () => {

  test('Should log correct emit and console log for orderHandler', () => {
    let order = {
      orderId: 12345,
    };
    let payload = {
      event: 'pickup',
      messageId: order.orderId,
      queueId: '1-206-flowers',
      order,
    };

    orderHandler(socket, order);

    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: ORDER ready for pickup:', payload);
    expect(socket.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Should log correct emit and console log for thankDriver', () => {
    let payload = {
      order: {
        customer: 'Test Test',
      },
    };

    thankDriver(payload);

    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Thank you for your order', payload.order.customer);
  });

});
