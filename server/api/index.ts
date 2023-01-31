import { Router } from 'express';
const router = Router();
import boardRouter from './board';
import cardRouter from './card';
import roomRouter from './room';
import teamRouter from './team';
import wordPackRouter from './wordpack';
import playerRouter from './playerAPI/player';

router.use('/board', boardRouter);
router.use('/card', cardRouter);
router.use('/room', roomRouter);
router.use('/team', teamRouter);
router.use('/wordpack', wordPackRouter);
router.use('/player', playerRouter);

export default router;
