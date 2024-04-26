import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import bcryptjs from "bcryptjs"
import { User } from "../models/user.model";

export const test = (req: Request, res: Response) => {
  res.json({
    message: "API not working",
  });
};


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if(req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account."))
  }
  try {
    if(req.body.password) {
      req.body.password = bcryptjs.hash(req.body.password, 10)
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    },
    { new: true }
    )

    // @ts-ignore
    const { password, ...rest } = updateUser?._doc

    res.status(200).json(updateUser)
  } catch (error) {
    next(error)
  }
}