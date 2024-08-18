'use client'
import React, { useState } from 'react'
import styles from './Form.module.css'
import Searched from './Searched'
import DatePicker from './DatePicker'
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton'
import { useOmnipresence } from '@/app/Context/Omnipresent'
const HomePageForm = () => {
  const { Notify } = useOmnipresence();
  const [isFocused, setIsFocused] = useState(false);
  const [doctorcover, setdoctorcover] = useState('')
  const [Unfilled, setUnfilled] = useState({
    name: false,
    concern: false,
    doctor: false,
    gender: false,
    phoneNumber: false
  });
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
    Notify({ message: data.message, status: data.success })
    let updatedUnfilled = { ...Unfilled };

    if (Appointment.name === '') {
      console.log("name is empty");
      updatedUnfilled.name = true;
    } else {
      updatedUnfilled.name = false;
    }
    if (Appointment.doctor === '') {
      console.log("doctor is empty");
      updatedUnfilled.doctor = true;
    } else {
      updatedUnfilled.doctor = false;
    }
    if (Appointment.concern === '') {
      console.log("concern is empty");
      updatedUnfilled.concern = true;
    } else {
      updatedUnfilled.concern = false;
    }
    if (Appointment.phoneNumber === '') {
      console.log("phoneNumber is empty");
      updatedUnfilled.phoneNumber = true;
    } else {
      updatedUnfilled.phoneNumber = false;
    }
    if (Appointment.gender === '') {
      console.log("gender is empty");
      updatedUnfilled.gender = true;
    } else {
      updatedUnfilled.gender = false;
    }

    setUnfilled(updatedUnfilled);

    if (data.success) {
      setAppointment({
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
      }})
      setdoctorcover('')
    }
    console.log(data)
  }

  const handleFocus = (field) => {
    setUnfilled({ ...Unfilled, [field]: false });
};

  const handleDateChange = (date) => {
    setAppointment({ ...Appointment, date_of_appointment: date });
  };
  return (
    <form className={styles.form} action="">
      <div className={styles.formsection}>
        <label htmlFor="Name">Name</label>
        <input className={Unfilled.name ? styles.focusedWorng : ''} type="text" id="Name" placeholder="Name" autoComplete='off' onFocus={() => handleFocus('name')} onChange={(e) => setAppointment({ ...Appointment, name: e.target.value })} value={Appointment.name}/>
      </div>
      <div className={styles.formsection}>
        <label htmlFor="userId">User-Id</label>
        <input type="text" id="userId" placeholder="User-Id" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, userId: e.target.value })} />
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Doctor">Doctor</label>
        <input className={Unfilled.doctor ? styles.focusedWorng : ''} type="text" id="Doctor" placeholder="Doctor" autoComplete='off' onFocus={() => {setIsFocused(true);handleFocus('doctor')} } onBlur={() => setTimeout(() => { setIsFocused(false) }, 400)} value={doctorcover} onChange={(e) => setdoctorcover(e.target.value)} />

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
        <input className={Unfilled.concern ? styles.focusedWorng : ''} type="text" id="Concern" placeholder="Concern" autoComplete='off' onFocus={() => handleFocus('concern')} onChange={(e) => setAppointment({ ...Appointment, concern: e.target.value })} value={Appointment.concern}/>
      </div>
      <div className={`${styles.formsection} ${styles.Fullwidth}`}>
        <label htmlFor="Comment">Comment</label>
        <textarea type="text" id="Comment" rows={5} style={{ resize: "vertical", whiteSpace: 'pre-wrap' }} placeholder="Comment" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, comment: e.target.value })} value={Appointment.comment}/>
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Gender">Gender</label>

        <select
          name="Gender"
          className={Unfilled.gender ? styles.focusedWorng : ''}
          id='Gender'
          defaultValue={''}
          value={Appointment.gender}
          onFocus={() => handleFocus('gender')}
          onChange={(e) => setAppointment({ ...Appointment, gender: e.target.value })}
        >
          <option value="" disabled >--- Select ---</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className={styles.formsection}>
        <label htmlFor="Phone Number">Phone Number</label>
        <input className={Unfilled.phoneNumber ? styles.focusedWorng : ''} type="text" id="Phone Number" placeholder="Phone Number" autoComplete='off' onFocus={() => handleFocus('phoneNumber')} onChange={(e) => setAppointment({ ...Appointment, phoneNumber: e.target.value })} value={Appointment.phoneNumber}/>
      </div>
      <div className={`${styles.formsection} ${styles.Fullwidth}`}>
        <p>Address</p>
        <div className={styles.SubSection}>
          <div className={styles.addsec}>
            <label htmlFor="State">State</label>
            <input type="text" id="State" placeholder="State" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, state: e.target.value } })} value={Appointment.address.state} />
          </div>
          <div className={styles.addsec}>
            <label htmlFor="City">City</label>
            <input type="text" id="City" placeholder="City" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, city: e.target.value } })} value={Appointment.address.city} />
          </div>
          <div className={styles.addsec}>
            <label htmlFor="Pincode">Pincode</label>
            <input type="text" id="Pincode" placeholder="Pincode" autoComplete='off' onChange={(e) => setAppointment({ ...Appointment, address: { ...Appointment.address, pincode: e.target.value } })} value={Appointment.address.pincode} />
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
