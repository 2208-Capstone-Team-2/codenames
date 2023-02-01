import Sequelize from 'sequelize';
import db from '../db';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
interface ResponseError extends Error {
  status?: number;
}
const { STRING, INTEGER,ENUM } = Sequelize;
export interface PlayerModel extends Model<    InferAttributes<PlayerModel>,
InferCreationAttributes<PlayerModel>>{
  id: CreationOptional<number>;
  username:string
  role:CreationOptional<string>;
  wins:CreationOptional<number>;
}
const Player = db.define<PlayerModel>('player', {
  //id will be coming from firebase
  id: {
    type: Sequelize.STRING,
    allowNull: true,
    primaryKey: true,
    // If the key was unique, then would this conflict with multiple games?
    unique: false,
    validate: {
      notEmpty: true,
    },
  },
  //username will be coming from firebase
  username: {
    type: Sequelize.STRING,
    allowNull: false, // maybe we need to make this true
    defaultValue: '',
  },

  // Even though this is an enum, calling it an enum breaks psql for some weird reason,
  // so uses a custom validator
  role: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
    defaultValue: 'unassigned',
    validate: {
      customValidator: (value) => {
        const enums = ['operative', 'spymaster', 'unassigned'];
        if (!enums.includes(value)) {
          throw new Error('not a valid option');
        }
      },
    },
  },
  wins: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: false,
    defaultValue: 0,
  },
});

export default Player;
