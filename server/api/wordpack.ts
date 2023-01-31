import express, { NextFunction, Request, Response, Router } from "express";
const router = Router();
import db from "../db";
const Wordpack = db.Wordpack;

// GET - /api/wordpack/
// Gets and returns all Wordpacks in the DB. Does not include the cards.
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wordpacks = await Wordpack.findAll();
    res.send(wordpacks);
  } catch (err) {
    next(err);
  }
});

export default router;
