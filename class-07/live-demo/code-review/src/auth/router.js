'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const router = express.Router();
const { Users } = require('./models');
const basicAuth = require('./middleware/basic');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res, next) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { next(e); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, async (req, res, next) => {

  try {
    res.status(200).json(req.user);

  } catch (error) { next('Invalid Login. message: ', error.message); }

});

module.exports = router;
