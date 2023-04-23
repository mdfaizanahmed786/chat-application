import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response,  NextFunction } from 'express';

interface JWTUSER{
  _id:string;
  name:string
}
interface NewRequest extends Request{
  user:JWTUSER

}

const authenticateUser = (req:Request | any, res:Response, next:NextFunction) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1] as string;


  if (token == null)
    return res.status(401).json({ message: "You are not authorized" });
    
jwt.verify(token, process.env.JWT_SECRET as string, (err:any, user:any) => {
    if (err) return res.status(403).json({ message: "You are not authorized" });
    req.user = user;
    next();
  }     
  );

};
export default authenticateUser;

