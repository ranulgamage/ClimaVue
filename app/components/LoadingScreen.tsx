/**
 * LoadingScreen Component
 * Full-screen loading state with ClimaVue logo
 */

'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../styles/LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/climavue_logo.png"
          alt="ClimaVue"
          width={280}
          height={80}
          priority
          className={styles.logo}
        />
        <div className={styles.spinner}>
          <div className={styles.spinnerCircle}></div>
        </div>
        <p className={styles.text}>Loading weather data...</p>
      </div>
    </div>
  );
}
