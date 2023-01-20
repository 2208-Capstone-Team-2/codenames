const { Sequelize } = require('sequelize');
const db = require('../db');

const Card = db.define('card', {
  isVisibleToAll: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // Todo: Need to decide if this will be a simple bool or
  // if we want the player's name associated with it -
  // how would we do that if players are in firebase?
  //isSuggested: {}
});

module.exports = Card;
