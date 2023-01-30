import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { Board } from '../db';

// DELETE - /api/board/:boardId
// Given a boardId (via req.body),
// deletes all the cards associated with it & then deletes the board itself
router.get('/:boardId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    // todo
  } catch (err) {
    next(err);
  }
});

export default router;
