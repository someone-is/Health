'use client'
import React from 'react'
import styles from "./notification.module.css"
import SuccessIcon from '../SVG/Success/success'
import InvalidIcon from '../SVG/Invalid/Invalid'
import { useOmnipresence } from '@/app/Context/Omnipresent'


const Notification = () => {
    
    const { isNotifying, Status, Message } = useOmnipresence()
    return (
        <div className={Status ? styles.badge : styles.badgered} style={{ display: isNotifying ? 'flex' : 'none' }}>
            {Status ? <SuccessIcon size={25} /> : <InvalidIcon size={25} />}
            <h4>{Message}</h4>
        </div>
    )
}

export default Notification