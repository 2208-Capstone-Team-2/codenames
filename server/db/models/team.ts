// typescripted by rose!
import Sequelize from 'sequelize';
import db from '../db';
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface ResponseError extends Error {
  status?: number;
}

const { STRING, INTEGER } = Sequelize;

export interface TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
  name: string;
}
const Team = db.define('team', {
  name: {
    type: STRING,
    allowNull: true,
  },
});

export default Team;
