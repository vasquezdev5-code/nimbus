import { AnimatePresence, motion } from "framer-motion";
import type { GeocodingResult } from "@/types";
import type { TemperatureUnit } from "@/types";
import { useWeather, useWeatherByCoords } from "../hooks/useWeather";
import { CurrentWeatherCard } from "./CurrentWeatherCard";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherSkeleton } from "./WeatherSkeleton";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";

interface WeatherDashboardProps {
  location: GeocodingResult | null;
  geoCoords: { latitude: number; longitude: number } | null;
  onGeolocate: () => void;
  geolocating: boolean;
  unit: TemperatureUnit;
}

export function WeatherDashboard({
  location,
  geoCoords,
  onGeolocate,
  geolocating,
  unit,
}: WeatherDashboardProps) {
  const locationQuery = useWeather(location);
  const coordsQuery = useWeatherByCoords(geoCoords && !location ? geoCoords : null);

  const query = location ? locationQuery : geoCoords ? coordsQuery : null;
  const isLoading = query?.isLoading ?? false;
  const isError = query?.isError ?? false;
  const data = query?.data ?? null;

  const isEmpty = !location && !geoCoords;

  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 py-6 pb-16">
      <AnimatePresence mode="wait">
        {isEmpty && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmptyState onGeolocate={onGeolocate} geolocating={geolocating} />
          </motion.div>
        )}

        {!isEmpty && isLoading && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WeatherSkeleton />
          </motion.div>
        )}

        {!isEmpty && isError && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ErrorState onRetry={() => query?.refetch()} />
          </motion.div>
        )}

        {!isEmpty && !isLoading && !isError && data && (
          <motion.div
            key={`${data.location.latitude}-${data.location.longitude}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <CurrentWeatherCard data={data} unit={unit} />
            <HourlyForecast hourly={data.hourly} unit={unit} />
            <DailyForecast daily={data.daily} unit={unit} />
            <WeatherDetails data={data} unit={unit} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
