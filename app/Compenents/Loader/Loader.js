import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      {[...Array(23)].map((_, i) => (
        <span key={i} style={{ '--i': i + 1 }}></span>
      ))}
    </div>
  );
};

export default Loader;
