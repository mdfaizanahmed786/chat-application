const Pusher = require("pusher");
const Message = require("../../models/Message");
const mongoose = require("mongoose");

const pusher = new Pusher({
  appId: "1576258",
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true,
});

const sendMessage = async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ message: "Message is required" });
  }


  try {
    const newMessage = new Message({
      message: req.body.message,
      userId: req.body.userId,
      channelId: req.body.channelId,
    });

    await newMessage.save();

    pusher.trigger("chat", "trigger-chat", {
      message: req.body.message,
    });
    res.status(201).json({ success: true, newMessage });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = sendMessage;
