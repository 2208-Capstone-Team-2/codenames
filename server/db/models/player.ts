import Sequelize, { INTEGER } from 'sequelize';
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
const { STRING } = Sequelize;
export interface PlayerModel extends Model<    InferAttributes<PlayerModel>,
InferCreationAttributes<PlayerModel>>{
  id: number
  username:CreationOptional<string>;
  role:CreationOptional<string>;
  wins:CreationOptional<number>;
  roomId: CreationOptional<number | null>;
  teamId: CreationOptional<number | null>;
}
const Player = db.define<PlayerModel>('player', {
  //id will be coming from firebase
  id: {
    type: STRING,
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
    type: STRING,
    allowNull: false, // maybe we need to make this true
    defaultValue: '',
  },

  // Even though this is an enum, calling it an enum breaks psql for some weird reason,
  // so uses a custom validator
  role: {
    type: STRING,
    allowNull: true,
    unique: false,
    defaultValue: 'unassigned',
    validate: {
      customValidator: (value:any) => {
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
  roomId:{
    type: INTEGER,
    allowNull: true
  },
  teamId: {
    type: INTEGER,
    allowNull: true,
  }
});

export default Player;
