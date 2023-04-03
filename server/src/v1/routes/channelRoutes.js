const express = require("express");
const getChannels = require("../controllers/channels/getChannels");
const createChannel = require("../controllers/channels/createChannel");
const authenticateUser = require("../middleware");
const joinChannel = require("../controllers/channels/joinChannel");
const getSingleChannel = require("../controllers/channels/getSingleChannel");
const router = express.Router();

// get all channels

router.get("/channel", authenticateUser, getChannels);
router.post("/channel", authenticateUser, createChannel);
router.post("/channel/:channelId", authenticateUser, joinChannel);
router.get("/getChannel/:channelId", authenticateUser, getSingleChannel);

module.exports = router;
