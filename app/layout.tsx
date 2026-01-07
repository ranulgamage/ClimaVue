import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClimaVue - Weather Forecast with Precision",
  description: "Professional weather forecast application with current conditions, hourly and 7-day forecasts. Developed by Ranul Gamage - RGDev",
  keywords: "weather, forecast, climate, temperature, ClimaVue",
  authors: [{ name: "Ranul Gamage", url: "https://rgdev.com" }],
  icons: {
    icon: "/climavue_logo.png",
    apple: "/climavue_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

