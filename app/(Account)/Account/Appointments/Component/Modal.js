'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './modal.module.css';

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [modalStyle, setModalStyle] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && movie) {
      const rect = movie.rect;
      // Initial style (starting position)
      setModalStyle({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: 'fixed',
        transition: 'all 0.3s ease',
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
  }, [isOpen, movie]);

  const handleClose = () => {
    // Reverse the animation before closing
    setModalStyle((prevStyle) => ({
      ...prevStyle,
      top: movie.rect.top,
      left: movie.rect.left,
      width: movie.rect.width,
      height: movie.rect.height,
    }));

    setTimeout(() => {
      onClose();
      setModalStyle({});
    }, 300);
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
        {movie && (
          <div>
            <h2>{movie?.name}</h2>
            <p><strong>Concern:</strong> {movie?.concern}</p>
            <p><strong>Phone Number:</strong> {movie?.phoneNumber}</p>
            <p><strong>Date:</strong> {movie?.date_of_appointment.toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}</p>
            <p><strong>Comment:</strong> {movie?.comment}</p>
            <p><strong>Gender:</strong> {movie?.gender}</p>
            <p><strong>Address:</strong> {movie?.address?.city}, {movie?.address?.state}, {movie?.address?.pincode}</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
