/**
 * Type definitions for weather data structures
 * Used throughout the ClimaVue application
 */

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cityName: string;
  country: string;
  timestamp: number;
  sunrise: number;
  sunset: number;
}

export interface HourlyForecast {
  time: number;
  temperature: number;
  precipitation: number;
  icon: string;
  description: string;
}

export interface DailyForecast {
  date: number;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  description: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export type Units = 'metric' | 'imperial';

export interface WeatherError {
  message: string;
  code?: string;
}
