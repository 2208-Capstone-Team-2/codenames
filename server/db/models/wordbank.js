const { Sequelize } = require("sequelize");
const db = require("../db");

const Wordbank = db.define("wordbank", {
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Wordbank;
