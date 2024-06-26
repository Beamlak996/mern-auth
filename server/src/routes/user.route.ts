import express from "express"
import { deleteUser, test, updateUser } from "../controllers/user.controller"
import { verifyToken } from "../utils/verify-user"

const router = express.Router()

router.get('/', test)
router.post("/update/:id", verifyToken, updateUser)
router.delete("/delete/:id", verifyToken, deleteUser)

export default router