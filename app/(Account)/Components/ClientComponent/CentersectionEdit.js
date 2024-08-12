'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './EditSection.module.css'
import { useOmnipresence } from '@/app/Context/Omnipresent'
const Centersection = ({ name, role, field, bio, gender, phoneNumber, state, city, pincode }) => {
  // const [user, setuser] = useState({ name: name, role: role, field: field, bio: bio, gender: gender, phoneNumber: phoneNumber, state: state, city: city, pincode: pincode })
  const { user, setuser } = useOmnipresence();
  console.log(user)
  return (
    <div className={styles.dataSection}>
      <Image className={styles.background} src='/pexels-padrinan-255379.jpg' alt="Profile background" width={1920} height={1080} priority />
      <div className={styles.subSections}>
        <label htmlFor='Name' className={styles.nameheading}><h3>Name</h3></label>
        <input id='Name' autoComplete='off' onChange={(e) => setuser({ ...user, name: e.target.value })} defaultValue={name} />
      </div>

      {role === 'doctor' && <div className={styles.subSections}>
        <label htmlFor='Field'>
          <h3>Field</h3>
        </label>
        <input id='Field' autoComplete='off' onChange={(e) => setuser({ ...user, field: e.target.value })} defaultValue={field} />
      </div>}

      {role === 'doctor' && <div className={styles.subSections}>
        <label htmlFor='About'>
          <h3>About</h3>
        </label>
        <textarea id='About' rows={11} style={{ resize: "vertical", whiteSpace: 'pre-wrap' }} autoComplete='off' onChange={(e) => setuser({ ...user, bio: e.target.value })} defaultValue={bio} />
      </div>}

      {role !== 'patient' && <div className={styles.subSections}>
        <h3 className={styles.NoLableh3}>Role</h3>
        <p>{role}</p>
      </div>}

      <div className={styles.subSections}>
        <label htmlFor='Gender'><h3>Gender</h3></label>
        <select
                    name="Gender"
                    id='Gender'
                    defaultValue={gender}
                    onChange={(e) => setuser({ ...user, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
        {/* <input id='Gender' onChange={(e) => setuser({ ...user, gender: e.target.value })} autoComplete="sex" defaultValue={gender} /> */}
      </div>

      <div className={styles.subSections}>
        <label htmlFor='Phone Number'><h3>Phone Number</h3></label>
        <input id='Phone Number' autoComplete='off' onChange={(e) => setuser({ ...user, phoneNumber: e.target.value })} defaultValue={phoneNumber} />
      </div>

      <div className={styles.subSections}>

        <h3 className={styles.NoLableh3}>Address:</h3>
        <div className={styles.address} >
          <div className={styles.smallerSections}>
            <label htmlFor='State'><h4>State</h4></label>
            <input id='State' autoComplete='off' onChange={(e) => setuser({ ...user, address: {...user.address, state: e.target.value } })} defaultValue={state} />
          </div>

          <div className={styles.smallerSections}>
            <label htmlFor='City'><h4>City</h4></label>
            <input id='City' autoComplete='off' onChange={(e) => setuser({ ...user, address: {...user.address, city: e.target.value } })} defaultValue={city} />
          </div>

          <div className={styles.smallerSections}>
            <label htmlFor='Pincode'><h4>Pincode</h4></label>
            <input id='Pincode' autoComplete='off' onChange={(e) => setuser({ ...user, address: {...user.address, pincode: e.target.value } })} defaultValue={pincode} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Centersection
