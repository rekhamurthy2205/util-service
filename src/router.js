const express = require("express");
const controller = require("./controller");

const router = express.Router();

const { create } = require("./controller");

router.post("/sendmail", create);

module.exports = router;
