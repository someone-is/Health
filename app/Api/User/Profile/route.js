import { User } from "@/app/DatabaseAndFetching/Models/User"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import ConnectDatabase from "../../Connections/ConnectDatabase"

export async function GET(request) {

    ConnectDatabase();
try {
    const token = request.cookies.get("Login Token")?.value
    const cookiedata = jwt.verify(token, process.env.JWT_CODE)
    const LoggedinUser = await User.findOne({ userId: cookiedata._id }).select("-password") 
    return NextResponse.json(LoggedinUser,{success:true})
} catch (error) {
    return NextResponse.json({message:error.message, success:false})
}

}