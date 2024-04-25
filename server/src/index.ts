import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route"
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Mongo Db error", error);
  });

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(3000, ()=> {
  console.log("Server is listening on port 3000")
});

app.use("/api/user", userRoutes)