import React,{cache} from 'react'
import design from '../../account.module.css'
// import CurrentUser from '@/app/ServersideFetching/CurrentUser'
import styles from './profile.module.css'
import Image from 'next/image'
import CurrentUser from '@/app/DatabaseAndFetching/ServersideFetching/CurrentUser'
import Centersection from '../../Components/ClientComponent/CentersectionEdit'
import Rightbar from '../../Components/ClientComponent/Rightbar'

const GetProfileData = cache(async()=>{const {user, Userdata} = await CurrentUser();
 return ({user,Userdata})})

const Account = async ({ searchParams }) => {
  const { user, Userdata } = await GetProfileData();
  // console.log( "this is cached data",  user, Userdata  )
  const isPath = searchParams
  // console.log(isPath)
  const isEditing = searchParams.Modifying === 'true'
  // console.log(isEditing)
  // const { user, Userdata } = await CurrentUser()

  return (
    <div className={design.page}>
      <h1 className={styles.heading}>Profile</h1>
      {/* <Image className={styles.background} src='/Profileback.svg' alt="Login" width={1080} height={600} priority /> */}
      <div className={styles.profile}>
        <div className={styles.picture} >
          <Image className={styles.background} src='/pexels-padrinan-255379.jpg' alt="Profile background" width={1920} height={1080} priority />

          <div className={styles.profileback}>
            <Image src={Userdata?.gender === 'Male' ? '/Male.svg' : '/Female.svg'} alt="profile" width={200} height={200} priority />
          </div>
        </div>
        {!isEditing ? <div className={styles.dataSection}>
          <Image className={styles.background} src='/pexels-padrinan-255379.jpg' alt="Profile background" width={1920} height={1080} priority />
          <div className={styles.subSections}>
            <h3 className={styles.nameheading}>Name</h3>
            <p>{user?.name}</p>
          </div>
          {user.as === 'doctor' && <div className={styles.subSections}><h3>Field</h3><p>{Userdata?.field}</p></div>}
          {user.as === 'doctor' && <div className={styles.subSections}><h3>About</h3><p style={{ whiteSpace: 'pre-wrap',textTransform: "none" }}>{Userdata?.bio}</p></div>}
          {user.as !== 'patient' && <div className={styles.subSections}>
            <h3>Role</h3>
            <p>{user?.as}</p>
          </div>}
          <div className={styles.subSections}>
            <h3>Gender</h3>
            <p>{Userdata?.gender}</p>
          </div>
          <div className={styles.subSections}>
            <h3>Phone Number</h3>
            <p>{Userdata?.phoneNumber}</p>
          </div>
          <div className={styles.subSections}>
            <h3>Address:</h3>
            <div className={styles.address} >
              <div className={styles.smallerSections}>
                <h4>State</h4>
                <p>{Userdata?.address.state}</p>
              </div>
              <div className={styles.smallerSections}>
                <h4>City</h4>
                <p>{Userdata?.address.city}</p>
              </div>
              <div className={styles.smallerSections}>
                <h4>Pincode</h4>
                <p>{Userdata?.address.pincode}</p>
              </div>
            </div>
          </div>
        </div> :
          <Centersection name={user?.name} role={user?.as} gender={Userdata?.gender} field={Userdata?.field} bio={Userdata?.bio} phoneNumber={Userdata?.phoneNumber} state={Userdata?.address?.state} city={Userdata?.address?.city} pincode={Userdata?.address?.pincode}/>}
      
        <Rightbar isPath={isPath} name={user?.name} role={user?.as} gender={Userdata?.gender} field={Userdata?.field} bio={Userdata?.bio} phoneNumber={Userdata?.phoneNumber} state={Userdata?.address?.state} city={Userdata?.address?.city} pincode={Userdata?.address?.pincode}/>

      </div>
    </div>
  )
}

export default Account