import express from "express";
import { deleteUrls, getUserUrls, handleGenerateNewShortURL, historyOfShortUrl } from "../controlller/url.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/generate-url', authenticateUser, handleGenerateNewShortURL)
router.post('/history/:shortId', historyOfShortUrl)
router.get('/urls/:userId', getUserUrls)
router.delete('/delete-url/:urlId', deleteUrls)

export default router