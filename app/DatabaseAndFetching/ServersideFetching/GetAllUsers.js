import { cookies } from "next/headers";
import { User } from "../Models/User";
import ConnectDatabase from "../../Api/Connections/ConnectDatabase";
import Cookiechecker from "../Forverification/Auth";

export default async function GetAllUsers() {
    const cookie = cookies();
    const token = cookie.get("Login Token")?.value;
    ConnectDatabase();
    try {
        const reqUser = await Cookiechecker(token)
        if (reqUser && reqUser.as === 'admin') {
            const admin = await User.find({ as: "admin" }).select("-password")
            const doctor = await User.find({ as: "doctor" }).select("-password")
            const patient = await User.find({ as: "patient" }).select("-password")
            // console.log({ admin: admin, doctor: doctor, patient: patient })
            return { user: { admin, doctor, patient }, success: true }
        }
    } catch (error) {
        console.log("Failed to get the users", error.message)
        return { users: null }
    }
}