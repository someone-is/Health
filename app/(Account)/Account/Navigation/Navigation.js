
import React from 'react'
import design from "../../account.module.css"
import Link from 'next/link'
import ShinyRippleButton from '../../Components/Button/ShinyRipplebutton'
import Navlist from './Navlist'
import CurrentUser from '@/app/DatabaseAndFetching/ServersideFetching/CurrentUser'

const Navigation = async () => {

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

  const { user } = await CurrentUser();
  const role = user?.as
  const dynamiclinks = role && navlinks[role] ? navlinks[role] : [];
  // console.log(dynamiclinks)
  return (
    <nav className={design.navigation}>
      <div className={design.top} >
        <h1><Link href={"/"}><ShinyRippleButton CustomDesign={design.back} extraLeave={20} extraMove={40} >&lt;-</ShinyRippleButton></Link><span className={design.title_name}>Account</span></h1>
      </div>
      <Navlist dynamiclinks={dynamiclinks} navlinks={navlinks} />
      <a href={"/Api/Logout"}><ShinyRippleButton extraLeave={40} extraMove={158}>Log Out</ShinyRippleButton></a>
    </nav>
  )
}

export default Navigation