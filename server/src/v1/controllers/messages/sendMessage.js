const Pusher = require("pusher");
const Message = require("../../models/Message");
const mongoose = require("mongoose");
const Channel = require("../../models/Channel");
const User = require("../../models/User");



const sendMessage = async (req, res) => {
  if (!req.body.message || !req.body.channelId) {
    return res.status(400).json({ message: "Message is required" });
  }
  if(!req.body.name){
    return res.status(401).json({ message: "Name is required" });
  }

  const checkName=await User.find({name:req.body.name})
  if(!checkName) return res.status(403).json({message:"You are not authorized to send message!"})

  try {
    const newMessage = new Message({
      message: req.body.message,
      user: {
        userId: req.user._id,
        name: req.body.name,
      },
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

    const allMessages = await Channel.find({ _id: req.body.channelId })

    
 
   

    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = sendMessage;
