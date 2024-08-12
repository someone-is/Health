'use client'
import React, { useState } from 'react'
import styles from './Form.module.css'
import Searched from './Searched'
import DatePicker from './DatePicker'
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton'
const HomePageForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [doctorcover, setdoctorcover] = useState('')
  const [Appointment, setAppointment] = useState({
    name: '',
    userId: '',
    doctor: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/Api/Appointment", { method: 'POST', body: JSON.stringify(Appointment), headers: { 'Content-Type': 'application/json' } })
    const data = await response.json();
    console.log(data)
  }
  const handleDateChange = (date) => {
    setAppointment({ ...Appointment, date_of_appointment: date });
  };
  return (
    <form className={styles.form} action="">
      <div className={styles.formsection}>
        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" placeholder="Name" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, name: e.target.value })} />
      </div>
      <div className={styles.formsection}>
        <label htmlFor="userId">User-Id</label>
        <input type="text" id="userId" placeholder="User-Id" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, userId: e.target.value })} />
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Doctor">Doctor</label>
        <input type="text" id="Doctor" placeholder="Doctor" autoComplete='off' onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => { setIsFocused(false) }, 400)} value={doctorcover} onChange={(e) => setdoctorcover(e.target.value)} />

        {isFocused && <Searched search={doctorcover} setDoc={setAppointment} setIsFocused={setIsFocused} Appointment={Appointment} setdoctorcover={setdoctorcover} />}
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Date">Date</label>

        <DatePicker
          id='Date'
          selectedDate={Appointment.date_of_appointment}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className={`${styles.formsection} ${styles.Fullwidth}`}>
        <label htmlFor="Concern">Concern</label>
        <input type="text" id="Concern" placeholder="Concern" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, concern: e.target.value })} />
      </div>
      <div className={`${styles.formsection} ${styles.Fullwidth}`}>
        <label htmlFor="Comment">Comment</label>
        <textarea type="text" id="Comment" rows={5} style={{ resize: "vertical", whiteSpace: 'pre-wrap' }} placeholder="Comment" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, comment: e.target.value })} />
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Gender">Gender</label>

        <select
          name="Gender"
          id='Gender'
          defaultValue={''}
          onChange={(e) => setAppointment({ ...Appointment, gender: e.target.value })}
        >
          <option value="" disabled >--- Select ---</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Phone Number">Phone Number</label>
        <input type="text" id="Phone Number" placeholder="Phone Number" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, phoneNumber: e.target.value })} />
      </div>
      <div className={`${styles.formsection} ${styles.Fullwidth}`}>
        <p>Address</p>
        <div className={styles.SubSection}>
          <div className={styles.addsec}>
            <label htmlFor="State">State</label>
            <input type="text" id="State" placeholder="State" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, state: e.target.value } })} />
          </div>
          <div className={styles.addsec}>
            <label htmlFor="City">City</label>
            <input type="text" id="City" placeholder="City" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, city: e.target.value } })} />
          </div>
          <div className={styles.addsec}>
            <label htmlFor="Pincode">Pincode</label>
            <input type="text" id="Pincode" placeholder="Pincode" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, pincode: e.target.value } })} />
          </div>
        </div>
      </div>
      <div className={`${styles.formsection} ${styles.Fullwidth}`}>
        <ShinyRippleButton children="Book Your Appointment" extraLeave={200} extraMove={1200} onClick={(e) => handleSubmit(e)} />
      </div>
    </form>
  )
}

export default HomePageForm
