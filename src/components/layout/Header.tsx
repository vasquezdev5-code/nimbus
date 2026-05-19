import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import type { ThemeMode, TemperatureUnit } from "@/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  theme: ThemeMode;
  onThemeChange: (t: ThemeMode) => void;
  unit: TemperatureUnit;
  onUnitChange: (u: TemperatureUnit) => void;
}

const THEME_ICONS: Record<ThemeMode, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const THEME_CYCLE: ThemeMode[] = ["light", "dark", "system"];

export function Header({ theme, onThemeChange, unit, onUnitChange }: HeaderProps) {
  const ThemeIcon = THEME_ICONS[theme];

  function cycleTheme() {
    const idx = THEME_CYCLE.indexOf(theme);
    onThemeChange(THEME_CYCLE[(idx + 1) % THEME_CYCLE.length]);
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={cn(
          "mx-auto max-w-4xl px-4 md:px-6",
          "flex items-center justify-between h-14",
          "border-b border-border/50",
          "backdrop-blur-xl bg-background/80"
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl" role="img" aria-label="Nimbus logo">🌤️</span>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            Nimbus
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {/* Unit toggle */}
          <div className="flex items-center rounded-xl bg-secondary p-0.5">
            {(["celsius", "fahrenheit"] as TemperatureUnit[]).map((u) => (
              <button
                key={u}
                onClick={() => onUnitChange(u)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200",
                  unit === u
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={unit === u}
              >
                {u === "celsius" ? "°C" : "°F"}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className={cn(
              "p-2 rounded-xl transition-colors",
              "bg-secondary hover:bg-accent",
              "text-muted-foreground hover:text-foreground"
            )}
            aria-label={`Switch theme (current: ${theme})`}
          >
            <ThemeIcon className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </header>
  );
}
