import { nanoid } from "nanoid";
import URL from "../models/Url";

export async function handleGenerateNewShortURL(req, res) {

    const body = req.body

    if(!body) return res.status(400).json({error:"Please provide an Url"})

    const shortId = nanoid(7)

    await URL.create({
        shortId: shortId,
        redirectURL:body.url,
        visitHistory:[]
    })
} 

