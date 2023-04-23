import mongoose from "mongoose";
type Messages={
  _id:mongoose.Schema.Types.ObjectId;
  message:string;
  user:{
    userId:mongoose.Schema.Types.ObjectId;
    name:string;

  }
}

type User={
  _id:mongoose.Schema.Types.ObjectId,
  name:string,
  email:string


 
}
type Channel={
  _id?:mongoose.Schema.Types.ObjectId,
  name:string,
  email:string
  description:string;
  users:User[];
  createdBy:mongoose.Schema.Types.ObjectId;
  messages:Messages[];

}

const ChannelSchema = new mongoose.Schema<Channel>(
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
      user: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          
        },
        name: {
          type: String,
        required: true,
        },
      },
      createdAt: { type: Date},
    }],

    
  },
  {
    timestamps: true,
  }
);


const Channel= mongoose.model("Channel", ChannelSchema);
export default Channel;