const Channel = require("../../models/Channel");
const User = require("../../models/User");

const createChannel = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).json({
      message: "Please provide a name and description for the channel",
    });

  const channelName = req.body.name;
  const findChannel = await Channel.findOne({ name: channelName });
  if (findChannel) {
    return res.status(400).json({
      message: "Channel already exists",
    });
  }

  const channel = new Channel({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user._id,
  });
  try {
    const savedChannel = await channel.save();

    const user = await User.findById({ _id: req.user._id });
    const userObj = JSON.parse(JSON.stringify(user));

    channel.users.push({
      _id: userObj._id,
      name: userObj.name,
      email: userObj.email,
    });
    await channel.save();

    user.channels.push({
      _id: savedChannel._id,
      name: savedChannel.name,
      users: savedChannel.users,
      createdBy: savedChannel.createdBy,
    });
    await user.save();

    res.status(201).json({ success: true, channel: savedChannel });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createChannel;
