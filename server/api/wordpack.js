const express = require("express");
const router = express.Router();
const { Wordpack } = require("../db");

// GET - /api/wordpack/
// Gets and returns all Wordpacks in the DB. Does not include the cards.
router.get("/", async (req, res, next) => {
  try {
    const wordpacks = await Wordpack.findAll();
    res.send(wordpacks);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
