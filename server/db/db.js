const Sequelize = require("sequelize");

const db = new Sequelize(
    'postgres://localhost:5432/final_project',
    { logging: false }
);

module.exports = db;