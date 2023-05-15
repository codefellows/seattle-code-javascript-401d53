'use strict';


const express = require('express');
const cors = require('cors')

// create express singleton
const app = express();


// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

app.get('/success', (req, res, next) => {
  res.status(200).send('Success!!');
});

app.get('/bad', (req, res, next) => {
  next('We have an error!');
});

app.use('*', (req, res, next) => {
  res.status(404).send('Not Found');
})

const start = (port) => app.listen(port, () => console.log('listening on port:', port));

module.exports = { start, app }
