import { GetThatDoctor } from '@/app/DatabaseAndFetching/ServersideFetching/GetDoctors'
import Image from 'next/image'
import React from 'react'
import styles from '../page.module.css'
import design from './doc.module.css'
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton'
import Booking from './Component/Booking'
import Link from 'next/link'
const page = async ({ params, searchParams }) => {
    const isBooking = searchParams.booking === 'true';
    const doctor = params.Doctor
    const docdata = await GetThatDoctor(doctor)
    const doc = docdata.doctor
    return (
            <main className={design.main}>
            {isBooking && <Booking name={doc.name} _id={doctor} />}
                <div className={design.description}>
                    <p>
                        <span><Link href={"/"}><ShinyRippleButton CustomDesign={design.back} extraLeave={20} extraMove={40} >&lt;-</ShinyRippleButton></Link></span>
                        <span>All your health info at your fingertips!&nbsp;</span>
                        <code className={styles.code}>| Dr. {doc?.name}</code>
                    </p>
                    <div>
                        <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            By{" "}
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                className={styles.vercelLogo}
                                width={100}
                                height={24}
                                priority
                            />
                        </a>
                    </div>
                </div>
                <div className={design.middle}>
                    <div className={design.LeftSide}>
                        <Image className={design.prodoc} src={doc?.gender === 'Male' ? '/Male.svg' : '/Female.svg'} alt="profile" width={200} height={200} priority />
                        <Link href={`/${doctor}/?booking=true`}><ShinyRippleButton typeC='button' children="Book Your Appointment" extraLeave={100} extraMove={260} CustomDesign={design.button} bgColourover='#3e3899' bgColourLeave="#3e3899" /></Link>
                    </div>
                    <hr className={design.hr} />
                    <div className={design.descriptionDoc}>
                        <p>
                            <span>Field :&nbsp;</span>
                            <code className={design.code}>{doc?.field}</code>
                        </p>
                        <p>
                            <span>Gender :&nbsp;</span>
                            <code className={design.code}>{doc?.gender}</code>
                        </p>
                        <p>
                            <span>Phone Number :&nbsp;</span>
                            <code className={design.code}>{doc?.phoneNumber}</code>
                        </p>
                        <p>
                            <span>About&nbsp;:&nbsp;</span>
                            <code className={design.code} style={{ whiteSpace: 'pre-wrap', textTransform: "none" }}>{doc?.bio}</code>
                        </p>
                    </div>
                </div>
                <Image src='/undraw_art_re_vj2w.svg' className={design.backgr} alt="background" width={1920} height={1080} priority />
            </main>
    )
}

export default page