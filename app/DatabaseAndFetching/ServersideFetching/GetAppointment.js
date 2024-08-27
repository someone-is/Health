import { cookies } from "next/headers"
import ConnectDatabase from "../../Api/Connections/ConnectDatabase";
import { Doctordata } from "../Models/Doctor";
import Cookiechecker from "../Forverification/Auth";
import { Appointments } from "../Models/Appointments";

export default async function GetAppointment() {
    ConnectDatabase();
    const cookie = cookies();
    const token = cookie.get('Login Token')?.value;
    if (!token) {
        return { user: null }
    }
    try {
        const user = await Cookiechecker(token);
        if (user.as === 'admin') {
            console.log("Its Admin")
            const appointment = await Appointments.find().sort({ updatedAt: -1 })
            return { appointment, message: "Successfully received the Appointment", success: true }
        }
        if (user.as === 'doctor') {
            console.log("Its Doctor")
            const userrr = await Doctordata.find({ userId: user._id }).select("_id")
            const appointment_with_patient = await Appointments.find({ 'doctor._id': userrr[0]._id }).sort({ updatedAt: -1 });
            const appointment = await Appointments.find({ userId: user._id })
            console.log(appointment)
            return { appointment_with_patient, appointment, message: "Successfully received the Appointment", success: true }
        }
        if (user.as === 'patient') {
            console.log("Its Patient")
            const appointment = await Appointments.find({ userId: user._id }).sort({ updatedAt: -1 })
            return { appointment, message: "Successfully received the Appointment", success: true }
        }
    } catch (error) {
        return { appointment: null, appointment_with_patient: null, message: error.message, status: false }
    }
}

