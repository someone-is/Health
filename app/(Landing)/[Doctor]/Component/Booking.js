'use client'
import React from 'react'
import styles from "./Booking.module.css"
import DatePicker from '../../Components/DatePicker'
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton'
import { useRouter } from 'next/navigation'
const Booking = ({ name, _id }) => {
    const router = useRouter();

    const handleDateChange = (date) => {
        // setAppointment({ ...Appointment, date_of_appointment: date });
        console.log(date)
      };
    const handleSubmit=()=>{
        router.back();
    }
    return (
        <div className={styles.overlayBack}>
            <div className={styles.modal}>
                <h2>Book your Appointment with</h2>
                <h1>Dr.&nbsp;{name}</h1>
                <form>
                    <div className={styles.sections}>
                        <label htmlFor='Name'>Name</label>
                        <input type="text" id='Name' placeholder='Name' />
                    </div>
                    <div className={styles.sections}>
                    <label htmlFor="Date">Date</label>
                    <DatePicker
                        id='Date'
                        selectedDate={new Date()}
                        handleDateChange={handleDateChange}
                    />
                    </div>
                    <div className={`${styles.sections} ${styles.full}`}>
                        <label htmlFor='Concern'>Concern</label>
                        <input type="text" id='Concern' placeholder='Concern' />
                    </div>
                    <div className={`${styles.sections} ${styles.full}`}>
                        <label htmlFor='Comment'>Comment</label>
                        <input type="text" id='Comment' placeholder='Comment' />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='Phone Number'>Phone Number</label>
                        <input type="text" id='Phone Number' placeholder='Phone Number' />
                    </div>
                    <div className={styles.sections}>
                        <label htmlFor='State'>State</label>
                        <input type="text" id='State' placeholder='State' />
                    </div>
                    <div className={styles.sections}>

                        <label htmlFor='City'>City</label>
                        <input type="text" id='City' placeholder='City' />
                    </div>
                    <div className={styles.sections}>

                        <label htmlFor='Pin-code'>Pin-code</label>
                        <input type="text" id='Pin-code' placeholder='Pin-code' />
                    </div>
                    <ShinyRippleButton children={"Book"} CustomDesign={styles.subbtn} typeC='button' onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    )
}

export default Booking
