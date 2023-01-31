// typescripted by rose!
import { Sequelize } from 'sequelize';
import db from '../db';

const Team = db.define('team', {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Team;
