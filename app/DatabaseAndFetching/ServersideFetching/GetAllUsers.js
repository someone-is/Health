import { cookies } from "next/headers";
import { User } from "../Models/User";
import ConnectDatabase from "../../Api/Connections/ConnectDatabase";
import Cookiechecker from "../Forverification/Auth";

export default async function GetAllUsers() {
    const cookie = cookies();
    const token = cookie.get("Login Token")?.value;
    ConnectDatabase();
    try {
        const user = await Cookiechecker(token)
        if (user && user.as === 'admin') {
            const admin = await User.find({ as: "admin" }).select("-password")
            const doctor = await User.find({ as: "doctor" }).select("-password")
            const patient = await User.find({ as: "patient" }).select("-password")
            // console.log({ admin: admin, doctor: doctor, patient: patient })
            return { admin: admin, doctor: doctor, patient: patient }
        }
    } catch (error) {
        console.log("failed to get the users",error.message)
        return { admin: null, doctor: null, patient: null }
    }
}