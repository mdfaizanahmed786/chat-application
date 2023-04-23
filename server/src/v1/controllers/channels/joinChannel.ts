import Channel from "../../models/Channel.js";
import User from "../../models/User.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

type Messages={
  _id:mongoose.Schema.Types.ObjectId | string;
  message:string;
  user:{
    userId:mongoose.Schema.Types.ObjectId | string;
    name:string;

  }
}

type Users={
  _id:mongoose.Schema.Types.ObjectId | string,
  name:string,
  email:string
}
type Channels={
  _id:mongoose.Schema.Types.ObjectId | string,
  name:string,
  email:string
  description:string;
  users:User[];
  createdBy:mongoose.Schema.Types.ObjectId | string;
  messages:Messages[];

}


const joinChannel = async (req:Request | any, res:Response) => {
  if (req.params.channelId) {
    // finding channel by id
    const channel = await Channel.findById(req.params.channelId);

    if (channel) {
      // if channel exists, then find user by id
      const user = await User.findById(req.user._id);
      const userObj = JSON.parse(JSON.stringify(user));
      delete userObj.password;
      delete userObj.__v;
      delete userObj.createdAt;
      delete userObj.updatedAt;

      if (user) {
        // if user exists, then check if user is already in channel
        const checkUser = channel.users.find((u:Users) => u._id == req.user._id);
        if (!checkUser) {
          // if user is not in channel, then add user to channel
          channel.users.push(userObj);
          await channel.save();
          const channelObj = JSON.parse(JSON.stringify(channel));
          delete channelObj.__v;
          delete channelObj.createdAt;
          delete channelObj.updatedAt;
          // appending channel to user
          user.channels.push(channelObj);
          await user.save();

          // add channel to user
          return res
            .status(200)
            .json({ message: "User added to channel", success: true });
        }
        // if user is already in channel, then return message
        return res
          .status(200)
          .json({ message: "User already in channel", success: true });
      }
      // if user does not exist, then return message
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    // if channel does not exist, then return message
    return res
      .status(400)
      .json({ message: "Channel not found", success: false });
  } else {
    return res
      .status(400)
      .json({ message: "Please mention channelId", success: false });
  }
};

export default joinChannel;
