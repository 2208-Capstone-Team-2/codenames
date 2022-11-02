const db = require("./db");

const seed = async () => {
    // Clear out any old data
    await db.sync({ force: true });

    console.log("DONE RUNNING SEED...");
};

seed();