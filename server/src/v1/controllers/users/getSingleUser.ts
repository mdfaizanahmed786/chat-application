import User from "../../models/User.js";
import { Request, Response } from "express";

const getSingleUser = async (req:Request, res:Response) => {
  if (!req.params.userId) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });

    }
    let userObj= user.toObject();
    delete userObj?.password
    return res.status(200).json(userObj);
  } catch (err:any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getSingleUser;