import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface JWTUSER{
  email:string,
  _id:string
}
const loginUser = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const checkPassword = await bcrypt.compare(password, checkEmail.password!);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: checkEmail.email, _id: checkEmail._id },
      process.env.JWT_SECRET as string,
    
    );
    res
      .status(200)
      .json({ token, _id: checkEmail._id ,name:checkEmail.name, success:true});
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

export default loginUser;
