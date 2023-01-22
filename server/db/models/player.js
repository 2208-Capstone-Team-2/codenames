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

  // Even though this is an enum, calling it an enum breaks psql for some weird reason,
  // so uses a custom validator
  //   role: {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //     unique: false,
  //     validate: {
  //       customValidator: (value) => {
  //         const enums = ['operative', 'spymaster'];
  //         if (!enums.includes(value)) {
  //           throw new Error('not a valid option');
  //         }
  //       },
  //     },
  //   },
});

module.exports = Player;
