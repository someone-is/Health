import { Doctordata } from '@/app/DatabaseAndFetching/Models/Doctor';
import { User } from '@/app/DatabaseAndFetching/Models/User';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
import ConnectDatabase from '../../Connections/ConnectDatabase';

export async function GET(request) {
    ConnectDatabase();
    const token = request.cookies.get("Login Token")?.value;
    try {
        const cookiedata = jwt.verify(token, process.env.JWT_CODE);
        if (cookiedata.as === 'doctor') {
            const userdata = await Doctordata.findOne({ userId: cookiedata._id })
            return NextResponse.json({ doctordata: userdata, message: `${cookiedata.as}Data Received`, success: true })
        } else {
            return NextResponse.json({ message: 'User must be doctor', success: false})
        }

    } catch (error) {
        return NextResponse.json({ message: error.message, success: true })
    }
}

export async function PUT(request) {
    ConnectDatabase();
    const token = request.cookies.get("Login Token")?.value
    const dataprovided = await request.json();

    try {
        const cookiedata = jwt.verify(token, process.env.JWT_CODE)
        if (cookiedata.as === 'doctor') {

            await Doctordata.findOneAndUpdate({ userId: cookiedata._id },
                dataprovided,
                { upsert: true, new: true },
            )
            await User.findOneAndUpdate({ userId: cookiedata._id },
                { name: dataprovided.name },
                { upsert: true },
            )
            return NextResponse.json({ message: 'Updated Data Successfully', success: true })
        } else {
            return NextResponse.json({ message: 'User must be doctor', success: false })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}