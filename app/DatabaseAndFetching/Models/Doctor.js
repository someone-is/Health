import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
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
    field: {
        type: String,
    },
    bio: {
        type: String,
    }

}, { timestamps: true });
export const Doctordata = mongoose.models.Doctordata || mongoose.model("Doctordata", DoctorSchema);
