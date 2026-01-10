import { connectToDb } from "../config/db";


export const dbMiddleware = async (req, res, next) => {
    try {
        await connectToDb();
        next(); 
    } catch (error) {
        console.error("DB middleware error:", error);
        return res.status(500).json({ message: "Database connection failed" });
    }
};
