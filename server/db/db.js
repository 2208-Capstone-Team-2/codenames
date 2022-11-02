const Sequelize = require("sequelize");

const db = new Sequelize(
    'postgres://localhost:5444/movie_db',
    { logging: false }
);

module.exports = db;