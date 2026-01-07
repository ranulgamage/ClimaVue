/**
 * ClimaVue - Main Page Component
 * Production-ready weather forecast application
 * Developed by Ranul Gamage - RGDev
 */

'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';
import SkeletonLoader from './components/SkeletonLoader';
import Footer from './components/Footer';
import BackgroundVideo from './components/BackgroundVideo';
import { useDarkMode } from './hooks/useDarkMode';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGeolocation } from './hooks/useGeolocation';
import { fetchWeatherData, fetchWeatherByCoords } from './services/weatherService';
import { WeatherData, Units } from './types/weather';
import { getWeatherBackground, isNightTime } from './utils/formatters';

export default function Home() {
  const [isDark, toggleDarkMode] = useDarkMode();
  const [units, setUnits] = useLocalStorage<Units>('climavue-units', 'metric');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [weatherBackground, setWeatherBackground] = useState<string>('default');
  const { getCurrentLocation, loading: geoLoading } = useGeolocation();

  // Default city
  const [currentCity, setCurrentCity] = useLocalStorage<string>('climavue-last-city', 'London');
  const [useGeolocationPref, setUseGeolocationPref] = useLocalStorage<boolean>('climavue-use-geolocation', false);

  // Fetch weather data
  const handleFetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(city, units);
      setWeatherData(data);
      setCurrentCity(city);
      
      // Cache the last successful response for offline fallback
      try {
        localStorage.setItem('climavue-last-weather', JSON.stringify(data));
      } catch (e) {
        // Ignore localStorage errors
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      
      // Try to load cached data as fallback
      try {
        const cached = localStorage.getItem('climavue-last-weather');
        if (cached) {
          setWeatherData(JSON.parse(cached));
          setError(errorMessage + ' (showing cached data)');
        }
      } catch (e) {
        // Ignore cache errors
      }
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  // Fetch weather by current location
  const handleFetchCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await getCurrentLocation();
      const data = await fetchWeatherByCoords(coords.lat, coords.lon, units);
      setWeatherData(data);
      setUseGeolocationPref(true);
      
      // Cache the last successful response
      try {
        localStorage.setItem('climavue-last-weather', JSON.stringify(data));
      } catch (e) {
        // Ignore localStorage errors
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get your location';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  // Toggle temperature units
  const toggleUnits = () => {
    const newUnits: Units = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    // Refetch with new units
    if (useGeolocationPref) {
      handleFetchCurrentLocation();
    } else if (currentCity) {
      handleFetchWeather(currentCity);
    }
  };

  // Initial data fetch
  useEffect(() => {
    // Try to get current location first, fall back to default city if it fails
    const initializeWeather = async () => {
      if (useGeolocationPref) {
        // User previously chose geolocation
        handleFetchCurrentLocation();
      } else {
        // First time or user prefers city search - try geolocation first
        try {
          const coords = await getCurrentLocation();
          const data = await fetchWeatherByCoords(coords.lat, coords.lon, units);
          setWeatherData(data);
          setUseGeolocationPref(true);
          setLoading(false);
          setInitialLoad(false);
          
          // Cache the response
          try {
            localStorage.setItem('climavue-last-weather', JSON.stringify(data));
          } catch (e) {
            // Ignore
          }
        } catch (err) {
          // Geolocation failed, use default city
          handleFetchWeather(currentCity);
        }
      }
    };

    initializeWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update body class based on weather condition
  useEffect(() => {
    if (weatherData?.current) {
      const isNight = isNightTime(
        weatherData.current.timestamp,
        weatherData.current.sunrise,
        weatherData.current.sunset
      );
      const bgClass = getWeatherBackground(weatherData.current.condition, isNight);
      
      // Update video background
      setWeatherBackground(bgClass);
      
      // Remove all weather classes
      document.body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy', 'night', 'default');
      
      // Add current weather class
      document.body.classList.add(bgClass);
    }
  }, [weatherData]);

  // Show full-screen loading only on initial load
  if (initialLoad && loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <BackgroundVideo weatherCondition={weatherBackground} />
      
      <Header
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        units={units}
        toggleUnits={toggleUnits}
      />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', minHeight: 'calc(100vh - 200px)' }}>
        <SearchBar 
          onSearch={handleFetchWeather} 
          loading={loading} 
          onGetCurrentLocation={handleFetchCurrentLocation}
          geoLoading={geoLoading}
        />

        {error && !weatherData && (
          <ErrorMessage
            message={error}
            onRetry={() => handleFetchWeather(currentCity)}
          />
        )}

        {error && weatherData && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#ef4444',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {loading && !initialLoad ? (
          <SkeletonLoader />
        ) : weatherData ? (
          <>
            <CurrentWeather data={weatherData.current} units={units} />
            <HourlyForecast data={weatherData.hourly} units={units} />
            <DailyForecast data={weatherData.daily} units={units} />
          </>
        ) : null}
      </main>

      <Footer />
    </>
  );
}

