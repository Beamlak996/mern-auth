import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token
  if(!token) return res.status(401).json({message: "Access denied!"})

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any)=> {
    if(err) return res.status(403).json("Token is not valid")
    // @ts-ignore
    req.user = user
    next()
  })
};
