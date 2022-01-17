const express = require("express");

const router = express.Router();
const { signup, login, getEntries } = require("../controllers/user");

router.post("/signup", signup);
router.post("/login", login);
router.get("/entries/:userId", getEntries);

module.exports = router;
