import express from "express";
import { handleLogout, handleUserLogin, handleUserRegister } from "../controlller/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";


const router = express.Router()

router.post('/register', handleUserRegister) 
router.post('/login', handleUserLogin)
router.post('/logout', authenticateUser ,handleLogout)

export default router 