const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1576258",
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true
});


const sendMessage=async (req, res)=>{
  console.log("DJFLDJFLDJFLDKJFDJF")
    console.log(req.body, "This is the message")
    pusher.trigger("chat", "trigger-chat", {
        message: req.body.message,
      });
}

module.exports=sendMessage;