import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        pincode: {
            type: Number,
        }
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    passkey_length:{
        type:Number,
        enum:[4,6],
        default: 4,
    },
    passkey:{
        type: String,
    },
    phoneNumber: {
        type: Number,
    }
}, { timestamps: true });

export const Admindata = mongoose.models.Admindata || mongoose.model("Admindata", AdminSchema);

