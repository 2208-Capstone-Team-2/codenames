const express = require('express');
const router = express.Router();

router.use('/wordpack', require('./wordpack'));
router.use('/team', require('./team'));
router.use('/room', require('./room'));

router.use('/25words', require('./25words'));

module.exports = router;
