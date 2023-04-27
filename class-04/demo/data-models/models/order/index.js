'use strict';

const order = (sequelize, DataTypes) => sequelize.define('orders', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = order;
