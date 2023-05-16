'use strict';

// choosing to use env here rather than import multiple times
require('dotenv').config();
const { start } = require('./src/server');
const PORT = process.env.PORT;

start(PORT);
