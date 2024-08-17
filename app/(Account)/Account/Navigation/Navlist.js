"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import design from '../../account.module.css'
const Navlist = ({ navlinks, dynamiclinks }) => {
    const Pathname = usePathname();
    return (
        <ul className={design.list}>
            {dynamiclinks.length === 0 ? (navlinks.doctor.map((items) =>
                <Link key={items.path} href={items.path}> <li className={Pathname === items.path ? `${design.code} ${design.selected}` : `${design.code} ${design.unselected}`}>{items.name}</li></Link>
            )) : (
                dynamiclinks.map((items) =>
                    <Link key={items.path} href={items.path}> <li className={Pathname === items.path ? `${design.code} ${design.selected}` : `${design.code} ${design.unselected}`}>{items.name}</li></Link>
                )
            )}
        </ul>
    )
}

export default Navlist
