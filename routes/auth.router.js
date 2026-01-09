import express from "express";
import { handleLogout, handleRefreshToken, handleUserLogin, handleUserRegister } from "../controlller/auth.controller.js";
import { authenticateUser, refreshtokenValidation } from "../middleware/auth.middleware.js";
import { getUserUrls } from "../controlller/url.controller.js";


const router = express.Router()

router.post('/register', handleUserRegister) 
router.post('/login', handleUserLogin)
router.post('/logout', authenticateUser ,handleLogout)
router.post('/refresh-token',refreshtokenValidation,handleRefreshToken)

export default router 