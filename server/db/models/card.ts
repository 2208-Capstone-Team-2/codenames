import { Sequelize } from 'sequelize';
import db from '../db';

const Card = db.define('card', {
  isVisibleToAll: {
    type: Sequelize.BOOLEAN,
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
