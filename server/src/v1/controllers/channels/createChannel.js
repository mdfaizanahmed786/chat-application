const Channel = require("../../models/Channel");

const createChannel = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).json({
      message: "Please provide a name and description for the channel",
    });

    const channelName = req.body.name;
    const findChannel=await Channel.findOne({name:channelName})
    if(findChannel){
      return res.status(400).json({
        message: "Channel already exists",
      });
    }
    

  const channel = new Channel({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedChannel = await channel.save();
    res.status(201).json({ success: true, channel: savedChannel });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createChannel;
