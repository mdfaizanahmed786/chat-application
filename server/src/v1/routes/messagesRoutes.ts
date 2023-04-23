import express from "express";
import sendMessage from "../controllers/messages/sendMessage.js";
import authenticateUser from "../middleware.js";

const router = express.Router();

router.post("/send", authenticateUser, sendMessage);


export default router;