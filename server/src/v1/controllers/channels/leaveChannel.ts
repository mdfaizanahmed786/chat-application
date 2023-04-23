import Channel from "../../models/Channel.js";
import User from "../../models/User.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

type Messages={
  _id:mongoose.Schema.Types.ObjectId;
  message:string;
  user:{
    userId:mongoose.Schema.Types.ObjectId;
    name:string;

  }
}

type Users={
  _id:mongoose.Schema.Types.ObjectId,
  name:string,
  email:string
}
type Channels={
  _id:mongoose.Schema.Types.ObjectId | string,
  name:string,
  email:string
  description:string;
  users:User[];
  createdBy:mongoose.Schema.Types.ObjectId;
  messages:Messages[];

}

const leaveChannel = async (req:Request, res:Response) => {
  if (!req.params.channelId) {
    return res.status(400).json({ message: "Channel Id is required" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (Boolean(req.body.creator)) {
    const deleteChannel = await Channel.findByIdAndDelete({
      _id: req.params.channelId,
    });
    const user = await User.findById({ _id: req.body.userId });
    const filteredUsers = JSON.parse(JSON.stringify(user!.channels));
    const removeChannel = filteredUsers.filter(
      (channel:Channels) => channel._id !== req.params.channelId!
    );
    user!.channels = removeChannel;
    await user!.save();
    if (!deleteChannel) {
      return res.status(400).json({ message: "Channel not found" });
    }
    return res.status(200).json({ success: true });
  } else {
    try {
      const user = await User.findById({ _id: req.body.userId });
      if (!user) {
        return res.status(403).json({ message: "You are not authorized" });
      }

      const channel = await Channel.findById({ _id: req.params.channelId });
      const users = JSON.parse(JSON.stringify(channel!.users));
      const removeUser = users.filter((user:Users) => user._id !== req.body.userId);

      channel!.users = removeUser;
      await channel!.save();
      const filteredUsers = JSON.parse(JSON.stringify(user.channels));
      const removeChannel = filteredUsers.filter(
        (channel:Channels) => channel._id !== req.params.channelId
      );
      user.channels = removeChannel;
      await user.save();

      return res.status(200).json({ success: true });
    } catch (err:any) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export default leaveChannel;
