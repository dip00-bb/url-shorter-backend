import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDb } from './config/db.js'

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})) 
app.use(express.json())
app.use(cookieParser())




app.listen(process.env.PORT, () => {
    connectToDb()
    console.log("server is running on port", process.env.PORT)
})
