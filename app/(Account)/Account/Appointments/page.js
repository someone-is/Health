import React from 'react'
import design from "../../account.module.css"
import CurrentUser from '@/app/DatabaseAndFetching/ServersideFetching/CurrentUser';
import GetAppointment from '@/app/DatabaseAndFetching/ServersideFetching/GetAppointment';
import styles from './appointment.module.css';
import GridApp from './Component/GridApp';

const Appointments = async () => {
  const { user } = await CurrentUser();
  const { appointment, appointment_with_patient } = await GetAppointment();
  return (
    <div className={design.page}>

      {user?.as === 'doctor' ? (
        <div className={styles.navigation}>
          <h1>Appointments With Patient</h1>
          <hr />
          <h1>My Appointments</h1>
        </div>
      ) : <div className={styles.notnavigation}><h1>My Appointments</h1></div>}
      
      <GridApp user={user} appointment={appointment} appointment_with_patient={appointment_with_patient} />
    </div>
  )
}

export default Appointments