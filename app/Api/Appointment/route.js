import { Appointments } from "@/app/DatabaseAndFetching/Models/Appointments";
import ConnectDatabase from "../Connections/ConnectDatabase";
import { NextResponse } from "next/server";
import Cookiechecker from "@/app/DatabaseAndFetching/Forverification/Auth";
import { Doctordata } from "@/app/DatabaseAndFetching/Models/Doctor";

export async function GET(request) {
    const token = request.cookies.get("Login Token")?.value
    const user = await Cookiechecker(token)
    ConnectDatabase();
    try {
        if (user.as === 'admin') {
            console.log("Its Admin")
            const appointment = await Appointments.find()
            return NextResponse.json({ appointment, message: "Successfully received the Appointment", success: true })
        }
        if (user.as === 'doctor') {
            console.log("Its Doctor")
            const userrr = await Doctordata.find({ userId: user._id }).select("_id")
            const appointment_with_patient = await Appointments.find({ doctor: userrr[0]._id })
            const appointment = await Appointments.find({ userId: user._id })
            return NextResponse.json({ appointment_with_patient, appointment, message: "Successfully received the Appointment", success: true })
        }
        if (user.as === 'patient') {
            console.log("Its Patient")
            const appointment = await Appointments.find({ userId: user._id })
            return NextResponse.json({ appointment, message: "Successfully received the Appointment", success: true })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}

export async function POST(request) {
    
    ConnectDatabase();
    const appointment = await request.json();
    try {
        const booking = new Appointments(appointment)
        await booking.save();
        console.log(booking, appointment)
        return NextResponse.json({ booking, message: "Your Appointment has been Posted", success: true })

    } catch (error) {
        return NextResponse.json({ result: error.message, message: "Faild to book an Appointment", success: false })
    }
}