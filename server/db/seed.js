const db = require("./db");

// Import the smaller seeding functions that we'll use:
const seedDefaultWordpack = require("./seeds/seedDefaultWordpack");
const seedDuetWordpack = require("./seeds/seedDuetWordpack");

const seed = async () => {
  await db.sync({ force: true }); // Clear out any old data

  await seedDefaultWordpack();
  await seedDuetWordpack();

  console.log("DONE RUNNING SEED...");
};

seed();
