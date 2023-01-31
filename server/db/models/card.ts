import Sequelize from 'sequelize';
import db from '../db';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
const { BOOLEAN} = Sequelize;
interface ResponseError extends Error {
  status?: number;
}

export interface CardModel
  extends Model<
    InferAttributes<CardModel>,
    InferCreationAttributes<CardModel>
  > {
    isVisibleToAll: boolean;
}
const Card = db.define<CardModel>('card', {
  isVisibleToAll: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // tier 2
  // Todo: Need to decide if this will be a simple bool or
  // if we want the player's name associated with it -
  // how would we do that if players are in firebase?
  // this might just live only in firebase
  //isSuggested: {}
});

export default Card;
