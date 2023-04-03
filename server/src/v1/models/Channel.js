const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    users: [{
      _id: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "User",  },
      name: { type: String, required: true },
      email: { type: String, required: true },
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "User",  },
    messages: [{
      _id: { type: mongoose.Schema.Types.ObjectId,ref: "Message",  },
      message: { type: String },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",  },
      createdAt: { type: Date},
    }],

    
  },
  {
    timestamps: true,
  }
);


const Channel= mongoose.model("Channel", ChannelSchema);
module.exports = Channel;