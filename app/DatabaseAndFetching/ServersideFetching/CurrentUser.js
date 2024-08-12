// import Cookiechecker from "@/Forverification/Auth";
import { cookies } from "next/headers"
import { User } from "../Models/User";
import ConnectDatabase from "../../Api/Connections/ConnectDatabase";
import { Admindata } from "../Models/Admin";
import { Doctordata } from "../Models/Doctor";
import { Patientdata } from "../Models/Patient";
import Cookiechecker from "../Forverification/Auth";

export default async function CurrentUser() {
    ConnectDatabase();
    const cookie = cookies();
    const token = cookie.get('Login Token')?.value;
    if (!token) {
        return { user: null }
    }
    try {
        const user = await Cookiechecker(token);
        const LoggedinUser = await User.findOne({ userId: user._id }).select("-password")
        let UserData
        if (LoggedinUser.as === 'admin') {
            UserData = await Admindata.findOne({ userId: LoggedinUser.userId })
        }
        if (LoggedinUser.as === 'doctor') {
            UserData = await Doctordata.findOne({ userId: LoggedinUser.userId })
        }
        if (LoggedinUser.as === 'patient') {
            UserData = await Patientdata.findOne({ userId: LoggedinUser.userId })
        }
        return { user: LoggedinUser, Userdata: UserData }
    } catch (error) {
        return { user: null, Userdata: null }
    }
}

