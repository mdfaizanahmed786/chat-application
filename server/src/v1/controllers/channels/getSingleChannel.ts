import Channel from "../../models/Channel.js";
import {Request, Response} from 'express';


const getSingleChannel=async(req:Request, res:Response)=>{
    if(!req.params.channelId){
        return res.status(400).json({message:"Channel Id is required"})
    }
    const channelId=req.params.channelId;
    try{
        const channel=await Channel.findById(channelId);
        if(!channel){
            return res.status(400).json({message:"Channel does not exist"})
        }
        return res.status(200).json(channel);
    }catch(err:any){
        return res.status(500).json({message:err.message})
    }
}

export default getSingleChannel;