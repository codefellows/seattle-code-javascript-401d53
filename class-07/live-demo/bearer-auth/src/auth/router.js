'use strict';

const express = require('express');
const bcrypt = require('bcrypt');


const basicAuth = require('./middleware/basic');
const { userModel } = require('./models');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  // great proof of life
  // res.status(200).send('this route works');
  try {
    const { username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 5);
    let newUser = await userModel.create({
      username,
      password: encryptedPassword,
    });
    res.status(200).send(newUser);
  } catch (err) {
    console.error(err);
    next('signup error occurred');
  }
});

// signin will require basic auth middleware that PROVES the signin password is equivalent to the hashed password that we have saved in our DB
router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json(req.user);
});

module.exports = router;
