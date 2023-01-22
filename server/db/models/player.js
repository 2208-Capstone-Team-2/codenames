const { Sequelize } = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  //id will be coming from firebase
  id: {
    type: Sequelize.STRING,
    allowNull: true,
    primaryKey: true,
    // If the key was unique, then would this conflict with multiple games?
    unique: false,
    validate: {
      notEmpty: true,
    },
  },
  //username will be coming from firebase
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  //
  role: {
    type: Sequelize.ENUM('operative', 'spymaster'),
    allowNull: true,
    unique: false,
  },
});

module.exports = Player;
