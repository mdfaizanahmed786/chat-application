const express = require("express");
const sendMessage = require("../controllers/messages/sendMessage");
const authenticateUser = require("../middleware");
const router = express.Router();

router.post("/send", authenticateUser, sendMessage);

module.exports = router;
