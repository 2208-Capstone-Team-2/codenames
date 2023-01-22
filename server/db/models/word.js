const { Sequelize } = require('sequelize');
const db = require('../db');

const Word = db.define('word', {
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Word;
