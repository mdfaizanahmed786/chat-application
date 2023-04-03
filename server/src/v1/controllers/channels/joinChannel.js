const Channel = require("../../models/Channel")
const User = require("../../models/User")


const joinChannel=async(req, res)=>{
    if(req.params.channelId){
        // finding channel by id
        const channel=await Channel.findById(req.params.channelId)

        if(channel){
            // if channel exists, then find user by id
            const user=await User.findById(req.user._id)
            const userObj=user.toObject()
            delete userObj.password
            delete userObj.__v
            delete userObj.createdAt
            delete userObj.updatedAt
         
            if(user){
                // if user exists, then check if user is already in channel
                const checkUser=channel.users.find((u)=>u._id==req.user._id)
                if(!checkUser){
                    // if user is not in channel, then add user to channel
                    channel.users.push(userObj)
                    await channel.save()
                    // add channel to user
                    return res.status(200).json({message:"User added to channel",success:true})
                }
                // if user is already in channel, then return message
                return res.status(200).json({message:"User already in channel",success:true})
            }
            // if user does not exist, then return message
            return res.status(400).json({message:"User not found",success:false})
        }
        // if channel does not exist, then return message
        return res.status(400).json({message:"Channel not found",success:false})
    }
    else{
        return res.status(400).json({message:"Please mention channelId",success:false})
    }

}


module.exports=joinChannel