import Image from 'next/image'
import React from 'react'
import styles from './Form.module.css'
function Searchedtile({ Searched, setIsFocused, setDoc, Appointment, setdoctorcover }) {

  const handleclick = () => {
    setDoc({ ...Appointment, doctor: { ...Appointment.doctor, _id: Searched._id, name: Searched.name } })
    setdoctorcover(Searched.name)
    setIsFocused(false)
  }

  return (
    <div className={styles.searchtile} onClick={handleclick}>
      <div className={styles.photosearch}>
        <Image className={styles.searchprof} src={Searched?.gender === "Male" ? '/Male.svg' : '/Female.svg'} alt="profile" width={60} height={60} priority />
      </div>
      <div className={styles.NameandDesc}>
        <h4>{Searched?.name}</h4>
        <p>{Searched?.field}</p>
      </div>
    </div>
  )
}

export default Searchedtile