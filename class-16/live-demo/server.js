'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.get('/hello', (req, res, next) => {
  res.status(200).send(`Hello ${req.query.name}`);
});

app.get('/greet', (req, res, next) => {
  res.status(200).send('Hello World, I greet you!');
});
app.get('/banana', (req, res, next) => {
  res.status(200).send('B-A-N-A-N-A-S');
});

app.listen(PORT, () => console.log('server running on port: ', PORT));
