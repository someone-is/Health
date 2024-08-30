// 'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import CurrentUser from "../DatabaseAndFetching/ServersideFetching/CurrentUser";
import HomePageForm from "./Components/HomePageForm";
import GetDoctors from "../DatabaseAndFetching/ServersideFetching/GetDoctors";
// import HomePageForm from "./Components/HomePageForm";
// import GetDoctors from "../ServersideFetching/GetDoctors";
// import populateAdminDataForExistingUsers from "../Models/Syncdata";

export default async function Home() {

  const { user, Userdata } = await CurrentUser();
  console.log(user, Userdata)
  const { doctors } = await GetDoctors();
  // console.log(doctors, user)
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          {user !== null && user?.success !== false ? <p>
            {user?.as === 'admin' && <span>Rule the system with ease!&nbsp;</span>}
            {user?.as === 'patient' && <span>All your health info at your fingertips!&nbsp;</span>}
            {user?.as === 'doctor' && <span>Conquer patient records like a pro!&nbsp;</span>}
            <code className={styles.code}>{user?.name ? `| ${user.as === "doctor" ? "Dr." : ""} ${user.name}` : ""} </code>
          </p> : <span></span>}
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

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/undraw_doctors_p6aq.svg"
            alt="doctor Background"
            width={600}
            height={600}
            priority
          />
        </div>

        <div className={styles.grid}>
          {!user && <Link
            href="/Login"
            className={styles.card}
          >
            <h2>
              Log In <span>-&gt;</span>
            </h2>
            <p>Please Login, if&nbsp;you&nbsp;have an Account</p>
          </Link>}

          {!user && <Link
            href="/Signup"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Sign Up <span>-&gt;</span>
            </h2>
            <p>Please Signup,<br /> if you don't have an Account</p>
          </Link>}

          {user && <Link
            href="/Account/Profile"
            className={styles.card}
          >
            <h2>
              Account <span>-&gt;</span>
            </h2>
            <p>Look into your personal information</p>
          </Link>}

          {user && <a
            href="/Api/Logout"
            className={styles.card}
          >
            <h2>
              Log Out <span>-&gt;</span>
            </h2>
            <p>
              Time for a break? Hit the button to log out, buddy!
            </p>
          </a>}
        </div>
      </main>
      <main className={styles.FormSection}>
        <div className={styles.book}>BOOK YOUR APPOINTMENT NOW!!</div>
        <Image className={styles.Appoin} src="/undraw_medicine_b-1-ol.svg" alt="Appointment Background" width={500} height={400} priority />
        {user ? <h4 className={styles.details}>Easy Appointment Booking For {user?.name}</h4> : <h4 className={styles.details}>Unlock Convenient Appointment Booking By Logging In</h4>}
        <HomePageForm user={user} Userdata={Userdata} />
      </main>
      <div className={styles.docSection}>
        <h1>Our Leading Healthcare Professionals</h1>
        <div className={styles.docGrid}>
          {doctors?.map((doc) =>
          (<Link href={`/${doc._id}`} className={styles.docBox} key={doc._id}>
            <Image className={styles.docProhome} src={doc.gender === "Male" ? "/Male.svg" : "/Female.svg"} alt="Appointment Background" width={200} height={200} priority />
            <div className={styles.docBoxDetails}>
              <h3>{doc.name}</h3>
              <p>{doc.field}</p>
            </div>
            <div className={styles.docBoxDetailsExpand}>
              <h3><span className={styles.expTitle}>Name:</span> {doc.name}</h3>
              <p><span className={styles.expTitle}>Field:</span> {doc.field}</p>
              <p className={styles.DocAbout}><span className={styles.expTitle} >About:</span> {doc.bio}</p>
            </div>

          </Link>))}
        </div>
        <Image className={styles.docBAck} src="/undraw_empty_street_re_atjq.svg" alt="Appointment Background" width={1080} height={400} priority />
      </div>
    </>
  );
}
