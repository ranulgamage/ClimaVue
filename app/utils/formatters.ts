/**
 * Utility functions for formatting and data manipulation
 */

/**
 * Formats Unix timestamp to readable time string
 */
export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats Unix timestamp to readable date string
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats Unix timestamp to day of week
 */
export function formatDayOfWeek(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Determines if it's currently night time based on sunrise/sunset
 */
export function isNightTime(currentTime: number, sunrise: number, sunset: number): boolean {
  return currentTime < sunrise || currentTime > sunset;
}

/**
 * Gets background gradient class based on weather condition and time
 */
export function getWeatherBackground(condition: string, isNight: boolean): string {
  if (isNight) return 'night';

  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes('clear')) return 'sunny';
  if (normalizedCondition.includes('cloud')) return 'cloudy';
  if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) return 'rainy';
  if (normalizedCondition.includes('snow')) return 'snowy';
  if (normalizedCondition.includes('storm') || normalizedCondition.includes('thunderstorm')) return 'stormy';
  if (normalizedCondition.includes('mist') || normalizedCondition.includes('fog')) return 'foggy';

  return 'default';
}

/**
 * Capitalizes first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
