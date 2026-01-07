/**
 * CurrentWeather Component
 * Displays current weather conditions with detailed metrics
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { CurrentWeather as CurrentWeatherType } from '../types/weather';
import { formatTime, capitalizeWords } from '../utils/formatters';
import { getWeatherIconUrl } from '../services/weatherService';
import styles from '../styles/CurrentWeather.module.css';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  units: 'metric' | 'imperial';
}

export default function CurrentWeather({ data, units }: CurrentWeatherProps) {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.location}>
          <svg className={styles.locationIcon} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <h2 className={styles.cityName}>
            {data.cityName}, {data.country}
          </h2>
        </div>
        <div className={styles.lastUpdated}>
          Updated at {formatTime(data.timestamp)}
        </div>
      </div>

      <div className={styles.mainWeather}>
        <div className={styles.tempSection}>
          <div className={styles.iconWrapper}>
            <Image
              src={getWeatherIconUrl(data.icon)}
              alt={data.description}
              width={120}
              height={120}
              className={styles.weatherIcon}
            />
          </div>
          <div className={styles.tempInfo}>
            <div className={styles.temperature}>
              {data.temperature}
              <span className={styles.unit}>{tempUnit}</span>
            </div>
            <div className={styles.feelsLike}>
              Feels like {data.feelsLike}{tempUnit}
            </div>
            <div className={styles.condition}>
              {capitalizeWords(data.description)}
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <svg className={styles.detailIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
            <div className={styles.detailInfo}>
              <div className={styles.detailLabel}>Humidity</div>
              <div className={styles.detailValue}>{data.humidity}%</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <svg className={styles.detailIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5 2L10 8h6l-4.5 6L16 8h-6l4.5-6z" transform="rotate(45 12 12)" />
              <path d="M3.5 12a.5.5 0 01.5-.5h3a.5.5 0 010 1H4a.5.5 0 01-.5-.5zm13 0a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
            </svg>
            <div className={styles.detailInfo}>
              <div className={styles.detailLabel}>Wind Speed</div>
              <div className={styles.detailValue}>{data.windSpeed} {speedUnit}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <svg className={styles.detailIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <div className={styles.detailInfo}>
              <div className={styles.detailLabel}>Pressure</div>
              <div className={styles.detailValue}>{data.pressure} hPa</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <svg className={styles.detailIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
            <div className={styles.detailInfo}>
              <div className={styles.detailLabel}>Sunrise / Sunset</div>
              <div className={styles.detailValue}>
                {formatTime(data.sunrise)} / {formatTime(data.sunset)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
