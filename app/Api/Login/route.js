import { User } from "@/app/DatabaseAndFetching/Models/User";
import { NextResponse } from "next/server";
import ConnectDatabase from "../Connections/ConnectDatabase";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export async function POST(request) {
    await ConnectDatabase();
    const { userId, password } = await request.json();

    try {
        const Userindb = await User.findOne({ userId: userId })
        if (!Userindb) {
            throw new Error("Either User-id or Password is Incorrect")
            // return NextResponse.json({result:"Either User-id or Password is Incorrect", success: false})
        }
        else {
            if (bcrypt.compareSync(password, Userindb.password)) {
                const token = jwt.sign({ _id: Userindb.userId, name: Userindb.name, as: Userindb.as }, process.env.JWT_CODE)
                const response = NextResponse.json({ result: `${Userindb.name} has Logged in`, success: true })
                // response.cookies.set("Login Token", token,{expiresIn: 10})
                response.cookies.set("Login Token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                    // maxAge: 10,  // 10sec in seconds
                    domain: process.env.DOMAIN_URL,  // Ensure domain is correct
                    maxAge: 24 * 60 * 60,  // 1 day in seconds
                    sameSite: 'Lax',  // Adjust to 'Strict' or 'None' if necessary
                });
                return response
            }
            else {
                throw new Error("Incorrect Password")
                // return NextResponse.json({result:"Incorrect Password", success: false})
            }

        }

    } catch (error) {
        // console.log(error)
        return NextResponse.json({ message: error.message, success: false })
    }
}
