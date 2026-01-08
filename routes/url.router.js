import express from "express";
import { handleGenerateNewShortURL, historyOfShortUrl } from "../controlller/url.controller.js";

const router = express.Router()

router.post('/generate-url', handleGenerateNewShortURL) 
router.post('/history/:shortId',historyOfShortUrl)

export default router