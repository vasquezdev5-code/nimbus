export interface WeatherCondition {
  label: string;
  icon: string; // emoji for now; swap for icon component
  description: string;
  gradient: string;
  bgClass: string;
}

const WMO_CODES: Record<number, WeatherCondition> = {
  0: {
    label: "Clear Sky",
    icon: "☀️",
    description: "Clear and sunny",
    gradient: "from-amber-400 to-orange-500",
    bgClass: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/20",
  },
  1: {
    label: "Mainly Clear",
    icon: "🌤️",
    description: "Mostly clear",
    gradient: "from-amber-300 to-sky-400",
    bgClass: "bg-gradient-to-br from-amber-50 to-sky-100 dark:from-amber-950/20 dark:to-sky-900/20",
  },
  2: {
    label: "Partly Cloudy",
    icon: "⛅",
    description: "Partly cloudy",
    gradient: "from-sky-300 to-slate-400",
    bgClass: "bg-gradient-to-br from-sky-50 to-slate-100 dark:from-sky-950/20 dark:to-slate-900/20",
  },
  3: {
    label: "Overcast",
    icon: "☁️",
    description: "Overcast skies",
    gradient: "from-slate-400 to-slate-600",
    bgClass: "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900/30 dark:to-slate-800/20",
  },
  45: {
    label: "Foggy",
    icon: "🌫️",
    description: "Foggy conditions",
    gradient: "from-slate-300 to-slate-500",
    bgClass: "bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-900/30 dark:to-gray-900/20",
  },
  48: {
    label: "Icy Fog",
    icon: "🌫️",
    description: "Freezing fog",
    gradient: "from-slate-300 to-blue-400",
    bgClass: "bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-900/30 dark:to-blue-900/20",
  },
  51: {
    label: "Light Drizzle",
    icon: "🌦️",
    description: "Light drizzle",
    gradient: "from-sky-400 to-blue-500",
    bgClass: "bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-950/20 dark:to-blue-900/20",
  },
  53: {
    label: "Drizzle",
    icon: "🌦️",
    description: "Moderate drizzle",
    gradient: "from-sky-500 to-blue-600",
    bgClass: "bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-950/30 dark:to-blue-900/20",
  },
  55: {
    label: "Heavy Drizzle",
    icon: "🌧️",
    description: "Dense drizzle",
    gradient: "from-blue-500 to-blue-700",
    bgClass: "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/30 dark:to-blue-900/20",
  },
  61: {
    label: "Light Rain",
    icon: "🌧️",
    description: "Light rain",
    gradient: "from-blue-400 to-indigo-500",
    bgClass: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-900/20",
  },
  63: {
    label: "Rain",
    icon: "🌧️",
    description: "Moderate rain",
    gradient: "from-blue-500 to-indigo-600",
    bgClass: "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/20",
  },
  65: {
    label: "Heavy Rain",
    icon: "⛈️",
    description: "Heavy rainfall",
    gradient: "from-indigo-500 to-indigo-700",
    bgClass: "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-950/30 dark:to-indigo-900/20",
  },
  71: {
    label: "Light Snow",
    icon: "🌨️",
    description: "Light snowfall",
    gradient: "from-sky-200 to-blue-300",
    bgClass: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/10 dark:to-blue-950/10",
  },
  73: {
    label: "Snow",
    icon: "❄️",
    description: "Moderate snowfall",
    gradient: "from-sky-300 to-blue-400",
    bgClass: "bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-950/20 dark:to-blue-950/20",
  },
  75: {
    label: "Heavy Snow",
    icon: "❄️",
    description: "Heavy snowfall",
    gradient: "from-blue-300 to-indigo-400",
    bgClass: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20",
  },
  80: {
    label: "Light Showers",
    icon: "🌦️",
    description: "Slight rain showers",
    gradient: "from-sky-400 to-blue-500",
    bgClass: "bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-950/20 dark:to-blue-900/20",
  },
  81: {
    label: "Showers",
    icon: "🌧️",
    description: "Rain showers",
    gradient: "from-blue-400 to-indigo-600",
    bgClass: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-900/20",
  },
  82: {
    label: "Heavy Showers",
    icon: "⛈️",
    description: "Violent rain showers",
    gradient: "from-indigo-500 to-purple-700",
    bgClass: "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/20",
  },
  95: {
    label: "Thunderstorm",
    icon: "⛈️",
    description: "Thunderstorm",
    gradient: "from-slate-600 to-purple-800",
    bgClass: "bg-gradient-to-br from-slate-200 to-purple-100 dark:from-slate-900/40 dark:to-purple-950/30",
  },
  96: {
    label: "Stormy Hail",
    icon: "⛈️",
    description: "Thunderstorm with hail",
    gradient: "from-gray-700 to-purple-900",
    bgClass: "bg-gradient-to-br from-gray-200 to-purple-100 dark:from-gray-900/40 dark:to-purple-950/30",
  },
  99: {
    label: "Heavy Hail Storm",
    icon: "⛈️",
    description: "Thunderstorm with heavy hail",
    gradient: "from-gray-800 to-purple-900",
    bgClass: "bg-gradient-to-br from-gray-200 to-purple-200 dark:from-gray-900/50 dark:to-purple-950/40",
  },
};

const DEFAULT_CONDITION: WeatherCondition = {
  label: "Unknown",
  icon: "🌡️",
  description: "Weather data unavailable",
  gradient: "from-slate-400 to-slate-600",
  bgClass: "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900/30 dark:to-slate-800/20",
};

export function getWeatherCondition(code: number): WeatherCondition {
  return WMO_CODES[code] ?? DEFAULT_CONDITION;
}

export function formatTemperature(temp: number, unit: "celsius" | "fahrenheit" = "celsius"): string {
  if (unit === "fahrenheit") {
    return `${Math.round(temp * 9/5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

export function formatWindDirection(degrees: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(degrees / 45) % 8];
}

export function getUvIndexLabel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: "Low", color: "text-green-500" };
  if (uv <= 5) return { label: "Moderate", color: "text-yellow-500" };
  if (uv <= 7) return { label: "High", color: "text-orange-500" };
  if (uv <= 10) return { label: "Very High", color: "text-red-500" };
  return { label: "Extreme", color: "text-purple-500" };
}

export function formatHour(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
}

export function formatDay(date: Date, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}
