'use strict';


const express = require('express');
const cors = require('cors')
const first = require('./middleware/first');
const { second, third } = require('./middleware/second-and-third');
const fourth = require('./middleware/fourth')
const validator = require('./middleware/validator');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

// create express singleton
const app = express();


// middleware
app.use(cors());
app.use(express.json());

//also works
app.use(first, second, third);
// app.use(first);
// app.use(second);
// app.use(third);


// app.post('/route', handlerCallback)
app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

// how to use query parameters
app.get('/helloQuery', fourth, (req, res, next) => {
  console.log('req.query:', req.query);
  res.status(200).send('something happened');
})

// how to use path (or URL) parameters
// TODO: create middleware to evaluate our path parameter
app.get('/helloPath/:banana', validator, (req, res, next) => {
  console.log('params:', req.params);
  res.status(200).send('something happened');
})

app.get('/success', (req, res, next) => {
  res.status(200).send('Success!!');
});

app.get('/bad', (req, res, next) => {
  next('We have an error!');
});

app.use('*', notFound);
app.use(errorHandler);

const start = (port) => app.listen(port, () => console.log('listening on port:', port));

module.exports = { start, app }
