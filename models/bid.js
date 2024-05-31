const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Item = require('./item'); // Assuming Item model is defined in item.js
const User = require('./user');

const Bid = sequelize.define('Bid', {
  bid_amount: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Bid;


Bid.belongsTo(Item, { foreignKey: 'item_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });