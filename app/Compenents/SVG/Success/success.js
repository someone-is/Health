// components/SuccessIcon.js
import React from 'react';
import styles from './success.module.css';

const SuccessIcon = ({ size = 100 }) => {
  return (
    <svg
      id="success-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <circle className={styles.circle} cx="12" cy="12" r="10" fill="#4CAF50" />
      <path
        className={styles.checkmark}
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12l4 4 8-8"
      />
    </svg>
  );
};

export default SuccessIcon;
