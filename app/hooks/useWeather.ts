/**
 * useWeather Hook
 * Custom hook for fetching and managing weather data
 * Handles loading states, errors, and data caching
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { WeatherData, Units } from '../types/weather';

interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

export function useWeather(initialCity: string = 'London', units: Units = 'metric'): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherData(city, units);
      setData(weatherData);
      
      // Cache the last successful response for offline fallback
      try {
        localStorage.setItem('climavue-last-weather', JSON.stringify(weatherData));
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
          setData(JSON.parse(cached));
          setError(errorMessage + ' (showing cached data)');
        }
      } catch (e) {
        // Ignore cache errors
      }
    } finally {
      setLoading(false);
    }
  }, [units]);

  // Fetch initial weather on mount
  useEffect(() => {
    fetchWeather(initialCity);
  }, [fetchWeather, initialCity]);

  return { data, loading, error, fetchWeather };
}
