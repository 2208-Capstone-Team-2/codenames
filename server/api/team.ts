import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

// GET - /api/team/
// send back all teams
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // not needed?
  } catch (err) {
    next(err);
  }
});

export default router;
