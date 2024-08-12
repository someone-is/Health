import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    as: {
        type: String,
        enum: ["admin", "doctor", "patient"],
        default: "patient",
    },

}, { timestamps: true });

export const User = mongoose.models.Users || mongoose.model("Users", UserModel);

