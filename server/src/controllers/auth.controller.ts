import bcryptjs from "bcryptjs"
import { Request, Response } from "express";

import { User } from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10)

  if (!username || !email || !password) {
    return res.sendStatus(400);
  }

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }

  

  res.status(201).json({ message: "User created successfully." });
};
