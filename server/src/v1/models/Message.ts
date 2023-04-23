import mongoose from "mongoose";
const Schema = mongoose.Schema;

type Message = {
  message: string;
  user: {
    userId: string;

    name: string;
  };
  channelId?: mongoose.Schema.Types.ObjectId |string;
};


const MessageSchema = new Schema<Message>(
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
export default Message;
