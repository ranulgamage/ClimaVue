# API Reference - ClimaVue

## OpenWeatherMap API Integration

ClimaVue uses the OpenWeatherMap API for weather data. This document describes how the API is integrated and used.

---

## API Endpoints Used

### 1. Current Weather Data

**Endpoint**: `GET /data/2.5/weather`

**Parameters**:
- `q`: City name (e.g., "London", "New York,US")
- `units`: "metric" or "imperial"
- `appid`: Your API key

**Response Structure**:
```typescript
{
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: [{
    main: string;
    description: string;
    icon: string;
  }];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
  coord: {
    lat: number;
    lon: number;
  };
}
```

**Example**:
```
https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY
```

---

### 2. 5-Day / 3-Hour Forecast

**Endpoint**: `GET /data/2.5/forecast`

**Parameters**:
- `lat`: Latitude
- `lon`: Longitude
- `units`: "metric" or "imperial"
- `appid`: Your API key

**Response Structure**:
```typescript
{
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: [{
      main: string;
      description: string;
      icon: string;
    }];
    pop: number; // Probability of precipitation (0-1)
  }>;
}
```

**Usage**:
- Hourly forecast: First 8 items (24 hours)
- Daily forecast: Grouped by day, aggregated

**Example**:
```
https://api.openweathermap.org/data/2.5/forecast?lat=51.5074&lon=-0.1278&units=metric&appid=YOUR_API_KEY
```

---

## Service Layer

### weatherService.ts

Located at: `app/services/weatherService.ts`

#### Functions

##### `fetchWeatherData(city: string, units: Units): Promise<WeatherData>`

Main function to fetch all weather data.

**Parameters**:
- `city`: City name (e.g., "London", "Paris, FR")
- `units`: "metric" or "imperial"

**Returns**: Complete weather data object with current, hourly, and daily forecasts

**Example**:
```typescript
import { fetchWeatherData } from '@/app/services/weatherService';

const data = await fetchWeatherData('London', 'metric');
console.log(data.current.temperature);
console.log(data.hourly);
console.log(data.daily);
```

---

##### `getWeatherIconUrl(icon: string): string`

Constructs URL for weather icon.

**Parameters**:
- `icon`: Icon code from API (e.g., "01d", "10n")

**Returns**: Full URL to icon image

**Example**:
```typescript
const url = getWeatherIconUrl('01d');
// Returns: "https://openweathermap.org/img/wn/01d@2x.png"
```

---

## Type Definitions

### weather.ts

Located at: `app/types/weather.ts`

#### CurrentWeather

```typescript
interface CurrentWeather {
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
```

#### HourlyForecast

```typescript
interface HourlyForecast {
  time: number;
  temperature: number;
  precipitation: number;
  icon: string;
  description: string;
}
```

#### DailyForecast

```typescript
interface DailyForecast {
  date: number;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  description: string;
}
```

#### WeatherData

```typescript
interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}
```

#### Units

```typescript
type Units = 'metric' | 'imperial';
```

---

## Error Handling

### Error Types

1. **City Not Found (404)**
   - Message: "City not found. Please check the spelling and try again."
   
2. **API Error**
   - Message: "Failed to fetch weather data. Please try again later."

3. **Network Error**
   - Falls back to cached data if available

### Implementation

```typescript
try {
  const data = await fetchWeatherData(city, units);
  // Success
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  // Try cached data
  const cached = localStorage.getItem('climavue-last-weather');
  if (cached) {
    // Use cached data
  }
}
```

---

## Rate Limits

**Free Tier**:
- 1,000 API calls per day
- 60 calls per minute

**Recommendations**:
- Cache responses in localStorage
- Debounce search inputs
- Avoid unnecessary re-fetches

---

## API Key Security

### Best Practices

✅ **DO**:
- Use environment variables
- Prefix with `NEXT_PUBLIC_` for client-side access
- Never commit `.env` to version control
- Regenerate keys if exposed

❌ **DON'T**:
- Hardcode API keys in source code
- Share API keys publicly
- Use the same key for multiple projects

### Configuration

```bash
# .env file
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_secret_key_here
```

---

## Icon Codes

### Common Weather Icons

| Code | Description | Time |
|------|-------------|------|
| 01d | Clear sky | Day |
| 01n | Clear sky | Night |
| 02d | Few clouds | Day |
| 02n | Few clouds | Night |
| 03d/n | Scattered clouds | Any |
| 04d/n | Broken clouds | Any |
| 09d/n | Shower rain | Any |
| 10d | Rain | Day |
| 10n | Rain | Night |
| 11d/n | Thunderstorm | Any |
| 13d/n | Snow | Any |
| 50d/n | Mist | Any |

**Size Options**:
- `@2x`: 100x100 pixels
- `@4x`: 200x200 pixels (higher quality)

---

## Units

### Metric (Default)

- Temperature: Celsius (°C)
- Wind Speed: meter/sec (m/s)
- Pressure: hPa

### Imperial

- Temperature: Fahrenheit (°F)
- Wind Speed: miles/hour (mph)
- Pressure: hPa

---

## Utilities

### formatters.ts

Located at: `app/utils/formatters.ts`

#### `formatTime(timestamp: number): string`

Converts Unix timestamp to readable time.

**Example**:
```typescript
formatTime(1642348800);
// Returns: "3:20 PM"
```

#### `formatDate(timestamp: number): string`

Converts Unix timestamp to readable date.

**Example**:
```typescript
formatDate(1642348800);
// Returns: "Mon, Jan 16"
```

#### `formatDayOfWeek(timestamp: number): string`

Converts Unix timestamp to day of week with special handling.

**Example**:
```typescript
formatDayOfWeek(todayTimestamp);    // "Today"
formatDayOfWeek(tomorrowTimestamp); // "Tomorrow"
formatDayOfWeek(futureTimestamp);   // "Wednesday"
```

#### `isNightTime(current: number, sunrise: number, sunset: number): boolean`

Determines if it's nighttime.

**Example**:
```typescript
if (isNightTime(currentTime, sunrise, sunset)) {
  // Show moon icon
}
```

#### `getWeatherBackground(condition: string, isNight: boolean): string`

Returns CSS class name for weather background.

**Example**:
```typescript
const bgClass = getWeatherBackground('Clear', false);
// Returns: "sunny"
```

---

## Custom Hooks

### useWeather

Located at: `app/hooks/useWeather.ts`

Manages weather data fetching and state.

**Usage**:
```typescript
const { data, loading, error, fetchWeather } = useWeather('London', 'metric');

// Fetch new city
await fetchWeather('Paris');
```

---

## Additional Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Weather Condition Codes](https://openweathermap.org/weather-conditions)
- [API FAQ](https://openweathermap.org/faq)

---

**Developed by Ranul Gamage - RGDev**
