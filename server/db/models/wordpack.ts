import { Sequelize } from 'sequelize';
import db from '../db';

const Wordpack = db.define('wordpack', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Wordpack;
