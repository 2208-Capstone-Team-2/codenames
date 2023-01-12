const Sequelize = require("sequelize");
const DB_NAME = "codenames";

const db = new Sequelize("postgres://localhost:5432/codenames", {
  logging: false,
});

module.exports = db;
