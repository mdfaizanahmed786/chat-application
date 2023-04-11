const Message = require("../../models/Message");

const getMessages = async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;
    const channelId = req.query.channelId;
    if(!channelId) return res.status(400).json({ message: 'ChannelId is required' });
  
    try {
        // to count no of documents
      const count = await Message.countDocuments({ channelId });
    

      const messages = await Message.find(channelId ? { channelId } : {})
      .sort({ createdAt: 'desc' })
        .skip((page-1)* perPage)
        .limit(perPage)
  
      const totalPages = Math.ceil(count / perPage);
  
      res.json({
        messages,
        totalPages,
        page,
        totalResults: count,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }


}

module.exports = getMessages;