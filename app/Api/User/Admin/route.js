// import jwt from 'jsonwebtoken'
import ConnectDatabase from '../../Connections/ConnectDatabase';
import { NextResponse } from 'next/server';
import { User } from '@/app/DatabaseAndFetching/Models/User';

export async function GET() {
    ConnectDatabase();
    try {

        const patient = await User.find({ as: "patient" }).select('-password');
        const doctor = await User.find({ as: "doctor" }).select('-password');
        const admin = await User.find({ as: "admin" }).select('-password');

        return NextResponse.json({ user: { admin, doctor, patient }, success: true })

    } catch (error) {
        return NextResponse.json({ message: "You must be logged in, as an ADMIN to be able to access this Url", Technical_message: error.message, success: false })
    }

}