import { nanoid } from "nanoid";
import URL from "../models/Url.js";

export async function handleGenerateNewShortURL(req, res) {

    const body = req.body

    if (!body || !body.url ) return res.status(400).json({success:false, error: "Please provide an Url" })

    const shortId = nanoid(7)

    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: []
        })
        return res.status(200).json({success:true,message:"url generated"})
    } catch (error) {
        return res.status(500).json({success:false,message:"something went wrong"})
    }



}

