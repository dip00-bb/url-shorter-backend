import express from "express";
import { handleGenerateNewShortURL } from "../controlller/url.controller.js";

const router = express.Router()

router.post('/generate-url', handleGenerateNewShortURL) 


export default router