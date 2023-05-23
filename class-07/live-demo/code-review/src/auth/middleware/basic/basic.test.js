'use strict';

// these AI tests are lacking and do not work
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('../../models');

// Import the function to be tested
const authMiddleware = require('.');

// Mock the necessary objects and functions
jest.mock('bcrypt');
jest.mock('base-64');
jest.mock('../../models');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Basic base64encodedstring',
      },
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call next middleware if user authentication is valid', async () => {
    const user = {
      username: 'testuser',
      password: 'hashedpassword',
    };

    const compareMock = jest.fn(() => true);
    const findOneMock = jest.fn(() => user);
    bcrypt.compare.mockImplementation(compareMock);
    Users.findOne.mockImplementation(findOneMock);

    await authMiddleware(req, res, next);

    expect(findOneMock).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    expect(compareMock).toHaveBeenCalledWith('password', 'hashedpassword');
    expect(req.user).toEqual(user);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if user authentication is invalid', async () => {
    const compareMock = jest.fn(() => false);
    const findOneMock = jest.fn(() => null);
    bcrypt.compare.mockImplementation(compareMock);
    Users.findOne.mockImplementation(findOneMock);

    await authMiddleware(req, res, next);

    expect(findOneMock).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    expect(compareMock).toHaveBeenCalledWith('password', null);
    expect(next).toHaveBeenCalledWith('Invalid Login. message: Invalid User');
  });
});
