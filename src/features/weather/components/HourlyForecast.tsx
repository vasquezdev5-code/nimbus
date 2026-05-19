import { useRef } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import type { HourlyWeather } from "@/types";
import type { TemperatureUnit } from "@/types";
import { getWeatherCondition, formatTemperature, formatHour } from "@/lib/weatherUtils";
import { cn } from "@/lib/utils";

interface HourlyForecastProps {
  hourly: HourlyWeather[];
  unit: TemperatureUnit;
}

export function HourlyForecast({ hourly, unit }: HourlyForecastProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Hourly forecast"
    >
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        Hourly Forecast
      </h2>

      <div
        ref={scrollRef}
        className={cn(
          "flex gap-2 overflow-x-auto pb-2",
          "scrollbar-thin scroll-smooth snap-x snap-mandatory"
        )}
      >
        {hourly.map((hour, i) => {
          const condition = getWeatherCondition(hour.weatherCode);
          const isNow = i === 0;

          return (
            <motion.div
              key={hour.time.toISOString()}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * Math.min(i, 8), duration: 0.3 }}
              className={cn(
                "snap-start shrink-0 flex flex-col items-center gap-2",
                "rounded-2xl p-3 min-w-[72px]",
                "border transition-colors",
                isNow
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card border-border hover:border-border/80 hover:bg-accent/30"
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold",
                  isNow ? "text-primary" : "text-muted-foreground"
                )}
              >
                {isNow ? "Now" : formatHour(hour.time)}
              </span>

              <span className="text-xl" role="img" aria-label={condition.label}>
                {condition.icon}
              </span>

              <span className="text-sm font-bold text-foreground">
                {formatTemperature(hour.temperature, unit)}
              </span>

              {hour.precipitationProbability > 10 && (
                <div className="flex items-center gap-0.5">
                  <Droplets className="h-3 w-3 text-sky-500" />
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                    {hour.precipitationProbability}%
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
