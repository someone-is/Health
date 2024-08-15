'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../Account/Profile/profile.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useOmnipresence } from '@/app/Context/Omnipresent'
import ShinyRippleButton from '../Button/ShinyRipplebutton'
import LottieAnimation from '../Button/EditSVG'

const Rightbar = ({ isPath, name, role, field, bio, gender, phoneNumber, state, city, pincode }) => {
    const search = useSearchParams()
    console.log(search.size)
    const { user, setuser } = useOmnipresence();
    const [isEditing, setisEditing] = useState()
    const [closing, setclosing] = useState(false)
    console.log(isPath)
    const router = useRouter()

    const handleClick = () => {
        if (isPath.Modifying || search.size === 1 ) {
            router.push("/Account/Profile")
        } else if (search.size === 0) {
            router.push("/Account/Profile?Modifying=true")
        }
    }

    useEffect(() => {
        if (search.size === 1) {
            setisEditing(false)
                setclosing(true)
            setuser({
                name: name,
                role: role,
                field: field,
                bio: bio,
                gender: gender,
                phoneNumber: phoneNumber,
                address: {
                    state: state,
                    city: city,
                    pincode: pincode
                }
            })
        }
        else {
            setisEditing(true)
            setTimeout(() => {
                setclosing(false)
            }, 1000);

        }
    }, [search])

    const handleSubmit = async () => {
        console.log("Clicked")
        try {
            if (role === 'admin') {
                console.log("first is admin")
                const response = await fetch("/Api/User/Admin/Data", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                })

                const data = await response.json()
            } else if (role === 'doctor') {
                console.log("second is doctor")
                const response = await fetch("/Api/User/Doctor", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                })

                const data = await response.json()
            } else if (role === 'patient') {
                console.log("third is patient")
                const response = await fetch("/Api/User/Patient", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                })

                const data = await response.json()
                console.log(data)
            }
            router.push("/Account/Profile")
            router.refresh()

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={styles.other}>
            <div className={styles.listsright} onClick={handleClick}>
                <LottieAnimation animationPath="/icons8-edit.json" isPencil={isEditing} />
                <h4 className={styles.listsrighth4}>{isEditing ? 'Edit Profile' : "Cancel"}</h4>
            </div>
            {closing && <div className={`${styles.buttonOther} ${isEditing ? styles.closingbtn : ''}`} onClick={handleSubmit}>
                <ShinyRippleButton children={"Save"} CustomDesign={styles.savebtn} onClick={handleSubmit} bgColourLeave="green" bgColourover='green' extraLeave={40} extraMove={110} />
                {/* <h4 className={styles.listsrighth4}>Save</h4> */}
            </div>}

        </div>
    )
}

export default Rightbar
