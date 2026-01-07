/**
 * SkeletonLoader Component
 * Skeleton loading state for weather data
 */

'use client';

import React from 'react';
import styles from '../styles/SkeletonLoader.module.css';

export default function SkeletonLoader() {
  return (
    <div className={styles.container}>
      {/* Current Weather Skeleton */}
      <div className={styles.currentWeather}>
        <div className={styles.skeletonHeader}>
          <div className={styles.skeletonLine} style={{ width: '200px', height: '24px' }}></div>
          <div className={styles.skeletonLine} style={{ width: '120px', height: '16px', marginTop: '8px' }}></div>
        </div>
        <div className={styles.skeletonMain}>
          <div className={styles.skeletonCircle} style={{ width: '120px', height: '120px' }}></div>
          <div className={styles.skeletonTemp}>
            <div className={styles.skeletonLine} style={{ width: '120px', height: '64px' }}></div>
            <div className={styles.skeletonLine} style={{ width: '100px', height: '20px', marginTop: '12px' }}></div>
          </div>
        </div>
        <div className={styles.skeletonDetails}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles.skeletonDetail}>
              <div className={styles.skeletonCircle} style={{ width: '24px', height: '24px' }}></div>
              <div style={{ flex: 1, marginLeft: '12px' }}>
                <div className={styles.skeletonLine} style={{ width: '80px', height: '14px' }}></div>
                <div className={styles.skeletonLine} style={{ width: '60px', height: '18px', marginTop: '6px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className={styles.hourlyForecast}>
        <div className={styles.skeletonLine} style={{ width: '150px', height: '24px', marginBottom: '16px' }}></div>
        <div className={styles.skeletonHourly}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className={styles.skeletonHour}>
              <div className={styles.skeletonLine} style={{ width: '60px', height: '16px' }}></div>
              <div className={styles.skeletonCircle} style={{ width: '50px', height: '50px', margin: '8px 0' }}></div>
              <div className={styles.skeletonLine} style={{ width: '40px', height: '20px' }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Forecast Skeleton */}
      <div className={styles.dailyForecast}>
        <div className={styles.skeletonLine} style={{ width: '150px', height: '24px', marginBottom: '16px' }}></div>
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className={styles.skeletonDay}>
            <div className={styles.skeletonLine} style={{ width: '100px', height: '18px' }}></div>
            <div className={styles.skeletonCircle} style={{ width: '40px', height: '40px' }}></div>
            <div className={styles.skeletonLine} style={{ width: '80px', height: '18px' }}></div>
            <div className={styles.skeletonLine} style={{ width: '80px', height: '18px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
