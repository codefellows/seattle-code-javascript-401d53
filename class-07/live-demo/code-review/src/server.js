'use strict';

const express = require('express');
const authRouter = require('./auth/router');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

const start = (port) => app.listen(port, () => console.log('server up on port:', port));

module.exports = { app, start };
