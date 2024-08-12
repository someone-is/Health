import { Appointments } from "@/app/DatabaseAndFetching/Models/Appointments";
import ConnectDatabase from "../Connections/ConnectDatabase";
import { NextResponse } from "next/server";

export async function GET(request) {
    ConnectDatabase();
    try {
        const appointment = await Appointments.find()
        return NextResponse.json({ appointment, message: "Successfully received the Appointment", success: true })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}

export async function POST(request) {
    const appointment = await request.json();
    try {
        const booking = new Appointments(appointment)
        await booking.save();
        console.log(booking,appointment)
        return NextResponse.json({ booking, message: "Your Appointment has been Posted", success: true })

    } catch (error) {
        return NextResponse.json({ result: error.message, message: "Faild to book an Appointment", success: false })
    }
}