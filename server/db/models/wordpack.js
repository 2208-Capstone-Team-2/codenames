const { Sequelize } = require("sequelize");
const db = require("../db");

const Wordpack = db.define("wordpack", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Wordpack;
