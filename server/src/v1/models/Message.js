const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        
      },
      name: {
        type: String,
      required: true,
      },
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
