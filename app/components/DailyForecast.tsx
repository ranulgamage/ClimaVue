/**
 * DailyForecast Component
 * Displays 7-day weather forecast in a compact layout
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { DailyForecast as DailyForecastType } from '../types/weather';
import { formatDayOfWeek } from '../utils/formatters';
import { getWeatherIconUrl } from '../services/weatherService';
import styles from '../styles/DailyForecast.module.css';

interface DailyForecastProps {
  data: DailyForecastType[];
  units: 'metric' | 'imperial';
}

export default function DailyForecast({ data, units }: DailyForecastProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>7-Day Forecast</h3>
      <div className={styles.forecastList}>
        {data.map((day, index) => (
          <div key={index} className={styles.dayItem}>
            <div className={styles.day}>{formatDayOfWeek(day.date)}</div>
            
            <div className={styles.iconWrapper}>
              <Image
                src={getWeatherIconUrl(day.icon)}
                alt={day.description}
                width={40}
                height={40}
                className={styles.icon}
              />
            </div>

            <div className={styles.condition}>{day.condition}</div>

            <div className={styles.temps}>
              <span className={styles.tempMax}>{day.tempMax}{tempUnit}</span>
              <span className={styles.separator}>/</span>
              <span className={styles.tempMin}>{day.tempMin}{tempUnit}</span>
            </div>

            {day.precipitation > 0 && (
              <div className={styles.precipitation}>
                <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0C4.5 2 3 3.5 3 5.5 3 7.433 4.567 9 6.5 9S10 7.433 10 5.5C10 3.5 8.5 2 7 0 6.667.333 6.333.333 6 0z" transform="translate(-0.5)" />
                </svg>
                {day.precipitation}%
              </div>
            )}

            <div className={styles.humidity}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
              </svg>
              {day.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
