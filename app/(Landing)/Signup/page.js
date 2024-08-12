'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import styles from "../page.module.css";
import { useRouter } from 'next/navigation';
import { useOmnipresence } from '@/app/Context/Omnipresent';
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton';
import Loader from '@/app/Compenents/Loader/Loader';

const Signup = () => {
  const router = useRouter()
  const [User, setUser] = useState({ userId: "", name: "", password: "" })
  const [isLoading, setisLoading] = useState(false)

  const { Notify } = useOmnipresence();

  const onSubmit = async (User) => {
    setisLoading(true)
    // console.log(User)
    const response = await fetch("/Api/User", { method: 'POST', body: JSON.stringify(User), headers: { 'Content-Type': 'application/json' } })
    setUser({ userId: "", name: "", password: "" })
    const data = await response.json()
    setisLoading(false)
    // console.log("From the SignUp page ", { data })

    Notify({ message: data.message, status: data.status })
    if (data.status) {
      Notify({ message: data.result, status: data.status })
      router.push("/Login")
    }
  }
  
  return (
    <main className={styles.mainin}>
      <Image className={styles.logoup} src="/design.svg" alt="Login" width={700} height={550} priority />
      <div className={styles.centerin}>
        <Image className={styles.logoSign} src="/signup.svg" alt="Login" width={200} height={50} priority />
      </div>
      <form className={styles.centerFoup} method='POST'>
        <label className={styles.lables} htmlFor="Email">User-Id</label>
        <input className={styles.inputsup} placeholder='Enter User-Id' id='Email' name="Email" type="email" autoComplete='off' onChange={(e) => setUser({ ...User, userId: e.target.value })} value={User.userId} />

        <label className={styles.lables} htmlFor="name">Name</label>
        <input className={styles.inputsup} placeholder='Enter your Name' id='name' name="name" type="text" autoComplete='off' onChange={(e) => setUser({ ...User, name: e.target.value })} value={User.name} />

        <label className={styles.lables} htmlFor="password">Password</label>
        <input className={styles.inputsup} placeholder='Password' id='password' name="password" type="password" autoComplete='off' onChange={(e) => setUser({ ...User, password: e.target.value })} value={User.password} />

        {/* <button className={styles.btn} type='submit' onClick={(e)=>{e.preventDefault(); onSubmit(User)}} >Sign Up</button> */}
        <ShinyRippleButton children={isLoading ? <Loader/> : "Sign Up"} typeC='submit' extraLeave={90} extraMove={400} CustomDesign={styles.btn} bgColourover='rgba(0, 47, 255, 0.6)' onClick={() => { onSubmit(User) }} />

      </form>

    </main>
  )
}

export default Signup
