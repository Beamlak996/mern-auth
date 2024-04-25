import bcryptjs from "bcryptjs"
import { Request, Response, NextFunction } from "express";

import { User } from "../models/user.model";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10)

  if (!username || !email || !password) {
    return res.sendStatus(400);
  }

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
  } catch (error: any) {
    return next(error)
  }

  

  res.status(201).json({ message: "User created successfully." });
};
