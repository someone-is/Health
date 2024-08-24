import { User } from "@/app/DatabaseAndFetching/Models/User";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";
import ConnectDatabase from "../Connections/ConnectDatabase";
import bcrypt from 'bcryptjs'
import createOrUpdateAdminData from "@/app/DatabaseAndFetching/Models/SynconUpdateorCreate";


// To get all the Users
export async function GET() {
    await ConnectDatabase();
    // await mongoose.connect(process.env.MONGODB_URL, { dbName: "Project_Manage", })
    const data = await User.find();

    return NextResponse.json(data)
}

// To Create the User
export async function POST(request) {
    await ConnectDatabase();
    const { userId, name, password, as } = await request.json();
    const NewUser = new User({ userId, name, password, as });
    try {
        NewUser.password = bcrypt.hashSync(NewUser.password, parseInt(process.env.ENCRYPTION_SECRET))
        await NewUser.save();
        createOrUpdateAdminData(NewUser)

        // To revalidate data in the Manage User Page
        const reval = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Api/Revalidate?secret=${process.env.REVALIDATE_SECRET}`);
        const response = await reval.json();
        console.log("Revalidation",response)
        
        return NextResponse.json({result:"User Created", NewUser, status: true})
    } catch (error) {
        console.log(error)
        let errorMessage = "Failed to create User"
        if (error.code === 11000) {
            errorMessage = `User with ${userId} already exist` 
        }
        return NextResponse.json({ message: errorMessage, status: false })
    }
}

