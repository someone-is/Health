import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

const ConnectDatabase = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Database is already Connected")
        return NextResponse.json("Database is already Connected")
    }
    else{
        await mongoose.connect(process.env.MONGODB_URL, { dbName: process.env.BASE_NAME, })
        console.log("Database Connected")
        return NextResponse.json("Database Connected")
    }
}

export default ConnectDatabase