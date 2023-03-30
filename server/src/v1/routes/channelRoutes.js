const express = require("express");
const getChannels = require("../controllers/channels/getChannels");
const createChannel = require("../controllers/channels/createChannel");
const authenticateUser = require("../middleware");
const router = express.Router();

// get all channels

router.get("/channel", authenticateUser, getChannels);
router.post("/channel", authenticateUser, createChannel);

module.exports = router;
