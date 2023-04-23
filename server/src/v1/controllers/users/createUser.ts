import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface JWTUSER{
  email:string,
  _id:string
}

const createUser = async (req:Request, res:Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET as string,
      
    );

    await user.save();
    res.status(201).json({ token,  _id: user._id, name:user.name,  success:true });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

export default createUser;