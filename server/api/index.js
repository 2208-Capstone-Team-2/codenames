const express = require('express');
const router = express.Router();

router.use('/25words', require('./25words'));
router.use('/board', require('./board'));
router.use('/room', require('./room'));
router.use('/team', require('./team'));
router.use('/wordpack', require('./wordpack'));

module.exports = router;
