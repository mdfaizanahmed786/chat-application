const express = require("express");
const getChannels = require("../controllers/channels/getChannels");
const createChannel = require("../controllers/channels/createChannel");
const router = express.Router();

// get all channels

router.get("/channel", getChannels);
router.post("/channel", createChannel);



module.exports=router;