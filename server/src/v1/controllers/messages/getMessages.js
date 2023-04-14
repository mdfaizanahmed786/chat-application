const Pusher = require("pusher");
const Message = require("../../models/Message");


const pusher = new Pusher({
  appId: "1576258",
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true,
});

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
      pusher.trigger("chat", "trigger-chat", {
        messages
      });
  
      res.json({
        messages,
        totalPages,
        page,
        totalResults: count,
      });
    } catch (err) {
   
      res.status(500).json({ message: err.message });
    }


}

module.exports = getMessages;