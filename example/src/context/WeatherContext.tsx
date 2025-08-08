// example/src/context/WeatherContext.tsx
import React, { createContext, useState } from 'react';
import WeatherSdk from 'react-native-weather-sdk';
import type { WeatherContextType, WeatherData } from '../types';

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherByCity = async (city: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await WeatherSdk.fetchWeatherByCity(city);
      if (!result) {
        throw new Error('No weather data received');
      }
      setData(result);
    } catch (e: any) {
      console.error('Failed to fetch weather by city:', e);
      const message =
        e?.message ||
        (typeof e === 'string' ? e : null) ||
        'Unable to fetch weather. Please check the city name or try again later.';
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCoordinates = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await WeatherSdk.fetchWeatherByCoordinates(lat, lon);
      if (!result) {
        throw new Error('No weather data received');
      }
      setData(result);
    } catch (err: any) {
      console.error('Failed to fetch weather by coordinates:', err);
      const message =
        err?.message ||
        (typeof err === 'string' ? err : null) ||
        'Unable to fetch weather. Please check your location or try again later.';
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ data, loading, error, getWeatherByCity, getWeatherByCoordinates }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
