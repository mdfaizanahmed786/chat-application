import Pusher from "pusher";
import Message from "../../models/Message.js";
import Channel from "../../models/Channel.js";
import User from "../../models/User.js";
import { Request, Response } from "express";

const sendMessage = async (req: Request | any, res: Response) => {
  const pusher = new Pusher({
    appId: "1576258",
    key: process.env.PUSHER_API_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "mt1",
  });
  if (!req.body.message || !req.body.channelId) {
    return res.status(400).json({ message: "Message is required" });
  }
  if (!req.body.name) {
    return res.status(401).json({ message: "Name is required" });
  }

  const checkName = await User.find({ name: req.body.name });
  if (!checkName)
    return res
      .status(403)
      .json({ message: "You are not authorized to send message!" });

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
    if (!channel) return res.status(400).json({ message: "Channel not found" });

    delete newMessage.__v;
    delete newMessage.channelId;
    channel.messages.push(newMessage as any);
    await channel.save();

    const allMessages = await Channel.find({ _id: req.body.channelId });

    pusher.trigger("chat", "trigger-chat", {
      channel: allMessages[0],
    });

    return res.status(201).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
export default sendMessage;
