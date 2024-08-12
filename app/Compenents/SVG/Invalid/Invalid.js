// components/InvalidIcon.js
import React from 'react';
import styles from './Invalid.module.css';

const InvalidIcon = ({ size = 100 }) => {
  return (
    <svg
      id="invalid-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <circle className={styles.circle} cx="12" cy="12" r="10" fill="#F44336" />
      <line
        className={styles.cross}
        x1="8"
        y1="8"
        x2="16"
        y2="16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        className={styles.cross}
        x1="16"
        y1="8"
        x2="8"
        y2="16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default InvalidIcon;
