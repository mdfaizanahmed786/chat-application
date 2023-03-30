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
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
  },
);


const Channel= mongoose.model("Channel", ChannelSchema);
module.exports = Channel;