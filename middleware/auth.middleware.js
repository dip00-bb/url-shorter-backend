import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.config.js';


export async function authenticateUser(req, res,next) {
    console.log(req.cookies)
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json("unauthorize aceess")
    }

    try {
        const decodedToken = jwt.verify(token, authConfig.secret)
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        console.log("Authentication failed")
        res.status(500).json("Authentication failed")
    }

} 


export async function refreshtokenValidation(req, res,next) {
    cosnt
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json("no refresh token found")
    }

    try {
        const decodedToken = jwt.verify(refreshToken, authConfig.refresh_secret)
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        console.log("Refresh token authentication failed")
        res.status(500).json({message: "Invalid or expired refresh token"})
    }

} 

