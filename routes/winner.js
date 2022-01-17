const express = require("express");

const router = express.Router();
const { getWinners } = require("../controllers/winner");

router.get("/", getWinners);

module.exports = router;
