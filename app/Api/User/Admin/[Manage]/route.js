import ConnectDatabase from "@/app/Api/Connections/ConnectDatabase";
import { Admindata } from "@/app/DatabaseAndFetching/Models/Admin";
import { Doctordata } from "@/app/DatabaseAndFetching/Models/Doctor";
import { Patientdata } from "@/app/DatabaseAndFetching/Models/Patient";
import { User } from "@/app/DatabaseAndFetching/Models/User";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    ConnectDatabase();
    console.log(params)
    const { Manage } = params;
    const { as } = await request.json();
    console.log("route from body :-", as)
    try {
        const finduser = await User.findById(Manage);
        let previousrole
        if (as !== undefined) {
            previousrole = finduser.as;
            finduser.as = as;
        }
        const updatedUser = await finduser.save();
        await Updateingdata(updatedUser, previousrole);
        return NextResponse.json({ result: `${finduser.name} has Successfully Updated as ${as}`, updatedUser, status: true })

    } catch (error) {
        return NextResponse.json({ message: "Couldn't Update the details", RealProblem: error.message, status: false })
    }
}
const Updateingdata = async (user, previousRole) => {
   
    if (user.as === 'admin') {
        let prevdata = {}
        if (previousRole === 'admin') {
            prevdata = await Admindata.findOne({ userId: user.userId })
          
            await Admindata.findOneAndDelete({ userId: user.userId });
        }
        if (previousRole === 'doctor') {
            prevdata = await Doctordata.findOne({ userId: user.userId })
            
            await Doctordata.findOneAndDelete({ userId: user.userId });
        }
        if (previousRole === 'patient') {
            prevdata = await Patientdata.findOne({ userId: user.userId })
            await Patientdata.findOneAndDelete({ userId: user.userId });
        }
        const adminData = {
            userId: user.userId,
            name: user.name,
            address: prevdata?.address, // Add logic to get address
            gender: prevdata?.gender, // Add logic to get gender
            phoneNumber: prevdata?.phoneNumber, // Add logic to get phone number
        };
        await Admindata.findOneAndUpdate(
            { userId: user.userId },
            adminData,
            { upsert: true, new: true }
        );
    }
    if (user.as === "doctor") {
        let prevdata = {}
        if (previousRole === 'admin') {
            prevdata = await Admindata.findOne({ userId: user.userId })
                        await Admindata.findOneAndDelete({ userId: user.userId });
        }
        if (previousRole === 'doctor') {
            prevdata = await Doctordata.findOne({ userId: user.userId })
                        await Doctordata.findOneAndDelete({ userId: user.userId });
        }
        if (previousRole === 'patient') {
            prevdata = await Patientdata.findOne({ userId: user.userId })
                        await Patientdata.findOneAndDelete({ userId: user.userId });
        }
        const doctorData = {
            userId: user.userId,
            name: user.name,
            address: prevdata?.address,
            gender: prevdata?.gender,
            phoneNumber: prevdata?.phoneNumber,
        }
        await Doctordata.findOneAndUpdate(
            { userId: user.userId },
            doctorData,
            { upsert: true, new: true }
        )
    }
    if (user.as === "patient") {
        let prevdata = {}
        if (previousRole === 'admin') {
            prevdata = await Admindata.findOne({ userId: user.userId })
            await Admindata.findOneAndDelete({ userId: user.userId });
        }
        if (previousRole === 'doctor') {
            prevdata = await Doctordata.findOne({ userId: user.userId })
            
            await Doctordata.findOneAndDelete({ userId: user.userId });
        }
        if (previousRole === 'patient') {
            prevdata = await Patientdata.findOne({ userId: user.userId })
            
            await Patientdata.findOneAndDelete({ userId: user.userId });
        }
        const patientData = {
            userId: user.userId,
            name: user.name,
            address: prevdata?.address,
            gender: prevdata?.gender,
            phoneNumber: prevdata?.phoneNumber,
        }
        await Patientdata.findOneAndUpdate(
            { userId: user.userId },
            patientData,
            { upsert: true, new: true }
        )
    }
}
