'use strict';

const base64 = require('base-64');
// this was updated to import from the root level models/index.js
const { users } = require('../../models/index');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};
