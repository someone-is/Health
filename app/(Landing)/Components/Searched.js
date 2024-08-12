import React, { useEffect, useState } from 'react'
import Searchedtile from './Searchedtile'
import styles from './Form.module.css'
const Searched = ({ search, setDoc, setIsFocused, Appointment,setdoctorcover }) => {
    const [Searched, setSearched] = useState()
    const getDoctor = async () => {
        const response = await fetch("/Api/Searched", { method: 'POST', body: JSON.stringify({ name: search }), headers: { 'Content-Type': 'application/json' } })
        const data = await response.json();
        
        setSearched(data.SearchedResults)
    }
   
    useEffect(() => {
        getDoctor()
    }, [search])

    return (
        <div className={styles.searcheddoc}>
            {Searched?.map((DocFound) => <Searchedtile Searched={DocFound} key={DocFound._id} setIsFocused={setIsFocused} setDoc={setDoc} Appointment={Appointment} setdoctorcover={setdoctorcover} />)}

        </div>
    )
}

export default Searched
