import { motion } from "framer-motion";
import {
  Sunrise,
  Sunset,
  Umbrella,
  Zap,
  Wind,
  Droplets,
  Eye,
  Thermometer,
} from "lucide-react";
import type { WeatherData } from "@/types";
import type { TemperatureUnit } from "@/types";
import { formatTemperature, formatTime, getUvIndexLabel } from "@/lib/weatherUtils";
import { cn } from "@/lib/utils";

interface WeatherDetailsProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  subColor?: string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, subValue, subColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-card border border-border p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-secondary p-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div>
        <p className="text-xl font-bold text-foreground font-display">{value}</p>
        {subValue && (
          <p className={cn("text-xs mt-0.5 font-medium", subColor ?? "text-muted-foreground")}>
            {subValue}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function WeatherDetails({ data, unit }: WeatherDetailsProps) {
  const { current, daily } = data;
  const today = daily[0];
  const uvLabel = getUvIndexLabel(current.uvIndex);

  const stats = [
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(today.sunrise),
      subValue: `Sunset ${formatTime(today.sunset)}`,
    },
    {
      icon: Zap,
      label: "UV Index",
      value: String(Math.round(current.uvIndex)),
      subValue: uvLabel.label,
      subColor: uvLabel.color,
    },
    {
      icon: Umbrella,
      label: "Precipitation",
      value: `${today.precipitationSum.toFixed(1)} mm`,
      subValue: `${today.precipitationProbabilityMax}% chance`,
    },
    {
      icon: Wind,
      label: "Wind Gusts",
      value: `${Math.round(current.windGusts)} km/h`,
      subValue: `Sustained ${Math.round(current.windSpeed)} km/h`,
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${current.humidity}%`,
      subValue: current.humidity > 70 ? "High" : current.humidity > 40 ? "Comfortable" : "Low",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      subValue: current.visibility > 10000 ? "Excellent" : current.visibility > 5000 ? "Good" : "Poor",
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: formatTemperature(current.feelsLike, unit),
      subValue:
        current.feelsLike < current.temperature
          ? `${Math.round(current.temperature - current.feelsLike)}° colder`
          : current.feelsLike > current.temperature
          ? `${Math.round(current.feelsLike - current.temperature)}° warmer`
          : "Same as actual",
    },
    {
      icon: Sunset,
      label: "Day Length",
      value: (() => {
        const mins = Math.round((today.sunset.getTime() - today.sunrise.getTime()) / 60000);
        return `${Math.floor(mins / 60)}h ${mins % 60}m`;
      })(),
      subValue: "Daylight hours",
    },
  ];

  return (
    <section aria-label="Weather details">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        Details
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={0.05 * i} />
        ))}
      </div>
    </section>
  );
}
