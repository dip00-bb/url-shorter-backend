import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";

export const connectToDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected database")
    } catch (error) {
        console.log(error)
    }
}
