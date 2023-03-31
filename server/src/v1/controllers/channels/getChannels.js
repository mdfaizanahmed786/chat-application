const Channel = require("../../models/Channel");

const getChannels = async (req, res) => {
  const { cname } = req.query;
  if (!cname) {
    try {
      const channels = await Channel.find();
      return res.status(200).json(channels);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else {
    const channelName = req.query.cname.toLowerCase();

    try {
    //  finOne gives only that object
      const channel = await Channel.find({ name: { $regex: channelName, $options: 'i' } });
      
    
      if (!channel)
        return res.status(400).json({ message: "Channel does not exist" });
     

      return res.status(200).json(channel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};
module.exports = getChannels;
