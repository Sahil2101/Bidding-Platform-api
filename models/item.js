

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  starting_price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false
  },
  current_price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    defaultValue: sequelize.col('starting_price')
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Item;
