import { Admindata } from './Admin';
import { Doctordata } from './Doctor';
import { Patientdata } from './Patient';

const createOrUpdateAdminData = async (user) => {

    if (user.as === 'admin') {
        const adminData = {
            userId: user.userId,
            name: user.name,
            address: '', // Add logic to get address
            gender: '', // Add logic to get gender
            phoneNumber: '' // Add logic to get phone number
        };

        await Admindata.findOneAndUpdate(
            { userId: user.userId },
            adminData,
            { upsert: true, new: true }
        );
    }
    if (user.as === 'doctor') {
        const doctorData = {
            userId: user.userId,
            name: user.name,
            address: '', // Add logic to get address
            gender: '', // Add logic to get gender
            phoneNumber: '' // Add logic to get phone number
        };

        await Doctordata.findOneAndUpdate(
            { userId: user.userId },
            doctorData,
            { upsert: true, new: true }
        );
    }
    if (user.as === 'patient') {
        const patientData = {
            userId: user.userId,
            name: user.name,
            address: '', // Add logic to get address
            gender: '', // Add logic to get gender
            phoneNumber: '' // Add logic to get phone number
        };

        await Patientdata.findOneAndUpdate(
            { userId: user.userId },
            patientData,
            { upsert: true, new: true }
        );
    }
};
export default createOrUpdateAdminData