import bcryptjs from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";
import { errorHandler } from "../utils/error";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
  } catch (error: any) {
    return next(error);
  }

  res.status(201).json({ message: "User created successfully." });
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password!);
    if (!validPassword)
      return next(errorHandler(401, "Email or password is incorrect!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!);
    // @ts-ignore
    const { password: hashedPassword, ...rest } = validUser._doc;

    const expireDate = new Date(Date.now() + 3600000);

    res
      .cookie("access_token", token, { httpOnly: true, expires: expireDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const signout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("access_token").status(200).json('Signout success')
}