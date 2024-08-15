'use client'
import React, { useEffect, useState } from 'react'
import design from "../../account.module.css"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ShinyRippleButton from '../../Components/Button/ShinyRipplebutton'

const Navigation = () => {

  const Pathname = usePathname();
  const navlinks =
  {
    admin: [{
      name: "Profile",
      path: "/Account/Profile",
    },
    {
      name: "Setting",
      path: "/Account/Setting",
    },
    {
      name: "Manage Users",
      path: "/Account/ManageUser",
    },
    {
      name: "Appointments",
      path: "/Account/Appointments",
    },
    {
      name: "Something",
      path: "/Account/Something",
    },
    ],
    doctor: [{
      name: "Profile",
      path: "/Account/Profile",
    },
    {
      name: "Setting",
      path: "/Account/Setting",
    },
    {
      name: "Appointments",
      path: "/Account/Appointments",
    },
    {
      name: "Something",
      path: "/Account/Something",
    },
    ],
    patient: [{
      name: "Profile",
      path: "/Account/Profile",
    },
    {
      name: "Setting",
      path: "/Account/Setting",
    },
    {
      name: "Appointments",
      path: "/Account/Appointments",
    },
    {
      name: "Prescriptions",
      path: "/Account/Something",
    },
    ]
  }
  const [user, setuser] = useState()
  
  const LoggedinUser = async () => {
    const response = await fetch("/Api/User/Profile")
    let data = await response.json()
    setuser(data.as)
  }
  
  useEffect(() => {
    LoggedinUser()
  }, [])

  const dynamiclinks = user && navlinks[user] ? navlinks[user] : [];
// console.log(dynamiclinks)
  return (
    <nav className={design.navigation}>
      <div className={design.top} >
      <h1><Link href={"/"}><ShinyRippleButton CustomDesign={design.back} extraLeave={20} extraMove={40} >&lt;-</ShinyRippleButton></Link><span className={design.title_name}>Account</span></h1>
      </div>
      <ul className={design.list}>
      {dynamiclinks.length === 0 ?  (navlinks.doctor.map((items)=>
          <Link key={items.path} href={items.path}> <li className={Pathname === items.path ? `${design.code} ${design.selected}` : `${design.code} ${design.unselected}`}>{items.name}</li></Link>
        )):(
          dynamiclinks.map((items)=>
            <Link key={items.path} href={items.path}> <li className={Pathname === items.path ? `${design.code} ${design.selected}` : `${design.code} ${design.unselected}`}>{items.name}</li></Link>
          )
        )}
      </ul>
        <a href={"/Api/Logout"}><ShinyRippleButton extraLeave={40} extraMove={158}>Log Out</ShinyRippleButton></a>
    </nav>
  )
}

export default Navigation