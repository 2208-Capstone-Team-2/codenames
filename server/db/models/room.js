const { Sequelize } = require('sequelize');
const db = require('../db');

const Team = require('./team');

const Room = db.define('room', {
  name: {
    // eg: 123, myFavoriteRoom
    // Maybe this will be the roomId from firebase?
    type: Sequelize.STRING,
    allowNull: true,
  },

  // Do we need to keep track of the 'order' of the teams by doing something like this?
  // Where team 1 is 'team that goes first' aka 'team with 9 cards' aka 'team red'
  team1id: {
    type: Sequelize.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },

  team2id: {
    type: Sequelize.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },

  team3id: {
    type: Sequelize.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },

  team4id: {
    type: Sequelize.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },
});

module.exports = Room;
