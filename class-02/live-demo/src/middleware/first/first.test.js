'use strict';

const first = require('.');

describe('First middleware', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeAll(() => {
    // attach a spy to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    // console.log('console spy', consoleSpy);
  });

  afterAll(() => {
    // removes the spy
    consoleSpy.mockRestore();
  });

  test('logs as expected', () => {
    first(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith('first middleware hit!');
  });
})
