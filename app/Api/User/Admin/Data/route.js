import ConnectDatabase from "@/app/Api/Connections/ConnectDatabase"
import { Admindata } from "@/app/DatabaseAndFetching/Models/Admin"
import { User } from "@/app/DatabaseAndFetching/Models/User";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function GET(request) {
    ConnectDatabase();
    const token = request.cookies.get("Login Token")?.value
    try {
        const cookiedata = jwt.verify(token, process.env.JWT_CODE)
        if (cookiedata.as === 'admin') {
            const userdata = await Admindata.findOne({ userId: cookiedata._id })
            return NextResponse.json({ admindata: userdata, message: `${cookiedata.as}Data Received`, success: true })
        } else {
            return NextResponse.json({ meaasge: 'User must be admin', success: false })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}

export async function PUT(request) {
    ConnectDatabase();
    const token = request.cookies.get("Login Token")?.value
    const dataprovided = await request.json();

    try {
        const cookiedata = jwt.verify(token, process.env.JWT_CODE)
        if (cookiedata.as === 'admin') {

            await Admindata.findOneAndUpdate({ userId: cookiedata._id },
                dataprovided,
                { upsert: true, new: true },
            )
            await User.findOneAndUpdate({ userId: cookiedata._id },
                { name: dataprovided.name },
                { upsert: true },
            )
            return NextResponse.json({ message: 'Updated Data Successfully', success: true })
        } else {
            return NextResponse.json({ message: 'User must be admin', success: false })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}

export async function POST(request) {
    ConnectDatabase();
    const token = request.cookies.get("Login Token")?.value
    const { passkey } = await request.json();
    try {
        const cookiedata = jwt.verify(token, process.env.JWT_CODE)
        if (cookiedata.as === "admin") {
            const data = await Admindata.findOne({ userId: cookiedata._id })
            if (data.passkey === passkey) {
                return NextResponse.json({ message: "Successfully Verified", success: true })
            }
            else {
                return NextResponse.json({ message: "Incorrect Pin", success: false })
            }
        }
        return NextResponse.json({ message: "You must be an admin", success: false })

    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }

}