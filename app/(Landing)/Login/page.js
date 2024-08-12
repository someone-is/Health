'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../page.module.css'
import { useRouter } from 'next/navigation'
import { useOmnipresence } from '@/app/Context/Omnipresent'
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton'
import Loader from '@/app/Compenents/Loader/Loader'


const Login = () => {
  const [User, setUser] = useState({ userId: "", password: "" })
  const [isLoading, setisLoading] = useState(false)
  const router = useRouter()
  const { Notify } = useOmnipresence();
  
  const onSubmit = async (User) => {
    setisLoading(true)
    const response = await fetch("/Api/Login", { method: 'POST', body: JSON.stringify(User), headers: { 'Content-Type': 'application/json' } })
    setUser({ userId: "", password: "" })
    const data = await response.json()
    setisLoading(false)

    console.log("From Login Page", { message: data.message, success: data.success })
    Notify({message:data.message , status:data.success})
    if (data.success) {
      Notify({message:data.result , status:data.success})
      router.push("/")
      router.refresh()
    }
  }

  return (
    <main className={styles.mainin}>
      <Image className={styles.logoin} src="/Loginphoto.svg" alt="Login" width={500} height={400} priority />
      {/* <h3 className={styles.onsubErr}>{se ? (FillWarning.success ? FillWarning.result : FillWarning.message) : (<span></span>)}</h3> */}
      <div className={styles.centerin}>
        <Image className={styles.logoLogin} src="/login.svg" alt="Login" width={200} height={50} priority />
      </div>
      <form className={styles.centerFo} method="POST">
        <label className={styles.lables} htmlFor="Email">User-Id</label>
        <input className={styles.inputs} id='Email' placeholder='Enter User-Id' type="text" autoComplete='off' onChange={(e) => setUser({ ...User, userId: e.target.value })} value={User.userId} />
        <label className={styles.lables} htmlFor="password">Password</label>
        <input className={styles.inputs} id='password' placeholder='Password' type="password" autoComplete='off' onChange={(e) => setUser({ ...User, password: e.target.value })} value={User.password} />
        {/* <button className={styles.btn} ref={buttonRef} onMouseMove={handleMouseMove} onMouseLeave={handleOnMouseleave} type='submit' onClick={(e) => { e.preventDefault(); onSubmit(User); handleClick(e) }} >
          <span className={isOver ? styles.ripple : styles.rippleleave} style={rippleStyle} />
          {isRippling && <span className={styles.rippleclick} style={rippleStyleclick} />}
          <p className={styles.title}>Login</p>
        </button> */}

        <ShinyRippleButton children={isLoading? <Loader/> :"Login"} typeC='submit' extraLeave={90} extraMove={400} CustomDesign={styles.btn} bgColourover='rgba(0, 47, 255, 0.6)' onClick={() => onSubmit(User)} />
      </form>

    </main>
  )
}

export default Login