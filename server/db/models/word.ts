// typescripted by rose!
import Sequelize from 'sequelize';
import db from '../db';
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
interface ResponseError extends Error {
  status?: number;
}

const { STRING, INTEGER } = Sequelize;

export interface WordModel extends Model<InferAttributes<WordModel>, InferCreationAttributes<WordModel>> {
  id: CreationOptional<number>;
  word: string;
}

const Word = db.define<WordModel>('word', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  word: {
    type: STRING,
    allowNull: false,
  },
});

export default Word;
