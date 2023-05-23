'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./user');

// this conditional assignment, makes our database testable
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

const Users = userSchema(sequelize, DataTypes);

module.exports = { sequelize, Users };
