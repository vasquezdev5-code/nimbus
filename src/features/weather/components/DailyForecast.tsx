import { motion } from "framer-motion";
import { Droplets, Wind } from "lucide-react";
import type { DailyWeather } from "@/types";
import type { TemperatureUnit } from "@/types";
import {
  getWeatherCondition,
  formatTemperature,
  formatDay,
} from "@/lib/weatherUtils";
import { cn } from "@/lib/utils";

interface DailyForecastProps {
  daily: DailyWeather[];
  unit: TemperatureUnit;
}

export function DailyForecast({ daily, unit }: DailyForecastProps) {
  const maxTemp = Math.max(...daily.map((d) => d.tempMax));
  const minTemp = Math.min(...daily.map((d) => d.tempMin));
  const tempRange = maxTemp - minTemp || 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="7-day forecast"
    >
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        7-Day Forecast
      </h2>

      <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
        {daily.map((day, i) => {
          const condition = getWeatherCondition(day.weatherCode);
          const highPct = ((day.tempMax - minTemp) / tempRange) * 100;
          const lowPct = ((day.tempMin - minTemp) / tempRange) * 100;

          return (
            <motion.div
              key={day.time.toISOString()}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5",
                "hover:bg-accent/30 transition-colors"
              )}
            >
              {/* Day */}
              <span
                className={cn(
                  "text-sm font-semibold w-20 shrink-0",
                  i === 0 ? "text-primary" : "text-foreground"
                )}
              >
                {formatDay(day.time, i)}
              </span>

              {/* Icon + rain */}
              <div className="flex items-center gap-1.5 w-20 shrink-0">
                <span className="text-lg" role="img" aria-label={condition.label}>
                  {condition.icon}
                </span>
                {day.precipitationProbabilityMax > 15 && (
                  <div className="flex items-center gap-0.5">
                    <Droplets className="h-3 w-3 text-sky-500" />
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                      {day.precipitationProbabilityMax}%
                    </span>
                  </div>
                )}
              </div>

              {/* Temp bar */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground w-12 text-right shrink-0">
                  {formatTemperature(day.tempMin, unit)}
                </span>

                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400"
                    style={{
                      left: `${lowPct}%`,
                      right: `${100 - highPct}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-semibold text-foreground w-12 shrink-0">
                  {formatTemperature(day.tempMax, unit)}
                </span>
              </div>

              {/* Wind */}
              <div className="hidden sm:flex items-center gap-1 w-20 shrink-0 justify-end">
                <Wind className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {Math.round(day.windSpeedMax)} km/h
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
