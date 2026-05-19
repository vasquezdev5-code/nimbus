import type {
  GeocodingResponse,
  GeocodingResult,
  WeatherApiResponse,
  WeatherData,
  CurrentWeather,
  HourlyWeather,
  DailyWeather,
} from "@/types";

const GEO_BASE = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_BASE = "https://api.open-meteo.com/v1";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];
  const url = `${GEO_BASE}/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`;
  const data = await fetcher<GeocodingResponse>(url);
  return data.results ?? [];
}

export async function fetchWeather(location: GeocodingResult): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    timezone: location.timezone,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "weather_code",
      "cloud_cover",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "uv_index",
      "visibility",
    ].join(","),
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
      "apparent_temperature",
      "relative_humidity_2m",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ].join(","),
    forecast_days: "7",
    wind_speed_unit: "kmh",
  });

  const raw = await fetcher<WeatherApiResponse>(`${WEATHER_BASE}/forecast?${params}`);
  return normalizeWeatherData(raw, location);
}

function normalizeWeatherData(raw: WeatherApiResponse, location: GeocodingResult): WeatherData {
  const current: CurrentWeather = {
    time: new Date(raw.current.time),
    temperature: raw.current.temperature_2m,
    feelsLike: raw.current.apparent_temperature,
    humidity: raw.current.relative_humidity_2m,
    isDay: raw.current.is_day === 1,
    precipitation: raw.current.precipitation,
    weatherCode: raw.current.weather_code,
    cloudCover: raw.current.cloud_cover,
    pressure: raw.current.surface_pressure,
    windSpeed: raw.current.wind_speed_10m,
    windDirection: raw.current.wind_direction_10m,
    windGusts: raw.current.wind_gusts_10m,
    uvIndex: raw.current.uv_index,
    visibility: raw.current.visibility,
  };

  const now = new Date();
  const currentHour = now.getHours();

  const hourly: HourlyWeather[] = raw.hourly.time
    .slice(currentHour, currentHour + 24)
    .map((time, i) => ({
      time: new Date(time),
      temperature: raw.hourly.temperature_2m[currentHour + i],
      precipitationProbability: raw.hourly.precipitation_probability[currentHour + i],
      weatherCode: raw.hourly.weather_code[currentHour + i],
      windSpeed: raw.hourly.wind_speed_10m[currentHour + i],
      feelsLike: raw.hourly.apparent_temperature[currentHour + i],
      humidity: raw.hourly.relative_humidity_2m[currentHour + i],
    }));

  const daily: DailyWeather[] = raw.daily.time.map((time, i) => ({
    time: new Date(time),
    weatherCode: raw.daily.weather_code[i],
    tempMax: raw.daily.temperature_2m_max[i],
    tempMin: raw.daily.temperature_2m_min[i],
    sunrise: new Date(raw.daily.sunrise[i]),
    sunset: new Date(raw.daily.sunset[i]),
    uvIndexMax: raw.daily.uv_index_max[i],
    precipitationSum: raw.daily.precipitation_sum[i],
    precipitationProbabilityMax: raw.daily.precipitation_probability_max[i],
    windSpeedMax: raw.daily.wind_speed_10m_max[i],
  }));

  return { location, current, hourly, daily, timezone: raw.timezone };
}

export async function fetchWeatherByCoords(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  // Open-Meteo doesn't support reverse geocoding; use a fallback location object
  const location: GeocodingResult = {
    id: -1,
    name: "Current Location",
    latitude,
    longitude,
    country: "",
    country_code: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return fetchWeather(location);
}
