import mongoose, { models } from "mongoose";
import { Story } from "./Story";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    image: {
        type: String,
        default: "/images/user.png"
    },
    stories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ],
    drafts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ],
    readings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ],
    likedstories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
}, { timestamps: true });

export const User = models?.User || mongoose.model("User", userSchema);