import express, { Request, Response } from "express"
import { test } from "../../controllers/user.controller"

const router = express.Router()

router.get('/', test)

export default router