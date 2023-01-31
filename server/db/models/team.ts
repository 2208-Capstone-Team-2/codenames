// typescripted by rose!
import Sequelize from 'sequelize';
import db from '../db';
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface ResponseError extends Error {
  status?: number;
}

const { STRING, INTEGER } = Sequelize;

export interface TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
  id: CreationOptional<number>;
  name: string;
}
const Team = db.define<TeamModel>('team', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: true,
  },
});

export default Team;
