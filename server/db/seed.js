const db = require('./db');

// eslint-disable-next-line no-unused-vars
const Player = require('./models/player');
// eslint-disable-next-line no-unused-vars
const Room = require('./models/room');
// eslint-disable-next-line no-unused-vars
const Team = require('./models/team');
const playerSeed = require('./seeds/playerSeeds');
// Import the smaller seeding functions that we'll use:
const seedDefaultWordpack = require('./seeds/seedDefaultWordpack');
const seedDuetWordpack = require('./seeds/seedDuetWordpack');

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
