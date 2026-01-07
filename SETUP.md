# ClimaVue Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Get OpenWeatherMap API Key

1. Visit https://openweathermap.org/api
2. Click "Sign Up" (if you don't have an account)
3. After signing in, go to "API keys" section
4. Copy your default API key (or generate a new one)

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

**Important**: 
- Replace `your_actual_api_key_here` with your real API key
- Do NOT commit this file to version control
- The `.env.example` file is provided as a template

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

### 5. Build for Production

```bash
npm run build
npm start
```

## Features Overview

✅ **Current Weather**: Real-time temperature, conditions, humidity, wind, pressure
✅ **Hourly Forecast**: Next 24 hours with precipitation probability
✅ **7-Day Forecast**: Daily high/low temperatures and conditions
✅ **Search**: Find weather for any city worldwide
✅ **Dark Mode**: Toggle between light and dark themes
✅ **Unit Toggle**: Switch between Celsius and Fahrenheit
✅ **Responsive**: Works perfectly on mobile, tablet, and desktop
✅ **Offline Support**: Shows cached data when offline
✅ **Weather Backgrounds**: Dynamic gradients based on conditions

## Troubleshooting

### "City not found" error
- Check the city name spelling
- Try adding country code: "London, UK"
- Some small towns may not be available

### API key not working
1. Ensure the `.env` file is in the root directory
2. Verify the variable name is `NEXT_PUBLIC_OPENWEATHER_API_KEY`
3. Restart the development server after adding the key
4. Wait a few minutes after generating a new API key (activation delay)

### Styles not loading
- Clear your browser cache
- Run `npm run dev` again
- Check browser console for errors

### Dark mode issues
- Clear localStorage: Open browser console and run `localStorage.clear()`
- Refresh the page

## Project Structure

```
climavue/
├── app/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── services/       # API integration
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Helper functions
│   └── styles/         # CSS modules
├── public/             # Static assets
└── .env               # Environment variables (create this)
```

## Additional Resources

- **OpenWeatherMap API Docs**: https://openweathermap.org/api
- **Next.js Documentation**: https://nextjs.org/docs
- **React Hooks Guide**: https://react.dev/reference/react

## Support

For issues or questions, please refer to the main README.md file.

---

Developed by **Ranul Gamage** - **RGDev**
