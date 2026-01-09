import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from "../config/auth.config.js"
import { generateToken } from "../utils/generateToken.js"


export async function handleUserLogin(req, res) {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "Invalid credentials." })

        const isPasswordValid = await bcrypt.compare(password, user.password)


        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." })
        }

        const accessToken = generateToken(user.id, authConfig.secret, authConfig.secret_expires_in, "15m")

        const refreshToken = generateToken(user.id, authConfig.refresh_secret, authConfig.refresh_secret_expires_in, "1d")

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000,
            sameSite: "strict"
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict"
        });

        return res.status(200).json( {
            id:user.id,
            username:user.username,
            email:user.email
        })


    } catch (error) {
        console.log("login failed",error)
        return res.status(500).json("login failed")
    }
} 


export async function handleUserRegister(req,res){
    const {username,email,password}=req.body


    try {
        const existingUser=await User.findOne({email})

        if(existingUser) return res.status(409).json({message:"email already in use"})
         
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser=await User.create({
            username:username,
            email:email,
            password:password
        })

        return res.status(200).json({
            id:newUser.id,
            email:newUser.email,
            username:newUser.username
        })

    } catch (error) {
        console.error("Registration failed:", error);
        return res.status(500).json("Registration failed.");
    }
}