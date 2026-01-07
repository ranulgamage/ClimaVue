import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ClimaVue - Weather Forecast',
    short_name: 'ClimaVue',
    description: 'Professional weather forecast application with current conditions, hourly and 7-day forecasts',
    start_url: '/',
    display: 'standalone',
    background_color: '#3b82f6',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/climavue_logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
