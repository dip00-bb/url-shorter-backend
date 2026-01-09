import { nanoid } from "nanoid";
import URL from "../models/Url.js";
import User from "../models/User.js";

export async function handleGenerateNewShortURL(req, res) {

    const body = req.body

    if (!body || !body.url) return res.status(400).json({ success: false, error: "Please provide an Url" })

    const shortId = nanoid(7)

    try {
        const url = await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: []
        })

        // console.log(req.userId)
        await User.updateOne({
            _id: req.userId
        }, {
            $push: {
                createdUrls: url._id
            }
        })

        return res.status(200).json({ success: true, message: "url generated" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "something went wrong" })
    }



}

export async function getUserUrls(req, res) {
    const userId = req.params.userId

    const user=await User.find({_id:userId}).populate('createdUrls')
    
    return res.status(200).json({urls:user[0]?.createdUrls})
}

export async function historyOfShortUrl(req, res) {
    const shortId = req.params.shortId


    const result = await URL.findOne({
        shortId
    })

    return res.json({
        totalClicks: result.visitHistory.length,
        history: result.visitHistory
    })
}