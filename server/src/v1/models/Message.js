const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const MessageSchema=new Schema({
    message:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    channelId:{
        type:Schema.Types.ObjectId,
        ref:'Channel'
    }
}, {timestamps:true})


const Message=mongoose.model('Message', MessageSchema);
module.exports=Message;