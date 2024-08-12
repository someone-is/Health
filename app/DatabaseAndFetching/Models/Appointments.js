import mongoose from 'mongoose';

const AppointmentsModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    doctor: {
        type: mongoose.ObjectId,
    },
    date_of_appointment: {
        type: Date,
        required: true,
    },
    concern: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
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
        required: true,
    }
}, { timestamps: true });

export const Appointments = mongoose.models.Appointments || mongoose.model("Appointments", AppointmentsModel);

