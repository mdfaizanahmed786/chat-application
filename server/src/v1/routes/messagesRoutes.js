const express = require("express");
const sendMessage = require("../controllers/messages/sendMessage");
const authenticateUser = require("../middleware");
const getMessages = require("../controllers/messages/getMessages");
const router = express.Router();

router.post("/send", authenticateUser, sendMessage);
router.get("/messages", authenticateUser, getMessages);

module.exports = router;
