import { motion } from "framer-motion";
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Thermometer,
  MapPin,
} from "lucide-react";
import type { WeatherData } from "@/types";
import type { TemperatureUnit } from "@/types";
import {
  getWeatherCondition,
  formatTemperature,
  formatWindDirection,
} from "@/lib/weatherUtils";
import { cn } from "@/lib/utils";

interface CurrentWeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export function CurrentWeatherCard({ data, unit }: CurrentWeatherCardProps) {
  const { current, location } = data;
  const condition = getWeatherCondition(current.weatherCode);

  const stats = [
    {
      icon: Thermometer,
      label: "Feels like",
      value: formatTemperature(current.feelsLike, unit),
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${current.humidity}%`,
    },
    {
      icon: Wind,
      label: "Wind",
      value: `${Math.round(current.windSpeed)} km/h ${formatWindDirection(current.windDirection)}`,
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${Math.round(current.visibility / 1000)} km`,
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${Math.round(current.pressure)} hPa`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative rounded-3xl overflow-hidden p-6 md:p-8",
        "border border-white/20 dark:border-white/10",
        condition.bgClass,
        "shadow-lg"
      )}
    >
      {/* Ambient glow */}
      <div
        className={cn(
          "absolute inset-0 opacity-20 pointer-events-none",
          `bg-gradient-to-br ${condition.gradient}`
        )}
      />

      <div className="relative z-10">
        {/* Location */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-1.5 mb-6"
        >
          <MapPin className="h-4 w-4 text-foreground/60" />
          <span className="font-display text-sm font-semibold text-foreground/80 tracking-wide uppercase">
            {location.name}
            {location.admin1 ? `, ${location.admin1}` : ""}
          </span>
          {location.country_code && (
            <span className="text-xs text-foreground/50 ml-1">
              {location.country_code}
            </span>
          )}
        </motion.div>

        {/* Main temp + condition */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-8xl md:text-9xl leading-none font-display font-bold text-foreground tracking-tighter"
            >
              {formatTemperature(current.temperature, unit).replace("°C", "").replace("°F", "")}
              <span className="text-5xl md:text-6xl font-light text-foreground/60">
                {unit === "celsius" ? "°C" : "°F"}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-2 flex items-center gap-2"
            >
              <span className="text-2xl">{condition.icon}</span>
              <span className="text-lg text-foreground/70 font-medium">
                {condition.label}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={cn(
                "rounded-2xl p-3 backdrop-blur-sm",
                "bg-white/40 dark:bg-white/[0.06] border border-white/50 dark:border-white/10"
              )}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-3.5 w-3.5 text-foreground/50" />
                <span className="text-xs text-foreground/50 font-medium">{label}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
