import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

import urlRouter from './routes/url.router.js'

import { connectToDb } from './config/db.js'

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})) 
app.use(express.json())
app.use(cookieParser())


app.use('/api/url',urlRouter)

app.listen(process.env.PORT, () => {
    connectToDb()
    console.log("server is running on port", process.env.PORT)
})
