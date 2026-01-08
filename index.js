import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

import urlRouter from './routes/url.router.js'

import { connectToDb } from './config/db.js'
import URL from './models/Url.js'

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/url', urlRouter)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry=await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp:Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL)
})


app.listen(process.env.PORT, () => {
    connectToDb()
    console.log("server is running on port", process.env.PORT)
})
