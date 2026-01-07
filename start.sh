#!/bin/bash

# ClimaVue Quick Start Script
# Developed by Ranul Gamage - RGDev

echo "🌤️  ClimaVue - Weather Forecast Application"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo ""
    echo "Creating .env from example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please add your OpenWeatherMap API key to .env file"
    echo ""
    echo "Get your free API key from: https://openweathermap.org/api"
    echo ""
    read -p "Press Enter after you've added your API key to continue..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "The app will be available at: http://localhost:3000"
echo ""
echo "Features:"
echo "  ✅ Current weather with detailed metrics"
echo "  ✅ 24-hour hourly forecast"
echo "  ✅ 7-day daily forecast"
echo "  ✅ Dark mode toggle"
echo "  ✅ Celsius/Fahrenheit toggle"
echo "  ✅ Responsive design"
echo "  ✅ Weather-based backgrounds"
echo ""

npm run dev
