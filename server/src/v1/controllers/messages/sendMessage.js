const Pusher = require("pusher");
const Message = require("../../models/Message");
const mongoose = require("mongoose");
const Channel = require("../../models/Channel");


const pusher = new Pusher({
  appId: "1576258",
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true,
});

const sendMessage = async (req, res) => {
  if (!req.body.message || !req.body.channelId) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const newMessage = new Message({
      message: req.body.message,
      userId: req.user._id,
      channelId: req.body.channelId,
    });

    await newMessage.save();
    
    const channel = await Channel.findOne({ _id: req.body.channelId });
    if(!channel) return res.status(400).json({message: "Channel not found"});
    delete newMessage.updatedAt;
    delete newMessage.__v;
    delete newMessage.channelId;
    channel.messages.push(newMessage);
    await channel.save();

    const allMessages = await Channel.find({ _id: req.body.channelId }).populate(
      "messages.userId", "name email").populate("createdBy", "name email");

    
    pusher.trigger("chat", "trigger-chat", {
      allMessages:allMessages[0].messages,
    });
   

    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = sendMessage;
