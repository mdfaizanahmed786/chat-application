import express from "express";
import getChannels from "../controllers/channels/getChannels.js";
import createChannel from "../controllers/channels/createChannel.js";
import authenticateUser from "../middleware.js";
import joinChannel from "../controllers/channels/joinChannel.js";
import getSingleChannel from "../controllers/channels/getSingleChannel.js";
import leaveChannel from "../controllers/channels/leaveChannel.js";
const router = express.Router();

// all channels

router.get("/channel", authenticateUser, getChannels);
router.post("/channel", authenticateUser, createChannel);
router.post("/channel/:channelId", authenticateUser, joinChannel);
router.get("/getChannel/:channelId", authenticateUser, getSingleChannel);
router.post("/leaveChannel/:channelId", authenticateUser, leaveChannel)

export default router;
