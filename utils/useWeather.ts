import { useQuery } from "@tanstack/react-query";
import ky from "ky-universal";
import dayjs from "./dayjs";

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
    icon: string;
    time: string;
    formattedDate: string;
  };
  daily: {
    date: string;
    day: string;
    fullDate: string;
    icon: string;
    high: number;
    low: number;
  }[];
  hourly: Record<
    string,
    {
      time: string;
      icon: string;
      temp: number;
    }[]
  >;
}

export interface LocationData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  country_code: string;
}

interface OpenMeteoForecastResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

interface OpenMeteoGeocodingResponse {
  results?: LocationData[];
}

const weatherIconMap: Record<number, string> = {
  0: "icon-sunny.webp",
  1: "icon-partly-cloudy.webp",
  2: "icon-partly-cloudy.webp",
  3: "icon-overcast.webp",
  45: "icon-fog.webp",
  48: "icon-fog.webp",
  51: "icon-drizzle.webp",
  53: "icon-drizzle.webp",
  55: "icon-drizzle.webp",
  61: "icon-rain.webp",
  63: "icon-rain.webp",
  65: "icon-rain.webp",
  71: "icon-snow.webp",
  73: "icon-snow.webp",
  75: "icon-snow.webp",
  77: "icon-snow.webp",
  80: "icon-rain.webp",
  81: "icon-rain.webp",
  82: "icon-rain.webp",
  85: "icon-snow.webp",
  86: "icon-snow.webp",
  95: "icon-storm.webp",
  96: "icon-storm.webp",
  99: "icon-storm.webp",
};

export const getWeatherIcon = (code: number): string => {
  return weatherIconMap[code] ?? "icon-sunny.webp";
};

export interface WeatherUnits {
  temperature: "celsius" | "fahrenheit";
  windSpeed: "kmh" | "mph";
  precipitation: "mm" | "inch";
}

export const fetchWeather = async (
  lat: number,
  lon: number,
  units: WeatherUnits = {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  },
): Promise<WeatherData> => {
  const searchParams = {
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    temperature_unit: units.temperature,
    wind_speed_unit: units.windSpeed,
    precipitation_unit: units.precipitation,
  };

  const data = await ky("https://api.open-meteo.com/v1/forecast", {
    searchParams,
  }).json<OpenMeteoForecastResponse>();

  const current = {
    temp: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    icon: getWeatherIcon(data.current.weather_code),
    time: data.current.time,
    formattedDate: dayjs(data.current.time).format("dddd, MMM D, YYYY"),
  };

  const daily = data.daily.time.map((time: string, i: number) => ({
    date: time,
    day: dayjs(time).format("ddd"),
    fullDate: dayjs(time).format("dddd"),
    icon: getWeatherIcon(data.daily.weather_code[i]),
    high: Math.round(data.daily.temperature_2m_max[i]),
    low: Math.round(data.daily.temperature_2m_min[i]),
  }));

  const hourly = data.hourly.time.reduce(
    (
      acc: Record<string, { time: string; icon: string; temp: number }[]>,
      time: string,
      i: number,
    ) => {
      const dateKey = dayjs(time).format("dddd"); // Using day name as key for the dropdown
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push({
        time: dayjs(time).format("h A"),
        icon: getWeatherIcon(data.hourly.weather_code[i]),
        temp: Math.round(data.hourly.temperature_2m[i]),
      });
      return acc;
    },
    {},
  );

  return { current, daily, hourly };
};

export const useWeather = (
  lat: number,
  lon: number,
  units: WeatherUnits = {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  },
) => {
  return useQuery({
    queryKey: ["weather", lat, lon, units],
    queryFn: () => fetchWeather(lat, lon, units),
    enabled: lat !== undefined && lon !== undefined,
  });
};

export const useGeocoding = (query: string) => {
  return useQuery({
    queryKey: ["geocoding", query],
    queryFn: async (): Promise<LocationData[]> => {
      const data = await ky("https://geocoding-api.open-meteo.com/v1/search", {
        searchParams: {
          name: query,
          count: 10,
          language: "en",
          format: "json",
        },
      }).json<OpenMeteoGeocodingResponse>();
      return data.results ?? [];
    },
    enabled: query.length >= 2,
  });
};
