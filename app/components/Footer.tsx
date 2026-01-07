/**
 * Footer Component
 * App footer with developer and company credits
 */

'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.branding}>
          <div className={styles.developer}>
            Developed by <span className={styles.highlight}>Ranul Gamage</span>
          </div>
          <div className={styles.company}>
            <a href="https://ranulgamage.tech/" target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
              <Image
                src="/logo-rgdev.png"
                alt="RGDev"
                width={100}
                height={30}
                className={styles.companyLogo}
              />
            </a>
          </div>
        </div>
        <div className={styles.copyright}>
          © {currentYear} ClimaVue. All rights reserved.
        </div>
        <div className={styles.attribution}>
          Weather data provided by <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>
        </div>
      </div>
    </footer>
  );
}
