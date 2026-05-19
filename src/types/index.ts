// --- Geocoding ---
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  timezone: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

// --- Open-Meteo Weather ---
export interface CurrentWeatherRaw {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  weather_code: number;
  cloud_cover: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  uv_index: number;
  visibility: number;
}

export interface HourlyWeatherRaw {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
}

export interface DailyWeatherRaw {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeatherRaw;
  hourly: HourlyWeatherRaw;
  daily: DailyWeatherRaw;
}

// --- Normalized ---
export interface CurrentWeather {
  time: Date;
  temperature: number;
  feelsLike: number;
  humidity: number;
  isDay: boolean;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  uvIndex: number;
  visibility: number;
}

export interface HourlyWeather {
  time: Date;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed: number;
  feelsLike: number;
  humidity: number;
}

export interface DailyWeather {
  time: Date;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: Date;
  sunset: Date;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
}

export interface WeatherData {
  location: GeocodingResult;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  timezone: string;
}

// --- App State ---
export type TemperatureUnit = "celsius" | "fahrenheit";
export type ThemeMode = "light" | "dark" | "system";

export interface AppSettings {
  unit: TemperatureUnit;
  theme: ThemeMode;
}
