import { Sequelize } from 'sequelize';
import db from '../db';

const Word = db.define('word', {
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Word;
