import express from "express";
import { deleteUrls, getUserUrls, handleGenerateNewShortURL, historyOfShortUrl } from "../controlller/url.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/generate-url', authenticateUser, handleGenerateNewShortURL)
router.post('/history/:shortId', historyOfShortUrl)
router.post('/urls/:userId', getUserUrls)
router.delete('/:urlId', deleteUrls)

export default router