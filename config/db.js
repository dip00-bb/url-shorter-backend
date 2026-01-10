import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, 
    });

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
