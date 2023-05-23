'use strict';

const express = require('express');
const authRouter = require('./auth/router');
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const { userModel } = require('./auth/models');
const bearer = require('./auth/middleware/bearer');

const app = express();
app.use(express.json());
app.use(authRouter);

// allows us to accept webform data.  aka process FORM input and add to request body
// NOT NECESSARY FOR TODAY, BUT GOOD QUALITY OF LIFE TO KNOW ABOUT FOR LATER
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

app.get('/users', bearer, async (req, res, next) => {
  const users = await userModel.findAll();
  res.status(200).send(users);
});

app.use('*', notFound);
app.use(errorHandler);


const start = (port) => {
  app.listen(port, () => console.log('listening on port: ', port));
};

module.exports = { app, start };
