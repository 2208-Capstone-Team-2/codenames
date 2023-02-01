import Sequelize from 'sequelize';
import db from '../db';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
const { BOOLEAN, INTEGER} = Sequelize;
interface ResponseError extends Error {
  status?: number;
}

export interface BoardModel
  extends Model<
    InferAttributes<BoardModel>,
    InferCreationAttributes<BoardModel>
  > {
    id: number;
    roomId: number;
}
const Board = db.define<BoardModel>('board', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roomId: {
    type: INTEGER,
  }
});

export default Board;
