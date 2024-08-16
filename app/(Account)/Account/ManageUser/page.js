'use client'
import React, { useEffect, useState, useCallback } from 'react';
import design from "../../account.module.css";
import styles from "./manage.module.css";
import { useOmnipresence } from '@/app/Context/Omnipresent';
import { useRouter } from 'next/navigation';
import SecurityDialog from '../../Components/SecurityDialog/SecurityDialog';
import CreateDialog from '../../Components/SecurityDialog/CreateDialog';


const ManageUser = ({ searchParams }) => {

  const isPasskey = searchParams.passkey === 'true';
  const notPasskey = searchParams.passkey === 'false';
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userdata, setuserdata] = useState();
  const [ChosenRole, setChosenRole] = useState()
  const [_id, set_id] = useState()
  const [roles, setRoles] = useState({});
  const [Refresh, setRefresh] = useState(true)
  const { Notify, correct } = useOmnipresence();
  const [expandedSections, setExpandedSections] = useState({
    admin: false,
    doctor: false,
    patient: false,
  });

  const getUsers = async () => {

    const response = await fetch("/Api/User/Admin");
    const dataresponse = await fetch("/Api/User/Admin/Data");
    const { admindata } = await dataresponse.json();
    console.log(admindata)
    const data = await response.json();
    setuserdata(admindata);
    setUser(data.user);

    const initialRoles = {};
    ['admin', 'doctor', 'patient'].forEach(roleType => {
      data.user[roleType]?.forEach(role => {
        initialRoles[role._id] = role.as;
      });
    });
    setRoles(initialRoles);
  };

  const toggleSection = useCallback((section) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  }, []);

  const refreshdata = async () => {
    // if (Refresh) {
      // setRefresh(false) 
      console.log("dummy refreshing")
      // router.refresh();
    // }
    // console.log("no refresh")
  };

  const handleRoleChange = async (event, userId) => {

    const { value } = event.target;
    setChosenRole(value)
    set_id(userId)
    setRoles(prevRoles => ({
      ...prevRoles,
      [userId]: value,
    }));
    if (correct === true) {
      const response = await fetch(`/Api/User/Admin/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ as: value })
      });

      const data = await response.json();
      // console.log(data)
      if (data.status) {
        Notify({ message: data.result, status: data.status })
        console.log('Roles updated successfully', data);
      } else {
        Notify({ message: data.message, status: data.status })
        console.log('Failed to update roles', data);
      }
    } else {
      if (userdata.passkey) {
        router.push("/Account/ManageUser/?passkey=true")
      }
      else {
        router.push("/Account/ManageUser/?passkey=false")
      }
    }
  };

  useEffect(() => {
    getUsers();
    console.log("first I am workin from Manage User")
  }, [Notify]);

  return (
    <div className={design.page}>
      {isPasskey && <SecurityDialog user={userdata} _id={_id} ChosenRole={ChosenRole} />}
      {notPasskey && <CreateDialog />}
      <h1>Manage User</h1>
      <div>
        {['admin', 'doctor', 'patient'].map((roleType, idx) => (
          <React.Fragment key={roleType}>
            <h3 className={styles.tags} onClick={() => { toggleSection(roleType); refreshdata(); }}>
              {roleType.charAt(0).toUpperCase() + roleType.slice(1)}s
            </h3>
            {/* <div className={`${styles.content} ${expandedSections[roleType] ? styles.expanded : ''}`}>
              <div className={styles.UserDetailstop}>
                <span># </span>
                <h4>Name</h4>
                <h4>Role</h4>
              </div>
              {expandedSections[roleType] && user?.[roleType]?.map((user, index) => (
                <div className={styles.UserDetails} key={user._id}>
                  <span>{index + 1}. </span>
                  {user.name}
                  <select
                    name="role"
                    id={`Role:${user._id}`}
                    value={roles[user._id]}
                    onChange={(e) => handleRoleChange(e, user._id)}
                  >
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
              ))}
            </div> */}
            <div className={`${styles.content} ${expandedSections[roleType] ? styles.expanded : ''}`}>
              <div className={styles.UserDetailstop}>
                <span># </span>
                <h4>Name</h4>
                <h4>Role</h4>
              </div>
              {user?.[roleType]?.map((user, index) => (
                <div className={`${styles.UserDetails} ${expandedSections[roleType] ? styles.expanded : ''}`} key={user._id}>
                  <span>{index + 1}. </span>
                  {user.name}
                  <select
                    name={`${user.name}-role`}
                    title={user.name}
                    id={`Role:${user._id}`}
                    value={roles[user._id]}
                    onChange={(e) => handleRoleChange(e, user._id)}
                  >
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
              ))}
            </div>

          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ManageUser;
