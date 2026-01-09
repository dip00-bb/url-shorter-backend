import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },

    totalGenLink: {
        type: Number, default: 0
    },

    createdUrls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Url"
        }
    ]

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User