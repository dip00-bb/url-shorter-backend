import express from "express";
import { getUserUrls, handleGenerateNewShortURL, historyOfShortUrl } from "../controlller/url.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/generate-url',authenticateUser, handleGenerateNewShortURL) 
router.post('/history/:shortId',historyOfShortUrl)
router.post('/user/:userId',getUserUrls)
export default router