import { useQuery } from "@tanstack/react-query";
import { fetchWeather, fetchWeatherByCoords, searchCities } from "@/services/weatherApi";
import type { GeocodingResult } from "@/types";

export function useWeather(location: GeocodingResult | null) {
  return useQuery({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: () => fetchWeather(location!),
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });
}

export function useWeatherByCoords(coords: { latitude: number; longitude: number } | null) {
  return useQuery({
    queryKey: ["weather-coords", coords?.latitude, coords?.longitude],
    queryFn: () => fetchWeatherByCoords(coords!.latitude, coords!.longitude),
    enabled: !!coords,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCitySearch(query: string) {
  return useQuery({
    queryKey: ["city-search", query],
    queryFn: () => searchCities(query),
    enabled: query.length > 1,
    staleTime: 1000 * 60 * 30,
    placeholderData: [],
  });
}
