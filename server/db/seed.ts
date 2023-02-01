// const db = require('./db');
import db from './db';
import Player from './models/player';
// eslint-disable-next-line no-unused-vars
import Room from './models/room';
// eslint-disable-next-line no-unused-vars
import Team from './models/team';
// eslint-disable-next-line no-unused-vars
import playerSeed from './seeds/playerSeeds';
// Import the smaller seeding functions that we'll use:
import seedDefaultWordpack from './seeds/seedDefaultWordpack';
import seedDuetWordpack from './seeds/seedDuetWordpack';

const seed = async () => {
  await db.sync({ force: true }); // Clear out any old data

  await seedDefaultWordpack();
  await seedDuetWordpack();
  await playerSeed();

  console.log('DONE RUNNING SEED...');
};
// some sequelize methods here
console.log('Player methods in here:');
console.log(Object.keys(Player.prototype));
console.log('Team methods in here:');
console.log(Object.keys(Team.prototype));
console.log('Room methods in here:');
console.log(Object.keys(Room.prototype));
seed();
