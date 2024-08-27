'use client'
import React, { useState } from 'react'
import styles from "./Booking.module.css"
import DatePicker from '../../Components/DatePicker'
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton'
import { useRouter } from 'next/navigation'
import { useOmnipresence } from '@/app/Context/Omnipresent'
import Image from 'next/image'
const Booking = ({ name, _id }) => {
    const router = useRouter();
    const [Closing, setClosing] = useState(false)
    const [ClosingCross, setClosingCross] = useState(false)
    const [Unfilled, setUnfilled] = useState({
        name: false,
        concern: false,
        gender: false,
        phoneNumber: false
    });
    const { Notify } = useOmnipresence();
    const [Appointment, setAppointment] = useState({
        name: '',
        userId: '',
        doctor: {
            _id: _id,
            name: name
          },
        date_of_appointment: new Date(),
        concern: '',
        comment: '',
        gender: '',
        phoneNumber: '',
        address: {
            state: '',
            city: '',
            pincode: ''
        }
    });

    const handleDateChange = (date) => {
        setAppointment({ ...Appointment, date_of_appointment: date });
    };
    const handleSubmit = async (e) => {
        let updatedUnfilled = { ...Unfilled };

        if (Appointment.name === '') {
            console.log("name is empty");
            updatedUnfilled.name = true;
        }
        if (Appointment.concern === '') {
            console.log("concern is empty");
            updatedUnfilled.concern = true;
        }
        if (Appointment.phoneNumber === '') {
            console.log("phoneNumber is empty");
            updatedUnfilled.phoneNumber = true;
        }
        if (Appointment.gender === '') {
            console.log("gender is empty");
            updatedUnfilled.gender = true;
        }


        setUnfilled(updatedUnfilled);

        const response = await fetch("/Api/Appointment", { method: 'POST', body: JSON.stringify(Appointment), headers: { 'Content-Type': 'application/json' } })
        const data = await response.json();
        console.log(data)
        Notify({ message: data.message, status: data.success })
        console.log(Closing)
        console.log(Appointment)
        console.log(Unfilled)
        if (data.success) {
            setClosing(true)
            setTimeout(() => {
                router.back();
                console.log(Unfilled)
            }, 500);
        }
    }
    const handleFocus = (field) => {
        setUnfilled({ ...Unfilled, [field]: false });
    };
    const close = ()=>{
        setClosingCross(true)
        setTimeout(() => {
            router.back();
        }, 500);
    }
    return (
        <div className={`${styles.overlayBack} ${Closing ? styles.closing : ""} ${ClosingCross ? styles.closing : ""} `}>
            <div className={`${styles.modal} ${Closing ? styles.closing : ""} ${ClosingCross ? styles.crossclosing : ""}`}>
                <div className={styles.top}>
                    <div className={styles.title}>
                        <h2>Book your Appointment with</h2>
                        <h1>Dr.&nbsp;{name}</h1>
                    </div>
                    {/* <h1 className={styles.cross} onClick={close}>❌</h1> */}
                    {/* <Image className={styles.cross} onClick={close} src={'/icons8-cross-100.png'} alt="profile" width={40} height={40} priority /> */}
                    <ShinyRippleButton CustomDesign={styles.back} extraLeave={20} extraMove={60} ><Image className={styles.cross} onClick={close} src={'/icons8-multiply-100.png'} alt="profile" width={40} height={40} priority /></ShinyRippleButton>
                </div>
                <form>
                    <div className={styles.sections}>
                        <label htmlFor='Name'>Name</label>
                        <input className={Unfilled.name ? styles.focusedWorng : ''} type="text" id='Name' placeholder='Name' onFocus={() => handleFocus('name')} onChange={(e) => setAppointment({ ...Appointment, name: e.target.value })} />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='userId'>User-Id</label>
                        <input type="text" id='userId' placeholder='User-Id' onChange={(e) => setAppointment({ ...Appointment, userId: e.target.value })} />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='Gender'>Gender</label>
                        <select
                            className={Unfilled.gender ? styles.focusedWorng : ''}
                            name="Gender"
                            id='Gender'
                            defaultValue={''}
                            onFocus={() => handleFocus('gender')}
                            onChange={(e) => setAppointment({ ...Appointment, gender: e.target.value })}
                        >
                            <option value="" disabled >--- Select ---</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor="Date">Date</label>
                        <DatePicker
                            id='Date'
                            selectedDate={Appointment.date_of_appointment}
                            handleDateChange={(e) => handleDateChange(e)}
                        />
                    </div>
                    <div className={`${styles.sections} ${styles.full}`}>
                        <label htmlFor='Concern'>Concern</label>
                        <input className={Unfilled.concern ? styles.focusedWorng : ''} type="text" id='Concern' placeholder='Concern' onFocus={() => handleFocus('concern')} onChange={(e) => setAppointment({ ...Appointment, concern: e.target.value })} />
                    </div>
                    <div className={`${styles.sections} ${styles.full}`}>
                        <label htmlFor='Comment'>Comment</label>
                        <input type="text" id='Comment' placeholder='Comment' onChange={(e) => setAppointment({ ...Appointment, comment: e.target.value })} />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='Phone Number'>Phone Number</label>
                        <input className={Unfilled.phoneNumber ? styles.focusedWorng : ''} type="text" id='Phone Number' placeholder='Phone Number' onFocus={() => handleFocus('phoneNumber')} onChange={(e) => setAppointment({ ...Appointment, phoneNumber: e.target.value })} />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='State'>State</label>
                        <input type="text" id='State' placeholder='State' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, state: e.target.value } })} />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='City'>City</label>
                        <input type="text" id='City' placeholder='City' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, city: e.target.value } })} />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='Pin-code'>Pin-code</label>
                        <input type="text" id='Pin-code' placeholder='Pin-code' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, pincode: e.target.value } })} />
                    </div>
                    <ShinyRippleButton children={"Book"} CustomDesign={styles.subbtn} typeC='button' onClick={handleSubmit} extraLeave={200} extraMove={700} />
                </form>
            </div>
        </div>
    )
}

export default Booking
