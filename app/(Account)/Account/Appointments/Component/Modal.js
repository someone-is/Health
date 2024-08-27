'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './modal.module.css';

const MovieModal = ({ appointmentData, isOpen, onClose }) => {
  const [modalStyle, setModalStyle] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && appointmentData) {
      const rect = appointmentData.rect;
      // Initial style (starting position)
      setModalStyle({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: 'fixed',
        transition: 'all 3s ease',
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
      }, 30);
    }
  }, [isOpen, appointmentData]);

  const handleClose = () => {
    // Reverse the animation before closing
    setModalStyle((prevStyle) => ({
      ...prevStyle,
      top: appointmentData.rect.top,
      left: appointmentData.rect.left,
      width: appointmentData.rect.width,
      height: appointmentData.rect.height,
    }));

    setTimeout(() => {
      onClose();
      setModalStyle({});
    }, 3000);
  };

  return (
    <div
      id="appointment-modal"
      style={modalStyle}
      ref={modalRef}
      className={`${styles.modal} ${isOpen ? styles.expanding : styles.hidden}`}
      onClick={handleClose}
    >
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        {appointmentData && (
          <div>
            <h2>{appointmentData?.name}</h2>
            <p><strong>Concern:</strong> {appointmentData?.concern}</p>
            <p><strong>Phone Number:</strong> {appointmentData?.phoneNumber}</p>
            <p><strong>Date:</strong> {appointmentData?.date_of_appointment.toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}</p>
            <p><strong>Comment:</strong> {appointmentData?.comment}</p>
            <p><strong>Gender:</strong> {appointmentData?.gender}</p>
            <p><strong>Address:</strong> {appointmentData?.address?.city}, {appointmentData?.address?.state}, {appointmentData?.address?.pincode}</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
