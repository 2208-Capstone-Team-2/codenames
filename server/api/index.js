const express = require('express');
const router = express.Router();

router.use('/board', require('./board').default);
router.use('/card', require('./card'));
router.use('/room', require('./room'));
router.use('/team', require('./team'));
router.use('/wordpack', require('./wordpack'));
router.use('/player', require('./playerAPI/player'));

module.exports = router;
