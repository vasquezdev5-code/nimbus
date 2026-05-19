import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/features/search/components/SearchBar";
import { WeatherDashboard } from "@/features/weather/components/WeatherDashboard";
import { useTheme } from "@/hooks/useTheme";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { GeocodingResult, TemperatureUnit } from "@/types";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem("unit") as TemperatureUnit) ?? "celsius";
  });
  const [selectedLocation, setSelectedLocation] = useState<GeocodingResult | null>(null);

  const { locate, loading: geolocating, coords: geoCoords } = useGeolocation();

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  function handleLocationSelect(loc: GeocodingResult) {
    setSelectedLocation(loc);
  }

  function handleGeolocate() {
    setSelectedLocation(null);
    locate();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        theme={theme}
        onThemeChange={setTheme}
        unit={unit}
        onUnitChange={setUnit}
      />

      {/* Search section */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-2">
        <SearchBar
          onSelect={handleLocationSelect}
          onGeolocate={handleGeolocate}
          geolocating={geolocating}
        />
      </div>

      <AnimatePresence mode="wait">
        <WeatherDashboard
          key={selectedLocation?.id ?? (geoCoords ? "geo" : "empty")}
          location={selectedLocation}
          geoCoords={geoCoords}
          onGeolocate={handleGeolocate}
          geolocating={geolocating}
          unit={unit}
        />
      </AnimatePresence>

      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        <p>
          Powered by{" "}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline underline-offset-4"
          >
            Open-Meteo
          </a>{" "}
          · Free & open-source weather API
        </p>
      </footer>
    </div>
  );
}
