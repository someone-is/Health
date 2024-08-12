import ConnectDatabase from "@/app/Api/Connections/ConnectDatabase";
import { Doctordata } from "../Models/Doctor";

export default async function GetDoctors() {
    ConnectDatabase();
    try {
        const doctors = await Doctordata.aggregate([{ $sample: { size: 5 } }])
        return { doctors: doctors}
    } catch (error) {
        return { message: "Failed to get the Doctor", doctors: null }
    }
}

export async function GetThatDoctor(docId) {
    ConnectDatabase();
    try {
        const doctor = await Doctordata.findById(docId)
        return {doctor: doctor}
    } catch (error) {
        return { result :error.message, message: "Failed to get the Doctor", doctors: null }
    }
}