// typescripted by olivia!
import Sequelize from 'sequelize';
import db from '../db';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface ResponseError extends Error {
  status?: number;
}

const { STRING } = Sequelize;

export interface WordPackModel extends Model<InferAttributes<WordPackModel>, InferCreationAttributes<WordPackModel>> {
  name: string;
}

const Wordpack = db.define<WordPackModel>('wordpack', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

export default Wordpack;
