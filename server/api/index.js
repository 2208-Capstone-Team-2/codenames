const express = require("express");
const router = express.Router();

router.use("/25words", require("./25words"));
router.use("/wordpack", require("./wordpack"));
module.exports = router;
