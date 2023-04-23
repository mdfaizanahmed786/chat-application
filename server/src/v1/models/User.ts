import mongoose from "mongoose";
type Messages={
  _id:mongoose.Schema.Types.ObjectId;
  message:string;

  user:{
    userId:mongoose.Schema.Types.ObjectId;
    name:string;

  }
}
type Channel={
  _id?:mongoose.Schema.Types.ObjectId;
  name?:string;
  description:string;
  users?:User[];
  createdBy:mongoose.Schema.Types.ObjectId;
  messages:Messages[];


}
type User={
  _id:mongoose.Schema.Types.ObjectId | string,
  name:string,
  email:string
  description:string;
  password?:string;
  users?:User[];
  createdBy:mongoose.Schema.Types.ObjectId;
  messages:Messages[];
  channels:Channel[];


}

const UserSchema = new mongoose.Schema<User>(
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
export default User;
