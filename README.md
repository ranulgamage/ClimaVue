# ClimaVue ☀️

**Forecast with Precision**

A production-ready weather forecast web application built with React and Next.js, featuring real-time weather data, hourly and 7-day forecasts, dark mode, and beautiful weather-based backgrounds.

![ClimaVue Logo](public/climavue_logo.png)

---

## ✨ Features

### 🌤️ Current Weather
- Real-time temperature with "feels like" indicator
- Weather condition with animated icons
- Humidity, wind speed, and atmospheric pressure
- Sunrise and sunset times
- City name and country display
- Last updated timestamp

### ⏰ Hourly Forecast
- Next 24 hours weather prediction
- Temperature trends
- Precipitation probability
- Scrollable horizontal layout
- Clean visual separation per hour

### 📅 7-Day Forecast
- Daily high/low temperatures
- Weather condition icons
- Rain probability
- Humidity levels
- Compact, readable layout

### 🔍 Location Search
- Search by city name
- **Auto-detect current location** on first visit
- One-click current location button
- Keyboard-friendly (Enter to search)
- Recent searches stored in localStorage
- Error handling for invalid locations
- Geolocation permission handling
- Clear search functionality

### 🎨 UI/UX Features
- **Dark Mode**: Toggle between light and dark themes
- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **Modern Header**: Permanent dark theme with blue gradient accents and glow effects
- **Responsive Design**: Mobile-first, works on all devices
- **Weather Backgrounds**: Dynamic gradients based on conditions (sunny, cloudy, rainy, night, etc.)
- **Skeleton Loaders**: Smooth loading states with enhanced loading screen
- **Animations**: Smooth transitions, hover effects, and glassmorphism UI
- **Auto-Location**: Detects your location automatically on first visit
- **Offline Fallback**: Shows cached data when offline

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: CSS Modules (no UI frameworks)
- **API**: OpenWeatherMap API
- **Data Fetching**: Native Fetch API
- **State Management**: React Hooks
- **Storage**: localStorage for preferences and caching

---

## 📁 Project Structure

```
climavue/
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── DailyForecast.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── SkeletonLoader.tsx
│   │   └── Footer.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useWeather.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDarkMode.ts
│   │   └── useGeolocation.ts
│   ├── services/           # API services
│   │   └── weatherService.ts
│   ├── types/              # TypeScript types
│   │   └── weather.ts
│   ├── utils/              # Utility functions
│   │   └── formatters.ts
│   ├── styles/             # CSS Modules
│   │   ├── Header.module.css
│   │   ├── SearchBar.module.css
│   │   ├── CurrentWeather.module.css
│   │   ├── HourlyForecast.module.css
│   │   ├── DailyForecast.module.css
│   │   ├── LoadingScreen.module.css
│   │   ├── ErrorMessage.module.css
│   │   ├── SkeletonLoader.module.css
│   │   └── Footer.module.css
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── public/
│   ├── climavue_logo.png   # App logo
│   └── logo-rgdev.png      # Company logo
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd climavue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Generate a new API key
5. Copy the key and paste it in your `.env` file

**Note**: Free tier allows 1,000 API calls per day, which is sufficient for development and personal use.

---

## 📦 Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 🎯 Features in Detail

### State Management
- Custom hooks for weather data fetching and geolocation
- localStorage integration for persistence and user preferences
- Auto-detect user location on first visit
- Optimistic UI updates
- Error handling with fallback to cached data

### Performance Optimizations
- Code splitting with Next.js
- Lazy loading of components
- Optimized images with Next.js Image
- Minimal re-renders with proper memoization

### Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus visible states

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly interface

---

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |

---

## 🎨 Customization

### Weather Backgrounds

Weather backgrounds are defined in `globals.css`. You can customize gradients for different conditions:

```css
body.sunny {
  background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%);
}
```

### Color Scheme

Primary colors and theme variables are in `globals.css`:

```css
:root {
  --primary-color: #3b82f6;
  --primary-color-dark: #2563eb;
  /* ... more variables */
}
```

---

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is correctly added to `.env`
- Make sure the key starts with `NEXT_PUBLIC_`
- Restart the dev server after adding the key

### Location Not Found
- Check spelling of city name
- Try adding country code (e.g., "London, UK")
- Some small towns may not be in the database

### Dark Mode Not Working
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors

---

## 📄 License

This project is open source and available for educational and personal use.

---

## 👨‍💻 Developer

**Ranul Gamage**

Developed by Ranul Gamage

![RGDev Logo](public/logo-rgdev.png)

**Company**: RGDev

---

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Icons from OpenWeatherMap
- Built with [Next.js](https://nextjs.org)
- Deployed on [Vercel](https://vercel.com)

---

## 📞 Support

For issues, questions, or feature requests, please open an issue on the repository.

---

**ClimaVue** - Forecast with Precision ☀️🌤️⛈️


