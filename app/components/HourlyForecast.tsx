/**
 * HourlyForecast Component
 * Displays 24-hour forecast in a scrollable horizontal layout
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import { formatTime } from '../utils/formatters';
import { getWeatherIconUrl } from '../services/weatherService';
import styles from '../styles/HourlyForecast.module.css';

interface HourlyForecastProps {
  data: HourlyForecastType[];
  units: 'metric' | 'imperial';
}

export default function HourlyForecast({ data, units }: HourlyForecastProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Hourly Forecast</h3>
      <div className={styles.forecastScroll}>
        <div className={styles.forecastList}>
          {data.map((hour, index) => (
            <div key={index} className={styles.hourItem}>
              <div className={styles.time}>{formatTime(hour.time)}</div>
              <div className={styles.iconWrapper}>
                <Image
                  src={getWeatherIconUrl(hour.icon)}
                  alt={hour.description}
                  width={50}
                  height={50}
                  className={styles.icon}
                />
              </div>
              <div className={styles.temp}>
                {hour.temperature}{tempUnit}
              </div>
              {hour.precipitation > 0 && (
                <div className={styles.precipitation}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 0C4.5 2 3 3.5 3 5.5 3 7.433 4.567 9 6.5 9S10 7.433 10 5.5C10 3.5 8.5 2 7 0 6.667.333 6.333.333 6 0z" transform="translate(-0.5)" />
                  </svg>
                  {Math.round(hour.precipitation)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
