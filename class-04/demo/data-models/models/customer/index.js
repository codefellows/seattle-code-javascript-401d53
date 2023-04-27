'use strict';

const customer = (sequelize, DataTypes) => sequelize.define('customers', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = customer;
