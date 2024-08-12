import { NextResponse } from "next/server";
import ConnectDatabase from "../Connections/ConnectDatabase";
import { Doctordata } from "@/app/DatabaseAndFetching/Models/Doctor";

export async function POST(request) {
    ConnectDatabase();
    const search = await request.json()
    console.log(search)
    try {

        const doctorsName = await Doctordata.find({ name: { $regex: search.name, $options: 'i' } }).select("_id name field gender").limit(5)
        const doctorsField = await Doctordata.find({ field: { $regex: search.name, $options: 'i' } }).select("_id name field gender").limit(5)

        const combinedResults = [...doctorsName, ...doctorsField];
        const SearchedResults = combinedResults.reduce((acc, current) => {
            if (!acc.find(item => item._id.toString() === current._id.toString())) {
                acc.push(current);
            }
            return acc;
        }, []);
        return NextResponse.json({ SearchedResults, success: true })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}