const Channel = require("../../models/Channel");
const User = require("../../models/User");

const leaveChannel = async (req, res) => {
  if (!req.params.channelId) {
    return res.status(400).json({ message: "Channel Id is required" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ message: "User id is required" });
  }

  try {
    const user = await User.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const channel = await Channel.findById({ _id: req.params.channelId });
    const users = JSON.parse(JSON.stringify(channel.users));
    const removeUser = users.filter((user) => user._id !== req.body.userId);

   
    channel.users = removeUser;
    await channel.save();
    const filteredUsers=JSON.parse(JSON.stringify(user.channels));
    const removeChannel= filteredUsers.filter((channel) => channel._id !== req.params.channelId);
    user.channels = removeChannel;
    await user.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = leaveChannel;
