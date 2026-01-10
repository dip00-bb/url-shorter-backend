import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

import urlRouter from './routes/url.router.js'
import authRouter from './routes/auth.router.js'


import URL from './models/Url.js'
import { dbMiddleware } from './middleware/db.middleware.js'

app.use(cors({
    origin: [
        "http://localhost:3000",

        "https://dip00-bb-url-shorter-frontend.vercel.app"],
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())

app.use(dbMiddleware)


app.get('/', (req, res) => {
    res.status(200).json("welcome to shorter")
})



app.use('/api/url', urlRouter)
app.use('/api/auth', authRouter)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL)
})





export default app;