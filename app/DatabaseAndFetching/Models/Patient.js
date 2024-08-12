import mongoose from 'mongoose';

const PatientModel = new mongoose.Schema({
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
    phoneNumber: {
        type: Number,
    },
}, { timestamps: true });

export const Patientdata = mongoose.models.Patientdata || mongoose.model("Patientdata", PatientModel);
