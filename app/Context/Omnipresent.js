'use client'
import { createContext, useContext, useState } from 'react';

const Omnipresence = createContext();

export function OmniProvider({ children }) {
    const [isLoggedin, setisLoggedin] = useState();
    const [isNotifying, setisNotifying] = useState(false)
    const [Status, setStatus] = useState(Boolean)
    const [Message, setMessage] = useState('')
    const [correct, setcorrect] = useState(false)
    const [user, setuser] = useState({ name: "", role: "", field: "", bio: "", gender: "", phoneNumber: "", address: { state: "", city: "", pincode: "" } })
    const Notify = ({ message = 'This is the Notification', status = Boolean }) => {
        setisNotifying(true)
        setMessage(message)
        setStatus(status)
        setTimeout(() => {
            setisNotifying(false)
        }, 3000);
    }

    return (
        <Omnipresence.Provider value={{ isLoggedin, setisLoggedin, isNotifying, setisNotifying, Status, setStatus, Message, setMessage, Notify, correct, setcorrect, user, setuser }}>
            {children}
        </Omnipresence.Provider>
    );
}

export function useOmnipresence() {
    return useContext(Omnipresence);
}
