import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { searchCities, fetchWeather, fetchWeatherByCoords } from "../weatherApi";

function makeSampleResponse() {
  const start = new Date("2024-01-01T00:00:00Z");
  const hourlyTimes = Array.from({ length: 48 }).map((_, i) =>
    new Date(start.getTime() + i * 3600 * 1000).toISOString()
  );

  const hourly = {
    time: hourlyTimes,
    temperature_2m: Array.from({ length: 48 }).map((_, i) => 10 + i),
    precipitation_probability: Array.from({ length: 48 }).map(() => 0),
    weather_code: Array.from({ length: 48 }).map(() => 0),
    wind_speed_10m: Array.from({ length: 48 }).map(() => 5),
    apparent_temperature: Array.from({ length: 48 }).map(() => 9),
    relative_humidity_2m: Array.from({ length: 48 }).map(() => 50),
  };

  const dailyTimes = Array.from({ length: 7 }).map((_, i) =>
    new Date(start.getTime() + i * 24 * 3600 * 1000).toISOString()
  );

  const daily = {
    time: dailyTimes,
    weather_code: Array.from({ length: 7 }).map(() => 0),
    temperature_2m_max: Array.from({ length: 7 }).map(() => 15),
    temperature_2m_min: Array.from({ length: 7 }).map(() => 5),
    sunrise: dailyTimes.map((t) => new Date(t).toISOString()),
    sunset: dailyTimes.map((t) => new Date(new Date(t).getTime() + 12 * 3600 * 1000).toISOString()),
    uv_index_max: Array.from({ length: 7 }).map(() => 3),
    precipitation_sum: Array.from({ length: 7 }).map(() => 0),
    precipitation_probability_max: Array.from({ length: 7 }).map(() => 0),
    wind_speed_10m_max: Array.from({ length: 7 }).map(() => 10),
  };

  const current = {
    time: start.toISOString(),
    temperature_2m: 12,
    relative_humidity_2m: 55,
    apparent_temperature: 11,
    is_day: 1,
    precipitation: 0,
    rain: 0,
    weather_code: 1,
    cloud_cover: 20,
    surface_pressure: 1015,
    wind_speed_10m: 5,
    wind_direction_10m: 180,
    wind_gusts_10m: 7,
    uv_index: 2,
    visibility: 10000,
  };

  return {
    latitude: 0,
    longitude: 0,
    timezone: "UTC",
    timezone_abbreviation: "UTC",
    elevation: 0,
    current,
    hourly,
    daily,
  };
}

describe("weatherApi", () => {
  beforeAll(() => {
    // Freeze time so hourly slicing is predictable
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("searchCities returns [] for empty query", async () => {
    const res = await searchCities("   ");
    expect(res).toEqual([]);
  });

  it("searchCities forwards fetch and returns results", async () => {
    const mock = [{ id: 1, name: "X", latitude: 1, longitude: 2, country: "", country_code: "", timezone: "UTC" }];
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ results: mock }) })));

    const res = await searchCities("X");
    expect(res).toEqual(mock);
  });

  it("searchCities throws when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: false, status: 500 })));
    await expect(searchCities("X")).rejects.toThrow();
  });

  it("fetchWeather normalizes API response correctly", async () => {
    const sample = makeSampleResponse();
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(sample) })));

    const location = { id: 1, name: "Test", latitude: 0, longitude: 0, country: "", country_code: "", timezone: "UTC" };
    const data = await fetchWeather(location as any);

    expect(data.location.name).toBe("Test");
    expect(data.current.time instanceof Date).toBe(true);
    expect(Array.isArray(data.hourly)).toBe(true);
    expect(data.hourly.length).toBe(24);
    expect(data.daily.length).toBe(7);
    expect(data.daily[0].sunrise instanceof Date).toBe(true);
  });

  it("fetchWeatherByCoords returns a location named 'Current Location'", async () => {
    const sample = makeSampleResponse();
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(sample) })));

    const data = await fetchWeatherByCoords(10, 20);
    expect(data.location.name).toBe("Current Location");
  });
});
