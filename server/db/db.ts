import { Sequelize } from 'sequelize';
const config = {
  logging: false,
};

const DB_NAME = 'codenames';
const URL = `postgres://localhost/${DB_NAME}`;

const db = new Sequelize(process.env.DATABASE_URL || URL, config);

export default db;
