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
      userId: req.user._id,
      channelId: req.body.channelId,
      
    });

    await newMessage.save();

    const allMessages=await Message.find({channelId:req.body.channelId}).populate('userId', 'name').populate('channelId', 'name')
    pusher.trigger("chat", "trigger-chat", {
      allMessages
    });
   
    return res.status(201).json({ success: true });
   
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = sendMessage;
