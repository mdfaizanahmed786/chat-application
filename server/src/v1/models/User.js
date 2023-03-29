const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  channels: [{ type: mongoose.Schema.Types.UUID, ref: "Channel" }],
}, {
    timestamps:true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

