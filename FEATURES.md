# ClimaVue - Feature Documentation

## 🎯 Core Features

### 1. Current Weather Display

**Components**: `CurrentWeather.tsx`

Displays real-time weather information including:
- Current temperature with unit display (°C/°F)
- "Feels like" temperature
- Weather condition with description
- Animated weather icon from OpenWeatherMap
- City name and country code
- Last updated timestamp

**Metrics**:
- 💧 Humidity (%)
- 🌬️ Wind Speed (m/s or mph)
- 🌡️ Atmospheric Pressure (hPa)
- 🌅 Sunrise and Sunset times

**Styling**: Glassmorphism card design with hover effects

---

### 2. Hourly Forecast

**Components**: `HourlyForecast.tsx`

**Features**:
- Next 24 hours forecast (8 data points, 3-hour intervals)
- Horizontal scrollable layout
- For each hour shows:
  - Time (12-hour format)
  - Temperature
  - Weather icon
  - Precipitation probability (if > 0%)

**UX**:
- Custom scrollbar styling
- Smooth scroll behavior
- Hover effects on individual hour cards
- Mobile-optimized touch scrolling

---

### 3. 7-Day Forecast

**Components**: `DailyForecast.tsx`

**Features**:
- Weekly weather outlook
- Shows "Today" and "Tomorrow" labels
- For each day displays:
  - Day of week
  - Weather icon
  - High/low temperatures
  - Rain probability
  - Humidity level

**Layout**:
- Grid layout for desktop
- Stacked cards for mobile
- Progressive detail hiding on smaller screens

---

### 4. Search Functionality

**Components**: `SearchBar.tsx`

**Features**:
- City name search with autocomplete
- Keyboard support (Enter to submit)
- Recent searches (up to 5, stored in localStorage)
- Clear button for quick input reset
- Loading state during API calls
- Error handling with user-friendly messages

**UX**:
- Focus states
- Disabled state during loading
- Recent searches dropdown
- Smooth animations

---

### 5. Dark Mode

**Implementation**: `useDarkMode.ts` hook

**Features**:
- Toggle between light and dark themes
- Persists preference in localStorage
- Detects system preference on first visit
- Smooth transitions between themes
- Updates CSS variables dynamically
- Animated toggle button with icon change

**CSS Variables**:
- Primary colors
- Background colors
- Text colors
- Border colors
- Shadow values
- All adapt to theme

---

### 6. Unit Toggle

**Features**:
- Switch between Celsius and Fahrenheit
- Converts wind speed (m/s ↔ mph)
- Persists preference in localStorage
- Re-fetches data with new units
- Visual indicator of active unit

---

### 7. Weather-Based Backgrounds

**Implementation**: Dynamic body class changes

**Weather Conditions**:
- ☀️ **Sunny**: Warm yellow gradient
- ☁️ **Cloudy**: Cool blue-purple gradient
- 🌧️ **Rainy**: Gray gradient
- ❄️ **Snowy**: Light blue gradient
- ⛈️ **Stormy**: Dark dramatic gradient
- 🌫️ **Foggy**: Soft gray gradient
- 🌙 **Night**: Dark blue gradient

**Adaptive**:
- Light mode: Bright, vibrant gradients
- Dark mode: Darker, subdued versions
- Smooth transitions (0.5s)

---

### 8. Loading States

**Components**:
- `LoadingScreen.tsx`: Full-screen initial load
- `SkeletonLoader.tsx`: Content placeholder

**Features**:
- ClimaVue logo with pulse animation
- Spinning loader
- Skeleton screens for weather cards
- Shimmer effect on placeholders
- Prevents layout shift

---

### 9. Error Handling

**Component**: `ErrorMessage.tsx`

**Features**:
- User-friendly error messages
- Retry button
- Offline fallback (shows cached data)
- Specific error messages:
  - City not found
  - Network errors
  - API errors
- Warning banner for cached data

---

### 10. Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Adaptations**:
- Mobile: Stacked layout, simplified cards
- Tablet: Grid layouts, all features visible
- Desktop: Full layout, hover effects

**Features**:
- Mobile-first CSS
- Touch-friendly tap targets
- No horizontal scroll
- Optimized font sizes
- Flexible images

---

### 11. Performance Optimizations

**Techniques**:
- Next.js automatic code splitting
- Optimized images with `next/image`
- CSS Modules for scoped styles
- Minimal re-renders with React.memo
- Efficient state management
- localStorage caching

**Loading Performance**:
- Lazy loading of components
- Prefetching of critical resources
- Optimized API calls
- Debounced search input

---

### 12. Accessibility (a11y)

**Features**:
- Semantic HTML elements
- ARIA labels on all buttons
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast (WCAG AA)
- Screen reader friendly
- Alternative text for images
- Reduced motion support

---

### 13. Data Persistence

**localStorage Keys**:
- `climavue-dark-mode`: Dark mode preference
- `climavue-units`: Temperature units
- `climavue-last-city`: Last searched city
- `climavue-recent-searches`: Recent search history
- `climavue-last-weather`: Cached weather data

**Benefits**:
- Persists user preferences
- Offline fallback capability
- Faster subsequent loads
- Improved UX

---

### 14. PWA Support (Progressive Web App)

**Features**:
- Web app manifest
- Installable on mobile devices
- Standalone display mode
- App icons configured
- Theme color for mobile browsers

---

## 🔧 Technical Implementation

### Custom Hooks

1. **useWeather**: Weather data fetching and state management
2. **useLocalStorage**: Generic localStorage hook with type safety
3. **useDarkMode**: Dark mode with system preference detection

### Services

1. **weatherService**: Centralized API integration
   - Current weather fetching
   - Hourly forecast
   - Daily forecast
   - Coordinate lookup
   - Error handling

### Utilities

1. **formatters**: Date/time formatting, weather backgrounds
   - Time formatting (12-hour)
   - Date formatting
   - Day of week with "Today"/"Tomorrow"
   - Night time detection
   - Weather condition mapping

---

## 🎨 Design System

### Colors

**Primary**: Blue (#3b82f6 / #60a5fa)
**Success**: Green (for positive indicators)
**Error**: Red (#ef4444)
**Warning**: Yellow/Orange

### Typography

**Font**: System font stack for optimal performance
**Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing

Consistent 8px grid system

### Border Radius

- Small: 8px
- Medium: 12px
- Large: 20px
- Full: 50% (circles)

### Shadows

- Card: Subtle elevation
- Hover: Enhanced elevation
- Focus: Color-based outline

---

## 🚀 Future Enhancements

Potential features to add:
- [ ] Geolocation support
- [ ] Weather alerts/warnings
- [ ] Air quality index
- [ ] UV index display
- [ ] Animated weather icons
- [ ] Multi-city comparison
- [ ] Weather maps
- [ ] Export/share weather data
- [ ] Weather widgets
- [ ] Voice search

---

**Developed by Ranul Gamage - RGDev**
