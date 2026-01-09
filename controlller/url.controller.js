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
        const result = await User.updateOne({
            _id: req.userId,
            totalGenLink: { $lt: 5 }
        }, {
            $push: {
                createdUrls: url._id
            },
            $inc: {
                totalGenLink: 1
            }
        })

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "You have reached the maximum limit of 100 links." });
        }

        return res.status(200).json({ success: true, message: "url generated" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "something went wrong" })
    }



}

export async function getUserUrls(req, res) {
    try {
        const userId = req.params.userId

        const user = await User.find({ _id: userId }).populate('createdUrls')

        return res.status(200).json({ urls: user[0]?.createdUrls })
    } catch (error) {
        return res.status(500).json({ message: "server error please try again" })
    }
}

export async function deleteUrls(req, res) {
    try {
        const urlId = req.params.urlId
        console.log(urlId)
        const deletedUrl = await URL.findOneAndDelete({ _id: urlId });

        if (!deletedUrl) {
            return res.status(404).json({ message: "URL not found" });
        }

        await User.updateOne(
            { createdUrls: urlId },
            {
                $pull: { createdUrls: urlId },
                $inc: { totalGenLink: -1 }
            }
        );
        return res.status(200).json({ success: true, message: "Url deleted sucessfully" })
    } catch (error) {
        return res.status(500).json({ message: "can not delete url" })
    }
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