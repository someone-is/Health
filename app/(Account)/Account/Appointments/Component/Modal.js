'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './modal.module.css';
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton';
import Image from 'next/image';
import { useOmnipresence } from '@/app/Context/Omnipresent';

const MovieModal = ({ appdata, isOpen, onClose }) => {
  const { Notify } = useOmnipresence();
  const [modalStyle, setModalStyle] = useState({});
  const modalRef = useRef(null);
  const [closing, setclosing] = useState(false)
  useEffect(() => {
    if (isOpen && appdata) {
      setclosing(false)
      const rect = appdata.rect;
      // Initial style (starting position)
      setModalStyle({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: 'fixed',
        transition: 'all 0.5s ease',
      });

      // Delay to trigger the transition
      setTimeout(() => {
        setModalStyle((prevStyle) => ({
          ...prevStyle,
          top: '10%',
          left: '20%',
          width: '60vw',
          height: '90vh',
        }));
      }, 300);
    }
  }, [isOpen, appdata]);

  const handleClose = () => {
    // Reverse the animation before closing
    setModalStyle((prevStyle) => ({
      ...prevStyle,
      top: appdata.rect.top,
      left: appdata.rect.left,
      width: appdata.rect.width,
      height: appdata.rect.height,
    }));
    setTimeout(() => {
      setclosing(true)
    }, 300);
    setTimeout(() => {
      onClose();
      setModalStyle({});
    }, 600);
  };

  const DeleteAppointment = async (data) => {
    const response = await fetch("/Api/Appointment", { method: 'DELETE', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    const acknowledgement = await response.json();
    console.log(acknowledgement)
    Notify({ message: acknowledgement.message, status: acknowledgement.success })
    if (acknowledgement.success) {
      handleClose();
    }
  }

  return (
    <div
      id="appointment-modal"
      style={modalStyle}
      ref={modalRef}
      className={`${styles.modal} ${isOpen ? styles.expanding : styles.hidden}`}
    >

      <div>
        <div className={!closing ? styles.topHeading : styles.topHeadingclose}>
          <h1>Appointment Details</h1>
          <ShinyRippleButton CustomDesign={styles.back} extraLeave={20} extraMove={60} onClick={handleClose} ><Image className={styles.cross} src={'/icons8-multiply-100.png'} alt="profile" width={40} height={40} priority /></ShinyRippleButton>
        </div>

        <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
          {appdata && (
            !closing ? <div className={styles['modal-content-ex']}>
              <h2>{appdata?.name}</h2>
              <p><strong>Concern:</strong> {appdata?.concern}</p>
              <p><strong>Phone Number:</strong> {appdata?.phoneNumber}</p>
              <p><strong>Date:</strong> {appdata?.date_of_appointment.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}</p>
              <p className={styles.comment}><strong>Comment:</strong> {appdata?.comment}</p>
              <p><strong>Gender:</strong> {appdata?.gender}</p>
              <p><strong>Address:</strong> {appdata?.address?.city}, {appdata?.address?.state}, {appdata?.address?.pincode}</p>
            </div> :
              <div className={styles['modal-content-sh']}>
                <h2>{appdata?.name}</h2>
                <p>{appdata?.concern}</p>
                <p>{appdata?.phoneNumber}</p>
                <p>{appdata?.date_of_appointment.toLocaleString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour12: true,
                })}</p>
              </div>
          )}
        </div>
      </div>
      {!closing && <div className={styles.buttons}>
        <ShinyRippleButton CustomDesign={styles.deletebtn} extraLeave={60} extraMove={120} onClick={() => DeleteAppointment(appdata?._id)}><div className={styles.chititle}><Image className={styles.icondel} src={'/delete.svg'} alt="delete" width={40} height={40} priority /><p>Delete</p></div></ShinyRippleButton>
        <ShinyRippleButton CustomDesign={styles.confirmbtn} extraLeave={60} extraMove={120} bgColourLeave={"rgb(67, 249, 67)"} bgColourover='rgb(67, 249, 67)'>Confirm</ShinyRippleButton>
      </div>}
    </div>
  );
};

export default MovieModal;
