import { Router } from "express";
import { getHomepage, loginUser, addUser, getUsers, checkUser, getadmin } from "../Controllers/userController";
import { VerifyToken } from "../Middleware/VerifyToken";

const router =Router()


router.post('/login',loginUser)
router.post('/signup', addUser)
router.get('/check',VerifyToken,checkUser)
router.get('/all', getUsers)
router.get('/admin', getadmin)

export default router