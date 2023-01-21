const { Sequelize } = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
  name: {
    // Maybe this will be the roomId from firebase?
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Room;
