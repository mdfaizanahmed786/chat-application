const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
    channels: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Channel",
        },
        name: {
          type: String,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
        },
        users: [
          {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            name: {
              type: String,
            },
            email: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
