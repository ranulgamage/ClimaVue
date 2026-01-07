/**
 * Weather Service
 * Centralized API service for OpenWeatherMap integration
 * Handles all weather data fetching and transformation
 */

import { WeatherData, CurrentWeather, HourlyForecast, DailyForecast, Units } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

// Validate API key on module load
if (!API_KEY) {
  console.error('⚠️ NEXT_PUBLIC_OPENWEATHER_API_KEY is not set in environment variables!');
  console.error('Please create a .env file with your OpenWeatherMap API key.');
  console.error('Get your free API key from: https://openweathermap.org/api');
}

/**
 * Fetches current weather data for a given city
 */
async function fetchCurrentWeather(city: string, units: Units): Promise<CurrentWeather> {
  if (!API_KEY) {
    throw new Error('API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env file.');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }

  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    pressure: data.main.pressure,
    cityName: data.name,
    country: data.sys.country,
    timestamp: data.dt,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}

/**
 * Fetches hourly forecast data using One Call API
 */
async function fetchHourlyForecast(lat: number, lon: number, units: Units): Promise<HourlyForecast[]> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hourly forecast.');
  }

  const data = await response.json();

  // Get next 24 hours (8 data points, each 3 hours apart)
  return data.list.slice(0, 8).map((item: any) => ({
    time: item.dt,
    temperature: Math.round(item.main.temp),
    precipitation: item.pop * 100, // Probability of precipitation as percentage
    icon: item.weather[0].icon,
    description: item.weather[0].description,
  }));
}

/**
 * Fetches 7-day forecast data
 */
async function fetchDailyForecast(lat: number, lon: number, units: Units): Promise<DailyForecast[]> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch daily forecast.');
  }

  const data = await response.json();

  // Group by day and get daily stats
  const dailyData: { [key: string]: any[] } = {};
  
  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  const dailyForecasts: DailyForecast[] = Object.entries(dailyData)
    .slice(0, 7)
    .map(([date, items]) => {
      const temps = items.map((item: any) => item.main.temp);
      const tempMax = Math.round(Math.max(...temps));
      const tempMin = Math.round(Math.min(...temps));
      
      // Use the most common weather condition
      const conditions = items.map((item: any) => item.weather[0].main);
      const condition = conditions.sort((a: string, b: string) =>
        conditions.filter((v: string) => v === a).length - conditions.filter((v: string) => v === b).length
      ).pop() || '';

      const icon = items[Math.floor(items.length / 2)].weather[0].icon;
      const description = items[Math.floor(items.length / 2)].weather[0].description;
      
      // Average precipitation probability
      const precipitation = items.reduce((sum: number, item: any) => sum + item.pop, 0) / items.length * 100;
      const humidity = Math.round(items.reduce((sum: number, item: any) => sum + item.main.humidity, 0) / items.length);

      return {
        date: items[0].dt,
        tempMax,
        tempMin,
        condition,
        icon,
        precipitation: Math.round(precipitation),
        humidity,
        description,
      };
    });

  return dailyForecasts;
}

/**
 * Fetches coordinates for a city
 */
async function fetchCoordinates(city: string): Promise<{ lat: number; lon: number }> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('City not found');
  }

  const data = await response.json();
  return {
    lat: data.coord.lat,
    lon: data.coord.lon,
  };
}

/**
 * Fetches current weather by coordinates
 */
async function fetchCurrentWeatherByCoords(lat: number, lon: number, units: Units): Promise<CurrentWeather> {
  if (!API_KEY) {
    throw new Error('API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env file.');
  }

  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data for your location.');
  }

  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    pressure: data.main.pressure,
    cityName: data.name,
    country: data.sys.country,
    timestamp: data.dt,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}

/**
 * Main function to fetch complete weather data by city name
 */
export async function fetchWeatherData(city: string, units: Units = 'metric'): Promise<WeatherData> {
  try {
    // Fetch current weather first to get coordinates
    const current = await fetchCurrentWeather(city, units);
    
    // Get coordinates from the city search
    const coords = await fetchCoordinates(city);
    
    // Fetch hourly and daily forecasts in parallel
    const [hourly, daily] = await Promise.all([
      fetchHourlyForecast(coords.lat, coords.lon, units),
      fetchDailyForecast(coords.lat, coords.lon, units),
    ]);

    return {
      current,
      hourly,
      daily,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Fetch complete weather data by coordinates (for geolocation)
 */
export async function fetchWeatherByCoords(lat: number, lon: number, units: Units = 'metric'): Promise<WeatherData> {
  try {
    // Fetch hourly and daily forecasts in parallel with current weather
    const [current, hourly, daily] = await Promise.all([
      fetchCurrentWeatherByCoords(lat, lon, units),
      fetchHourlyForecast(lat, lon, units),
      fetchDailyForecast(lat, lon, units),
    ]);

    return {
      current,
      hourly,
      daily,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Get weather icon URL from icon code
 */
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
