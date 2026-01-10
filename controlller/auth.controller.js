import User from "../models/User.js"
import bcrypt from 'bcrypt'
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

        const accessToken = generateToken(user._id, authConfig.secret, authConfig.secret_expires_in, "15m")

        const refreshToken = generateToken(user._id, authConfig.refresh_secret, authConfig.refresh_secret_expires_in, "1d")


        await User.findOneAndUpdate(
            { email: email },
            { refreshToken: refreshToken }

        )

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email
        })


    } catch (error) {
        console.log("login failed", error)
        return res.status(500).json("login failed")
    }
}

export async function handleUserRegister(req, res) {
    const { username, email, password } = req.body


    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(409).json({ message: "email already in use" })

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.status(200).json({
            id: newUser._id,
            email: newUser.email,
            username: newUser.username
        })

    } catch (error) {
        console.error("Registration failed:", error);
        return res.status(500).json("Registration failed.");
    }
}

export async function handleLogout(req, res) {
    try {
        const userId = req?.userId

        if (userId) {
            await User.findOneAndUpdate(
                { _id: userId },
                { refreshToken: null }
            )
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "logout sucessfull" })
    } catch (error) {
        console.log("logout failded", error)
        return res.status(500).json("Logout failed")
    }
}

export async function handleRefreshToken(req, res) {
    try {
        const userId = req.userId
        const refreshToken = req.cookies.refreshToken


        const user = await User.findOne({ _id: userId })

        if (!user || !refreshToken) {
            return res.status(400).json({ message: "Refresh token not found" })

        }


        if (refreshToken !== user.refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }

        const newAccessToken = generateToken(userId, authConfig.secret, authConfig.secret_expires_in, "15m")

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000,  // 15 minutes
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({ message: "Access token refreshed successfully",user:{id:user._id,email:user.email,username:user.username} })
    } catch (error) {
        console.log("Refresh token failed", error)
        return res.status(500).json({ message: "Failed to refresh token" })
    }
}