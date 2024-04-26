import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller";


const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signout)

export default router