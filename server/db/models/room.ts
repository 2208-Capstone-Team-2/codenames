import Sequelize from 'sequelize';
import db from '../db';
import Team from './team';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface ResponseError extends Error {
  status?: number;
}

const { STRING, INTEGER } = Sequelize;

export interface RoomModel
  extends Model<
    InferAttributes<RoomModel>,
    InferCreationAttributes<RoomModel>
  > {
  id: CreationOptional<number>;
  name: string;
  team1id: CreationOptional<number>;
  team2id: CreationOptional<number>;
  team3id: CreationOptional<number>;
  team4id: CreationOptional<number>;
}

const Room = db.define<RoomModel>('room', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    // eg: 123, myFavoriteRoom
    // Maybe this will be the roomId from firebase?
    type: STRING,
    allowNull: true,
  },

  // Do we need to keep track of the 'order' of the teams by doing something like this?
  // Where team 1 is 'team that goes first' aka 'team with 9 cards' aka 'team red'
  team1id: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },

  team2id: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },

  team3id: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },

  team4id: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },
});

export default Room;