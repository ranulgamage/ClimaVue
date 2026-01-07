/**
 * BackgroundVideo Component
 * Dynamic video backgrounds based on weather conditions
 */

'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/BackgroundVideo.module.css';

interface BackgroundVideoProps {
  weatherCondition: string;
}

export default function BackgroundVideo({ weatherCondition }: BackgroundVideoProps) {
  const [currentVideo, setCurrentVideo] = useState<string>(weatherCondition);

  useEffect(() => {
    setCurrentVideo(weatherCondition);
  }, [weatherCondition]);

  return (
    <div className={styles.videoContainer}>
      <video
        key={currentVideo}
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={`/${currentVideo}.mp4`} type="video/mp4" />
      </video>
      <div className={styles.overlay}></div>
    </div>
  );
}
