import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})) 

app.listen(process.env.PORT, () => {
    console.log("server is running on port", process.env.PORT)
})
