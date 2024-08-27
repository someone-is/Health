'use client';
import React, { useState } from 'react';
import styles from '../appointment.module.css';
import MovieModal from './Modal';

const GridApp = ({ user, appointment, appointment_with_patient }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThumbnailClick = (appoint) => {
    const rect = document.querySelector(`[data-id="${appoint._id}"]`).getBoundingClientRect();
    setSelectedAppointment({ ...appoint, rect });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.grid}>
        
      {user?.as === 'doctor' && appointment_with_patient.map((appoint) => (
        <div key={appoint._id} className={styles.letter} data-id={appoint._id} onClick={() => handleThumbnailClick(appoint)}>
          <h2>{appoint?.name}</h2>
          <p>{appoint?.concern}</p>
          <p>{appoint?.phoneNumber}</p>
          <p>{appoint?.date_of_appointment.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true,
          })}</p>
        </div>
      ))}

      {appointment.map((appoint) => (
        <div key={appoint._id} className={styles.letter} data-id={appoint._id} onClick={() => handleThumbnailClick(appoint)}>
          <h2>{appoint?.name}</h2>
          <p>{appoint?.concern}</p>
          <p>{appoint?.phoneNumber}</p>
          <p>{appoint?.date_of_appointment.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true,
          })}</p>
        </div>
      ))}

      <MovieModal appdata={selectedAppointment} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default GridApp;
